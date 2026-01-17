import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface Insight {
  id: string
  title: string
  description: string
  type?: "info" | "warning" | "success" | "error"
  icon?: React.ReactNode
}

export interface InsightsListProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  insights: Insight[]
  emptyMessage?: string
}

export const InsightsList = React.forwardRef<HTMLDivElement, InsightsListProps>(
  (
    { title, insights, emptyMessage = "No insights available", className, ...props },
    ref
  ) => {
    const getTypeStyles = (type?: string) => {
      switch (type) {
        case "warning":
          return "border-yellow-500/50 bg-yellow-500/10"
        case "success":
          return "border-green-500/50 bg-green-500/10"
        case "error":
          return "border-red-500/50 bg-red-500/10"
        default:
          return "border-border bg-muted/50"
      }
    }

    const listId = React.useId()
    const titleId = title ? `${listId}-title` : undefined

    return (
      <div
        ref={ref}
        role="region"
        aria-labelledby={titleId}
        aria-label={title || "Insights list"}
        className={cn("rounded-lg border border-border bg-card p-6", className)}
        {...props}
      >
        {title && (
          <h3 id={titleId} className="mb-4 text-lg font-semibold text-foreground">
            {title}
          </h3>
        )}
        {insights.length === 0 ? (
          <p
            role="status"
            aria-live="polite"
            className="text-center text-sm text-muted-foreground"
          >
            {emptyMessage}
          </p>
        ) : (
          <ul role="list" className="space-y-3" aria-label={title ? `${title} insights` : "Insights"}>
            {insights.map((insight) => (
              <li
                key={insight.id}
                role="listitem"
                className={cn(
                  "rounded-md border p-4 transition-colors",
                  getTypeStyles(insight.type)
                )}
              >
                <div className="flex items-start gap-3">
                  {insight.icon && (
                    <div className="mt-0.5 text-muted-foreground" aria-hidden="true">
                      {insight.icon}
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-medium text-foreground">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

InsightsList.displayName = "InsightsList"


