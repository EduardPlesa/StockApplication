"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import type { StockHistoryPoint } from "@/lib/types"

export type IndexCardProps = {
  symbol: string
  name: string
  value: number
  change: number
  changePercent: number
  series: StockHistoryPoint[]
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function IndexCard({ symbol, name, value, change, changePercent, series }: IndexCardProps) {
  const isUp = change >= 0
  const accent = isUp ? "hsl(142 72% 45%)" : "hsl(0 72% 56%)"
  const chartData = series.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
    price: point.price,
  }))

  return (
    <article
      className="glass group relative overflow-hidden rounded-2xl p-5 transition-colors hover:bg-white/[0.04]"
      aria-label={`${name} (${symbol})`}
    >
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
          <p className={cn("mt-1 font-mono text-xs", isUp ? "text-primary" : "text-destructive")}>
            {isUp ? "+" : ""}
            {formatNumber(change)} over 24h
          </p>
        </div>
      </div>

      <div className="mt-4 h-40 w-full">
        <ChartContainer
          config={{
            price: {
              label: "Price",
              color: accent,
            },
          }}
          className="h-full w-full"
        >
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <XAxis dataKey="time" tickLine={false} axisLine={false} minTickGap={28} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={42}
              domain={["dataMin - 2", "dataMax + 2"]}
              tickFormatter={(price) => `$${Number(price).toFixed(0)}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${Number(value).toFixed(2)}`}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="var(--color-price)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </article>
  )
}
