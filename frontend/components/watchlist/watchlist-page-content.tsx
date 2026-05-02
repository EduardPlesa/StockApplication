"use client"

import { useEffect, useState } from "react"
import { fetchWatchlist } from "@/lib/api"
import { getDeviceId } from "@/lib/device-id"
import type { Stock } from "@/lib/types"
import { StockList } from "@/components/dashboard/stock-list"

export function WatchlistPageContent() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const watchlist = await fetchWatchlist(getDeviceId())
        if (!cancelled) {
          setStocks(watchlist.stocks)
          setError(null)
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load your watchlist.")
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

  return (
    <section className="glass rounded-2xl p-5">
      <header>
        <h2 className="text-base font-semibold tracking-tight text-foreground">Saved stocks</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your watchlist updates as prices move in the backend.
        </p>
      </header>

      {error ? (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      ) : (
        <StockList
          stocks={stocks}
          watchlistIds={stocks.map((stock) => stock.id)}
          emptyMessage="Your watchlist is empty. Add stocks from the dashboard."
        />
      )}
    </section>
  )
}
