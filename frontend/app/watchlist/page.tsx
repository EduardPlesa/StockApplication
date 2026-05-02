import { Sidebar } from "@/components/dashboard/sidebar"
import { WatchlistPageContent } from "@/components/watchlist/watchlist-page-content"

export default function WatchlistPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Watchlist</p>
          <h1 className="text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Your saved stocks
          </h1>
          <p className="text-sm text-muted-foreground">
            Track the names you starred on the dashboard.
          </p>
        </header>

        <WatchlistPageContent />
      </main>
    </div>
  )
}
