"use client"

import { useState } from "react"
import { CommandPalette } from "./component"

export default function CommandPaletteExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [recentCommands, setRecentCommands] = useState<string[]>([])

  const commands = [
    {
      id: "new-dashboard",
      label: "Create Dashboard",
      description: "Start building a new dashboard",
      shortcut: "⌘N",
      group: "create",
      keywords: ["new", "dashboard", "create"],
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      onSelect: () => {
        alert("Creating dashboard...")
        addRecent("new-dashboard")
      },
    },
    {
      id: "new-report",
      label: "Create Report",
      description: "Generate a new analytics report",
      shortcut: "⌘R",
      group: "create",
      keywords: ["new", "report", "analytics"],
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      onSelect: () => {
        alert("Creating report...")
        addRecent("new-report")
      },
    },
    {
      id: "search-users",
      label: "Search Users",
      description: "Find users in your workspace",
      shortcut: "⌘U",
      group: "search",
      keywords: ["search", "users", "find", "people"],
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      onSelect: () => {
        alert("Searching users...")
        addRecent("search-users")
      },
    },
    {
      id: "search-data",
      label: "Search Data",
      description: "Query your data sources",
      shortcut: "⌘D",
      group: "search",
      keywords: ["search", "data", "query", "database"],
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      onSelect: () => {
        alert("Searching data...")
        addRecent("search-data")
      },
    },
    {
      id: "settings",
      label: "Open Settings",
      description: "Configure your workspace",
      shortcut: "⌘,",
      group: "navigation",
      keywords: ["settings", "preferences", "config"],
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      onSelect: () => {
        alert("Opening settings...")
        addRecent("settings")
      },
    },
    {
      id: "help",
      label: "Help & Support",
      description: "Get help and documentation",
      shortcut: "⌘?",
      group: "navigation",
      keywords: ["help", "support", "docs", "documentation"],
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      onSelect: () => {
        alert("Opening help...")
        addRecent("help")
      },
    },
  ]

  const groups = [
    { id: "create", label: "Create" },
    { id: "search", label: "Search" },
    { id: "navigation", label: "Navigation" },
  ]

  const addRecent = (id: string) => {
    setRecentCommands((prev) => {
      const filtered = prev.filter((cmdId) => cmdId !== id)
      return [id, ...filtered].slice(0, 3)
    })
  }

  return (
    <div className="space-y-4 rounded-lg border border-border bg-background p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Command Palette Example</h3>

      <div className="space-y-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full rounded-lg border-2 border-dashed border-border bg-muted p-4 text-left transition-colors hover:border-primary hover:bg-muted/70"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm text-muted-foreground">Search or jump to...</span>
            </div>
            <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-border bg-background px-2 font-mono text-xs font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </button>

        <div className="rounded-lg border border-blue-200 bg-blue-50/80 p-3 dark:border-blue-800 dark:bg-blue-950/80">
          <p className="text-xs text-blue-950 dark:text-blue-50">
            <strong className="font-semibold">Tip:</strong> In a real app, bind this to ⌘K or Ctrl+K for quick access.
            The palette supports keyboard navigation (↑↓ arrows, Enter, Esc) and fuzzy search.
          </p>
        </div>
      </div>

      <CommandPalette
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        commands={commands}
        groups={groups}
        recentCommands={recentCommands}
      />
    </div>
  )
}

