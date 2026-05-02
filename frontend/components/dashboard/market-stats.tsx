type Stat = {
  label: string
  value: string
  hint: string
}

const stats: Stat[] = [
  { label: "Advancers", value: "1,842", hint: "NYSE + NASDAQ" },
  { label: "Decliners", value: "1,113", hint: "NYSE + NASDAQ" },
  { label: "VIX", value: "14.62", hint: "Volatility Index" },
  { label: "10Y Yield", value: "4.21%", hint: "U.S. Treasury" },
]

export function MarketStats() {
  return (
    <section
      aria-label="Market statistics"
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {stats.map((s) => (
        <div key={s.label} className="glass rounded-2xl p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
          <p className="mt-2 font-mono text-xl font-semibold tracking-tight text-foreground">{s.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
        </div>
      ))}
    </section>
  )
}
