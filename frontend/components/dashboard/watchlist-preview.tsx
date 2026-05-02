"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { fetchWatchlist } from "@/lib/api"
import { getDeviceId } from "@/lib/device-id"
import type { Stock } from "@/lib/types"

export function WatchlistPreview() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const watchlist = await fetchWatchlist(getDeviceId())
        if (!cancelled) {
          setStocks(watchlist.stocks.slice(0, 4))
          setError(null)
        }
      } catch {
        if (!cancelled) {
          setError("Could not load your watchlist.")
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
    <aside aria-label="Watchlist preview" className="glass rounded-2xl p-5">
      <header className="flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-foreground">My Watchlist</h2>
        <Link
          href="/watchlist"
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </Link>
      </header>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {!error && stocks.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">Star a stock to build your watchlist.</p>
      )}

      {!error && stocks.length > 0 && (
        <ul className="mt-4 flex flex-col gap-3">
          {stocks.map((stock) => {
            const up = stock.changePercent >= 0
            return (
              <li
                key={stock.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.02] px-3 py-2.5 ring-1 ring-white/5"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{stock.ticker}</p>
                  <p className="truncate text-xs text-muted-foreground">{stock.name}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-mono text-sm text-foreground">${stock.price.toFixed(2)}</p>
                  <p className={up ? "font-mono text-xs text-primary" : "font-mono text-xs text-destructive"}>
                    {up ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </aside>
  )
}
