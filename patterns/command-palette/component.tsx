"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@agent-patterns/core"

interface Command {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  keywords?: string[]
  shortcut?: string
  onSelect?: () => void
  group?: string
}

interface CommandGroup {
  id: string
  label: string
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose?: () => void
  placeholder?: string
  commands: Command[]
  groups?: CommandGroup[]
  recentCommands?: string[]
  className?: string
}

export function CommandPalette({
  isOpen,
  onClose,
  placeholder = "Type a command or search...",
  commands,
  groups,
  recentCommands = [],
  className,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        onClose?.()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        const command = filteredCommands[selectedIndex]
        if (command) {
          command.onSelect?.()
          onClose?.()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex, onClose])

  // Filter commands based on search
  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase()
    const matchesLabel = cmd.label.toLowerCase().includes(searchLower)
    const matchesDescription = cmd.description?.toLowerCase().includes(searchLower)
    const matchesKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(searchLower))
    return matchesLabel || matchesDescription || matchesKeywords
  })

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  // Group commands
  const groupedCommands = groups
    ? groups.map((group) => ({
        ...group,
        commands: filteredCommands.filter((cmd) => cmd.group === group.id),
      }))
    : [{ id: "all", label: "Commands", commands: filteredCommands }]

  // Recent commands
  const recentCommandsList = recentCommands
    .map((id) => commands.find((cmd) => cmd.id === id))
    .filter(Boolean) as Command[]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in-0"
        onClick={onClose}
      />

      {/* Command Palette */}
      <div
        className={cn(
          "fixed left-[50%] top-[20%] z-50 w-full max-w-2xl translate-x-[-50%] animate-in fade-in-0 slide-in-from-bottom-4 zoom-in-95",
          className
        )}
      >
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          {/* Search Input */}
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
                ESC
              </kbd>
            </div>
          </div>

          {/* Commands List */}
          <div
            ref={listRef}
            className="max-h-[400px] overflow-y-auto p-2"
          >
            {/* Recent Commands */}
            {search === "" && recentCommandsList.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Recent
                </div>
                <div className="space-y-1">
                  {recentCommandsList.map((cmd, index) => (
                    <CommandItem
                      key={cmd.id}
                      command={cmd}
                      isSelected={selectedIndex === index}
                      onClick={() => {
                        cmd.onSelect?.()
                        onClose?.()
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Grouped Commands */}
            {groupedCommands.map((group) => {
              if (group.commands.length === 0) return null

              return (
                <div key={group.id} className="mb-4">
                  {groups && (
                    <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.label}
                    </div>
                  )}
                  <div className="space-y-1">
                    {group.commands.map((cmd, index) => (
                      <CommandItem
                        key={cmd.id}
                        command={cmd}
                        isSelected={selectedIndex === index}
                        onClick={() => {
                          cmd.onSelect?.()
                          onClose?.()
                        }}
                      />
                    ))}
                  </div>
                </div>
              )
            })}

            {/* No Results */}
            {filteredCommands.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No commands found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function CommandItem({
  command,
  isSelected,
  onClick,
}: {
  command: Command
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-md px-2 py-2 text-left transition-colors",
        isSelected
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-muted"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {command.icon && (
            <div className={cn("shrink-0", isSelected ? "text-primary-foreground" : "text-muted-foreground")}>
              {command.icon}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{command.label}</span>
            {command.description && (
              <span className={cn("text-xs", isSelected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {command.description}
              </span>
            )}
          </div>
        </div>
        {command.shortcut && (
          <kbd
            className={cn(
              "hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium",
              isSelected
                ? "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground"
                : "border-border bg-muted text-muted-foreground"
            )}
          >
            {command.shortcut}
          </kbd>
        )}
      </div>
    </button>
  )
}

