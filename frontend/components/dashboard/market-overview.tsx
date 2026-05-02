"use client"

import { useEffect, useState } from "react"
import { fetchStockHistory, fetchStocks } from "@/lib/api"
import type { Stock, StockHistoryPoint } from "@/lib/types"
import { IndexCard, type IndexCardProps } from "./index-card"

const FEATURED_TICKERS = ["AAPL", "MSFT", "NVDA"]

export function MarketOverview() {
  const [cards, setCards] = useState<IndexCardProps[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const stocks = await fetchStocks()
        const featuredStocks = FEATURED_TICKERS
          .map((ticker) => stocks.find((stock) => stock.ticker === ticker))
          .filter((stock): stock is Stock => Boolean(stock))

        const histories = await Promise.all(
          featuredStocks.map(async (stock) => ({
            stock,
            history: await fetchStockHistory(stock.ticker),
          })),
        )

        if (!cancelled) {
          setCards(histories.map(({ stock, history }) => buildCard(stock, history)))
          setError(null)
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load price history right now.")
        }
      }
    }

    void load()
    const intervalId = window.setInterval(load, 10000)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <section aria-labelledby="market-overview-heading" className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 id="market-overview-heading" className="text-xl font-semibold tracking-tight text-foreground">
            Market Overview
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Last 24 hours of simulated stock activity.</p>
        </div>
        <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Backend history feed
        </div>
      </div>

      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <IndexCard key={card.symbol} {...card} />
          ))}
        </div>
      )}
    </section>
  )
}

function buildCard(stock: Stock, history: StockHistoryPoint[]): IndexCardProps {
  const firstPrice = history[0]?.price ?? stock.price
  const latestPrice = history[history.length - 1]?.price ?? stock.price
  const change = latestPrice - firstPrice
  const changePercent = firstPrice === 0 ? 0 : (change / firstPrice) * 100

  return {
    symbol: stock.ticker,
    name: stock.name,
    value: latestPrice,
    change,
    changePercent,
    series: history,
  }
}
