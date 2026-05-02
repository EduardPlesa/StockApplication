import { IndexCard, type IndexCardProps } from "./index-card"

// Deterministic seeded series so SSR and CSR match.
function makeSeries(seed: number, trendUp: boolean): { x: number; y: number }[] {
  const points = 32
  const out: { x: number; y: number }[] = []
  let v = 100
  for (let i = 0; i < points; i++) {
    // Simple LCG
    seed = (seed * 9301 + 49297) % 233280
    const rand = seed / 233280
    const drift = (trendUp ? 0.6 : -0.5) * (i / points)
    v += (rand - 0.5) * 4 + drift
    out.push({ x: i, y: Number(v.toFixed(2)) })
  }
  return out
}

const indices: IndexCardProps[] = [
  {
    symbol: "SPX",
    name: "S&P 500",
    value: 5827.04,
    change: 42.36,
    changePercent: 0.73,
    series: makeSeries(7, true),
  },
  {
    symbol: "IXIC",
    name: "NASDAQ Composite",
    value: 18342.94,
    change: 168.12,
    changePercent: 0.92,
    series: makeSeries(19, true),
  },
  {
    symbol: "DJI",
    name: "Dow Jones Industrial",
    value: 42114.6,
    change: -88.41,
    changePercent: -0.21,
    series: makeSeries(31, false),
  },
]

export function MarketOverview() {
  return (
    <section aria-labelledby="market-overview-heading" className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 id="market-overview-heading" className="text-xl font-semibold tracking-tight text-foreground">
            Market Overview
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Live snapshot of the major U.S. indices.</p>
        </div>
        <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Markets open · Real-time
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {indices.map((idx) => (
          <IndexCard key={idx.symbol} {...idx} />
        ))}
      </div>
    </section>
  )
}
