"use client"

import * as React from "react"
import { cn } from "@agent-patterns/core"
import { Badge } from "./ui/badge"

interface Pattern {
  id: string
  name: string
  description?: string
  category?: string
}

interface PatternSidebarProps {
  patterns: Pattern[]
  selectedPattern: string
  onPatternSelect: (patternId: string) => void
  searchQuery?: string
}

export function PatternSidebar({
  patterns,
  selectedPattern,
  onPatternSelect,
  searchQuery = "",
}: PatternSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  const filteredPatterns = React.useMemo(() => {
    if (!searchQuery) return patterns
    const query = searchQuery.toLowerCase()
    return patterns.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        p.id.toLowerCase().includes(query)
    )
  }, [patterns, searchQuery])

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-40 rounded-md border border-border bg-card p-2 shadow-lg"
        aria-label="Toggle pattern menu"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto p-4">
          <div className="mb-4">
            <h2 className="mb-3 text-lg font-semibold text-foreground">Patterns</h2>
            <div className="mb-2 text-xs text-muted-foreground">
              {filteredPatterns.length} pattern{filteredPatterns.length !== 1 ? "s" : ""}
            </div>
          </div>

          <nav className="space-y-1">
            {filteredPatterns.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => {
                  onPatternSelect(pattern.id)
                  setIsMobileOpen(false)
                }}
                className={cn(
                  "group relative w-full rounded-md px-3 py-2.5 text-left text-sm font-medium transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selectedPattern === pattern.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{pattern.name}</span>
                  {selectedPattern === pattern.id && (
                    <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                  )}
                </div>
                {pattern.description && (
                  <p className="mt-1 text-xs text-muted-foreground group-hover:text-accent-foreground/80">
                    {pattern.description}
                  </p>
                )}
              </button>
            ))}
          </nav>

          {filteredPatterns.length === 0 && (
            <div className="mt-8 text-center text-sm text-muted-foreground">
              No patterns found
            </div>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}

