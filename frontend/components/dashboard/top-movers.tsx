import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Mover = {
  ticker: string
  name: string
  price: number
  changePercent: number
}

const movers: Mover[] = [
  { ticker: "NVDA", name: "NVIDIA Corp.", price: 138.42, changePercent: 3.12 },
  { ticker: "AAPL", name: "Apple Inc.", price: 232.18, changePercent: 1.04 },
  { ticker: "MSFT", name: "Microsoft Corp.", price: 421.93, changePercent: 0.62 },
  { ticker: "TSLA", name: "Tesla, Inc.", price: 248.7, changePercent: -2.18 },
  { ticker: "AMZN", name: "Amazon.com, Inc.", price: 197.55, changePercent: 0.84 },
  { ticker: "META", name: "Meta Platforms", price: 562.11, changePercent: -0.41 },
]

export function TopMovers() {
  return (
    <section aria-labelledby="top-movers-heading" className="glass rounded-2xl p-5">
      <header className="flex items-center justify-between">
        <h2 id="top-movers-heading" className="text-base font-semibold tracking-tight text-foreground">
          Top Movers
        </h2>
        <button
          type="button"
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </button>
      </header>

      <ul className="mt-4 flex flex-col divide-y divide-white/5">
        {movers.map((m) => {
          const isUp = m.changePercent >= 0
          return (
            <li key={m.ticker} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
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
                  {m.ticker.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{m.ticker}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.name}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-mono text-sm font-medium text-foreground">${m.price.toFixed(2)}</p>
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
                  {m.changePercent.toFixed(2)}%
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
