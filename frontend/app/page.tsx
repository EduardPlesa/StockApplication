import { Sidebar } from "@/components/dashboard/sidebar"
import { SearchBar } from "@/components/dashboard/search-bar"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { MarketStats } from "@/components/dashboard/market-stats"
import { TopMovers } from "@/components/dashboard/top-movers"

export default function Page() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        {/* Top bar */}
        <header className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Dashboard</p>
            <h1 className="text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Good morning, Jordan
            </h1>
            <p className="text-sm text-muted-foreground">
              Here&apos;s what&apos;s moving the markets today.
            </p>
          </div>
          <SearchBar />
        </header>

        <MarketStats />

        <MarketOverview />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <TopMovers />
          </div>
          <aside aria-label="Watchlist preview" className="glass rounded-2xl p-5">
            <header className="flex items-center justify-between">
              <h2 className="text-base font-semibold tracking-tight text-foreground">My Watchlist</h2>
              <button
                type="button"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Edit
              </button>
            </header>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                { t: "GOOGL", n: "Alphabet Inc.", p: 178.32, c: 0.48 },
                { t: "AMD", n: "Adv. Micro Devices", p: 142.11, c: 1.92 },
                { t: "NFLX", n: "Netflix, Inc.", p: 712.4, c: -0.66 },
                { t: "JPM", n: "JPMorgan Chase", p: 224.18, c: 0.21 },
              ].map((s) => {
                const up = s.c >= 0
                return (
                  <li
                    key={s.t}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.02] px-3 py-2.5 ring-1 ring-white/5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{s.t}</p>
                      <p className="truncate text-xs text-muted-foreground">{s.n}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-mono text-sm text-foreground">${s.p.toFixed(2)}</p>
                      <p
                        className={
                          up
                            ? "font-mono text-xs text-primary"
                            : "font-mono text-xs text-destructive"
                        }
                      >
                        {up ? "+" : ""}
                        {s.c.toFixed(2)}%
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </aside>
        </div>

        <footer className="pt-2 text-center text-xs text-muted-foreground">
          Market data is illustrative. © Apex Markets
        </footer>
      </main>
    </div>
  )
}
