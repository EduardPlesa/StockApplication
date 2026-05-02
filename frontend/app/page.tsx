import { Sidebar } from "@/components/dashboard/sidebar"
import { SearchBar } from "@/components/dashboard/search-bar"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { MarketStats } from "@/components/dashboard/market-stats"
import { TopMovers } from "@/components/dashboard/top-movers"
import { WatchlistPreview } from "@/components/dashboard/watchlist-preview"

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
          <WatchlistPreview />
        </div>

        <footer className="pt-2 text-center text-xs text-muted-foreground">
          Market data is illustrative. © Apex Markets
        </footer>
      </main>
    </div>
  )
}
