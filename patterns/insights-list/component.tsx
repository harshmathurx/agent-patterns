import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface Insight {
  id: string
  title: string
  description: string
  type?: "info" | "warning" | "success" | "error"
  icon?: React.ReactNode
  priority?: "high" | "medium" | "low"
  collapsible?: boolean
  actions?: {
    label: string
    onClick: () => void
  }[]
}

export interface InsightsListProps extends React.HTMLAttributes<HTMLDivElement> {
  insights: Insight[]
  emptyMessage?: string
  showFilters?: boolean
  sortByPriority?: boolean
}

export const InsightsList = React.forwardRef<HTMLDivElement, InsightsListProps>(
  (
    {
      insights,
      emptyMessage = "No insights available",
      showFilters = false,
      sortByPriority = false,
      className,
      ...props
    },
    ref
  ) => {
    const [expandedInsights, setExpandedInsights] = React.useState<Set<string>>(new Set())
    const [typeFilter, setTypeFilter] = React.useState<string>("all")

    const toggleExpanded = (id: string) => {
      setExpandedInsights((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(id)) {
          newSet.delete(id)
        } else {
          newSet.add(id)
        }
        return newSet
      })
    }

    // Filter insights by type
    const filteredInsights = React.useMemo(() => {
      if (typeFilter === "all") return insights
      return insights.filter((insight) => insight.type === typeFilter)
    }, [insights, typeFilter])

    // Sort insights by priority
    const sortedInsights = React.useMemo(() => {
      if (!sortByPriority) return filteredInsights

      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return [...filteredInsights].sort((a, b) => {
        const aPriority = priorityOrder[a.priority || "low"]
        const bPriority = priorityOrder[b.priority || "low"]
        return aPriority - bPriority
      })
    }, [filteredInsights, sortByPriority])

    const getTypeStyles = (type?: "info" | "warning" | "success" | "error") => {
      switch (type) {
        case "warning":
          return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
        case "success":
          return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
        case "error":
          return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
        case "info":
        default:
          return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950"
      }
    }

    const getTypeIcon = (type?: "info" | "warning" | "success" | "error") => {
      switch (type) {
        case "warning":
          return (
            <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )
        case "success":
          return (
            <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        case "error":
          return (
            <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        case "info":
        default:
          return (
            <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
      }
    }

    const getPriorityBadge = (priority?: "high" | "medium" | "low") => {
      if (!priority) return null

      const styles = {
        high: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
        medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
        low: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      }

      return (
        <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", styles[priority])}>
          {priority}
        </span>
      )
    }

    if (sortedInsights.length === 0) {
      return (
        <div
          ref={ref}
          className={cn("rounded-lg border border-border bg-card p-8 text-center", className)}
          {...props}
        >
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {showFilters && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTypeFilter("all")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                typeFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              All
            </button>
            <button
              onClick={() => setTypeFilter("info")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                typeFilter === "info"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              Info
            </button>
            <button
              onClick={() => setTypeFilter("warning")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                typeFilter === "warning"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              Warnings
            </button>
            <button
              onClick={() => setTypeFilter("success")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                typeFilter === "success"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              Success
            </button>
            <button
              onClick={() => setTypeFilter("error")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                typeFilter === "error"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              Errors
            </button>
          </div>
        )}

        <div className="space-y-3" role="list">
          {sortedInsights.map((insight) => {
            const isExpanded = expandedInsights.has(insight.id)
            const hasActions = insight.actions && insight.actions.length > 0

            return (
              <div
                key={insight.id}
                role="listitem"
                className={cn("rounded-lg border p-4", getTypeStyles(insight.type))}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {insight.icon || getTypeIcon(insight.type)}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{insight.title}</h3>
                          {getPriorityBadge(insight.priority)}
                        </div>
                      </div>

                      {insight.collapsible && (
                        <button
                          onClick={() => toggleExpanded(insight.id)}
                          className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                          aria-expanded={isExpanded}
                          aria-label={isExpanded ? "Collapse" : "Expand"}
                        >
                          <svg
                            className={cn("h-5 w-5 transition-transform", isExpanded && "rotate-180")}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {(!insight.collapsible || isExpanded) && (
                      <>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>

                        {hasActions && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {insight.actions!.map((action, index) => (
                              <button
                                key={index}
                                onClick={action.onClick}
                                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

InsightsList.displayName = "InsightsList"
