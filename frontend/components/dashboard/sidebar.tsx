"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Star, Settings, LogOut, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/watchlist", label: "Watchlist", icon: Star },
] as const

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      aria-label="Primary navigation"
      className="glass sticky top-0 hidden h-screen w-64 shrink-0 flex-col p-4 lg:flex"
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-2 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
          <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-foreground">Apex</span>
          <span className="text-xs text-muted-foreground">Markets Console</span>
        </div>
      </div>

      <div className="mt-6 px-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Navigation</p>
      </div>

      {/* Nav */}
      <nav className="mt-2 flex flex-col gap-1" role="navigation">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/15 text-foreground ring-1 ring-primary/25"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
              >
              <Icon
                className={cn("h-4 w-4 transition-colors", isActive ? "text-primary" : "text-muted-foreground")}
                aria-hidden="true"
              />
              <span>{label}</span>
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />}
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 px-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Account</p>
      </div>
      <nav className="mt-2 flex flex-col gap-1">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
        >
          <Settings className="h-4 w-4" aria-hidden="true" />
          <span>Settings</span>
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          <span>Log out</span>
        </button>
      </nav>

      {/* Footer card */}
      <div className="mt-auto">
        <div className="glass-strong rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary ring-1 ring-primary/30">
              JM
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">Jordan Miles</p>
              <p className="truncate text-xs text-muted-foreground">Pro Trader</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
