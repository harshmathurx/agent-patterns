"use client"

import { useState } from "react"
import { cn } from "@agent-patterns/core"

interface SidebarItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  badge?: string
  children?: SidebarItem[]
  active?: boolean
}

interface SidebarHeader {
  title: string
  subtitle?: string
  logo?: React.ReactNode
}

interface SidebarProps {
  items: SidebarItem[]
  header?: SidebarHeader
  footer?: React.ReactNode
  collapsible?: boolean
  defaultCollapsed?: boolean
  className?: string
  onItemClick?: (item: SidebarItem) => void
}

export function Sidebar({
  items,
  header,
  footer,
  collapsible = true,
  defaultCollapsed = false,
  className,
  onItemClick,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }

  const renderItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id)
            } else if (onItemClick) {
              onItemClick(item)
            }
          }}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            item.active && "bg-accent text-accent-foreground font-medium",
            level > 0 && "pl-10"
          )}
        >
          {item.icon && <div className="h-5 w-5 shrink-0">{item.icon}</div>}
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <svg
                  className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </>
          )}
        </button>
        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      {header && (
        <div className={cn("border-b border-border p-4", collapsed && "px-3")}>
          {collapsed ? (
            <div className="flex justify-center">{header.logo}</div>
          ) : (
            <div className="flex items-center gap-3">
              {header.logo && <div className="h-8 w-8 shrink-0">{header.logo}</div>}
              <div className="flex-1 overflow-hidden">
                <h2 className="truncate text-sm font-semibold text-foreground">{header.title}</h2>
                {header.subtitle && (
                  <p className="truncate text-xs text-muted-foreground">{header.subtitle}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation Items */}
      <div className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => renderItem(item))}
      </div>

      {/* Footer */}
      {footer && (
        <div className={cn("border-t border-border p-4", collapsed && "px-3")}>{footer}</div>
      )}

      {/* Collapse Toggle */}
      {collapsible && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="border-t border-border p-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  )
}

