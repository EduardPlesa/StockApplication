"use client"

import { useEffect, useMemo, useState } from "react"
import { addToWatchlist, fetchStocks, fetchWatchlist } from "@/lib/api"
import { getDeviceId } from "@/lib/device-id"
import type { Stock } from "@/lib/types"
import { StockList } from "./stock-list"
import { TradeModal } from "@/components/trade/trade-modal"

export function LiveTopMovers() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [watchlistIds, setWatchlistIds] = useState<number[]>([])
  const [pendingStockId, setPendingStockId] = useState<number | null>(null)
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const deviceId = getDeviceId()
        const [stockData, watchlistData] = await Promise.all([
          fetchStocks(),
          fetchWatchlist(deviceId),
        ])

        if (!cancelled) {
          setStocks(stockData)
          setWatchlistIds(watchlistData.stockIds)
          setError(null)
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load live stocks right now.")
        }
      }
    }

    void load()
    const intervalId = window.setInterval(load, 5000)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [])

  const movers = useMemo(
    () => [...stocks].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 6),
    [stocks],
  )

  async function handleToggleWatchlist(stockId: number) {
    setPendingStockId(stockId)

    try {
      const deviceId = getDeviceId()
      const watchlist = await addToWatchlist(deviceId, stockId)
      setWatchlistIds(watchlist.stockIds)
    } catch {
      setError("Unable to save that stock to your watchlist.")
    } finally {
      setPendingStockId(null)
    }
  }

  function handleBuy(stock: Stock) {
    setSelectedStock(stock)
    setIsTradeModalOpen(true)
  }

  return (
    <>
      <section aria-labelledby="top-movers-heading" className="glass rounded-2xl p-5">
        <header className="flex items-center justify-between">
          <div>
            <h2 id="top-movers-heading" className="text-base font-semibold tracking-tight text-foreground">
              Top Movers
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Live prices from your Spring Boot backend.</p>
          </div>
        </header>

        {error ? (
          <p className="mt-4 text-sm text-destructive">{error}</p>
        ) : (
          <StockList
            stocks={movers}
            watchlistIds={watchlistIds}
            onToggleWatchlist={handleToggleWatchlist}
            onBuy={handleBuy}
            pendingStockId={pendingStockId}
            emptyMessage="No market movers are available yet."
          />
        )}
      </section>

      <TradeModal stock={selectedStock} open={isTradeModalOpen} onOpenChange={setIsTradeModalOpen} />
    </>
  )
}
