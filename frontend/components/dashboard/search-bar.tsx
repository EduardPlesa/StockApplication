"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Bell, Command } from "lucide-react"
import { searchStocks } from "@/lib/api"
import type { Stock } from "@/lib/types"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Stock[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasFocused, setHasFocused] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setSuggestions([])
      setIsLoading(false)
      setError(null)
      return
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        setIsLoading(true)
        const results = await searchStocks(trimmedQuery)
        setSuggestions(results)
        setError(null)
      } catch {
        setError("Could not load suggestions.")
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setHasFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const showDropdown = hasFocused && query.trim().length > 0

  return (
    <div className="flex items-center gap-3">
      <div ref={containerRef} className="relative w-full">
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
            onFocus={() => setHasFocused(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tickers, companies, ETFs... (e.g. AAPL, TSLA, SPY)"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:flex">
            <Command className="h-3 w-3" aria-hidden="true" />K
          </kbd>
        </form>

        {showDropdown && (
          <div className="glass-strong absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 rounded-2xl border border-white/10 p-3 shadow-2xl">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Suggestions</p>
              {isLoading && <p className="text-xs text-muted-foreground">Searching...</p>}
            </div>

            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : suggestions.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {suggestions.map((stock) => (
                  <li key={stock.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery(stock.ticker)
                        setHasFocused(false)
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/5"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{stock.ticker}</p>
                        <p className="truncate text-xs text-muted-foreground">{stock.name}</p>
                      </div>
                      <div className="ml-3 text-right">
                        <p className="font-mono text-sm text-foreground">${stock.price.toFixed(2)}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : !isLoading ? (
              <p className="text-sm text-muted-foreground">No matching stocks found.</p>
            ) : null}
          </div>
        )}
      </div>

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
