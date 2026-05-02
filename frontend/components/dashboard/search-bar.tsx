"use client"

import { useState } from "react"
import { Search, Bell, Command } from "lucide-react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  return (
    <div className="flex items-center gap-3">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="glass flex w-full items-center gap-3 rounded-2xl px-4 py-3"
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <label htmlFor="ticker-search" className="sr-only">
          Search stock tickers
        </label>
        <input
          id="ticker-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          placeholder="Search tickers, companies, ETFs… (e.g. AAPL, TSLA, SPY)"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <kbd className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:flex">
          <Command className="h-3 w-3" aria-hidden="true" />K
        </kbd>
      </form>

      <button
        type="button"
        aria-label="Notifications"
        className="glass relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-muted-foreground transition-colors hover:text-foreground"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />
        <span
          className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}
