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

    return (
      <div
        ref={ref}
        className={cn("rounded-lg border border-border bg-card p-6", className)}
        {...props}
      >
        {title && (
          <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
        )}
        <div className="space-y-3">
          {insights.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">{emptyMessage}</p>
          ) : (
            insights.map((insight) => (
              <div
                key={insight.id}
                className={cn(
                  "rounded-md border p-4 transition-colors",
                  getTypeStyles(insight.type)
                )}
              >
                <div className="flex items-start gap-3">
                  {insight.icon && (
                    <div className="mt-0.5 text-muted-foreground">{insight.icon}</div>
                  )}
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-medium text-foreground">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }
)

InsightsList.displayName = "InsightsList"

