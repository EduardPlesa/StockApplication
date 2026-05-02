"use client"

import { ArrowDownRight, ArrowUpRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Stock } from "@/lib/types"

type StockListProps = {
  stocks: Stock[]
  watchlistIds?: number[]
  onToggleWatchlist?: (stockId: number) => void
  onBuy?: (stock: Stock) => void
  pendingStockId?: number | null
  emptyMessage?: string
}

export function StockList({
  stocks,
  watchlistIds = [],
  onToggleWatchlist,
  onBuy,
  pendingStockId = null,
  emptyMessage = "No stocks to display yet.",
}: StockListProps) {
  if (stocks.length === 0) {
    return <p className="py-6 text-sm text-muted-foreground">{emptyMessage}</p>
  }

  return (
    <ul className="mt-4 flex flex-col divide-y divide-white/5">
      {stocks.map((stock) => {
        const isUp = stock.changePercent >= 0
        const isSaved = watchlistIds.includes(stock.id)
        const isPending = pendingStockId === stock.id

        return (
          <li
            key={stock.id}
            className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ring-1",
                  isUp
                    ? "bg-primary/10 text-primary ring-primary/25"
                    : "bg-destructive/10 text-destructive ring-destructive/25",
                )}
                aria-hidden="true"
              >
                {stock.ticker.slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{stock.ticker}</p>
                <p className="truncate text-xs text-muted-foreground">{stock.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {onBuy && (
                <button
                  type="button"
                  onClick={() => onBuy(stock)}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  Buy
                </button>
              )}
              <div className="flex flex-col items-end">
                <p className="font-mono text-sm font-medium text-foreground">${stock.price.toFixed(2)}</p>
                <p
                  className={cn(
                    "mt-0.5 inline-flex items-center gap-0.5 font-mono text-xs",
                    isUp ? "text-primary" : "text-destructive",
                  )}
                >
                  {isUp ? (
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
                  )}
                  {isUp ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%
                </p>
              </div>
              {onToggleWatchlist && (
                <button
                  type="button"
                  aria-label={isSaved ? `Saved ${stock.ticker} to watchlist` : `Save ${stock.ticker} to watchlist`}
                  onClick={() => onToggleWatchlist(stock.id)}
                  disabled={isPending}
                  className={cn(
                    "rounded-full p-2 transition-colors",
                    isSaved
                      ? "text-amber-300 hover:text-amber-200"
                      : "text-muted-foreground hover:text-foreground",
                    isPending && "cursor-wait opacity-60",
                  )}
                >
                  <Star className={cn("h-4 w-4", isSaved && "fill-current")} aria-hidden="true" />
                </button>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
