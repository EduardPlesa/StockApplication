"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

export type IndexCardProps = {
  symbol: string
  name: string
  value: number
  change: number
  changePercent: number
  series: { x: number; y: number }[]
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function IndexCard({ symbol, name, value, change, changePercent, series }: IndexCardProps) {
  const isUp = change >= 0
  const accent = isUp ? "var(--color-primary)" : "var(--color-destructive)"
  const gradId = `grad-${symbol.replace(/[^a-zA-Z0-9]/g, "")}`

  return (
    <article
      className="glass group relative overflow-hidden rounded-2xl p-5 transition-colors hover:bg-white/[0.04]"
      aria-label={`${name} (${symbol})`}
    >
      {/* subtle highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />

      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{symbol}</p>
          <h3 className="mt-0.5 truncate text-sm font-semibold text-foreground">{name}</h3>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1",
            isUp
              ? "bg-primary/10 text-primary ring-primary/25"
              : "bg-destructive/10 text-destructive ring-destructive/25",
          )}
        >
          {isUp ? (
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          ) : (
            <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
          )}
          {isUp ? "+" : ""}
          {changePercent.toFixed(2)}%
        </span>
      </header>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-2xl font-semibold tracking-tight text-foreground">{formatNumber(value)}</p>
          <p
            className={cn(
              "mt-1 font-mono text-xs",
              isUp ? "text-primary" : "text-destructive",
            )}
          >
            {isUp ? "+" : ""}
            {formatNumber(change)} today
          </p>
        </div>
      </div>

      {/* Sparkline */}
      <div className="mt-4 h-16 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity={0.45} />
                <stop offset="100%" stopColor={accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="y"
              stroke={accent}
              strokeWidth={2}
              fill={`url(#${gradId})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}
