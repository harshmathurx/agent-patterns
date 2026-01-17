import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  trend?: {
    value: number
    label: string
    direction: "up" | "down" | "neutral"
  }
  icon?: React.ReactNode
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ label, value, trend, icon, className, ...props }, ref) => {
    const cardId = React.useId()
    const labelId = `${cardId}-label`
    const valueId = `${cardId}-value`
    const trendId = `${cardId}-trend`

    // Use theme-aware colors: destructive for down, primary for up (can be themed to green)
    // For better theme compatibility, we use semantic colors that work across themes
    const trendColor =
      trend?.direction === "up"
        ? "text-emerald-600 dark:text-emerald-400"
        : trend?.direction === "down"
          ? "text-destructive"
          : "text-muted-foreground"

    const trendDescription = trend
      ? `${trend.direction === "up" ? "increased" : trend.direction === "down" ? "decreased" : "unchanged"} by ${Math.abs(trend.value)}% ${trend.label}`
      : undefined

    return (
      <div
        ref={ref}
        role="region"
        aria-labelledby={labelId}
        aria-label={trend ? `${label}: ${value}, ${trendDescription}` : `${label}: ${value}`}
        className={cn(
          "rounded-lg border border-border bg-card p-6 shadow-sm",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p id={labelId} className="text-sm font-medium text-muted-foreground">
              {label}
            </p>
            <p id={valueId} className="text-2xl font-bold text-foreground" aria-label={`${value}`}>
              {value}
            </p>
            {trend && (
              <div
                id={trendId}
                className="flex items-center gap-1 text-sm"
                aria-label={trendDescription}
              >
                <span className={trendColor} aria-hidden="true">
                  {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→"}
                  {Math.abs(trend.value)}%
                </span>
                <span className="text-muted-foreground" aria-hidden="true">
                  {trend.label}
                </span>
                <span className="sr-only">{trendDescription}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="text-muted-foreground" aria-hidden="true">
              {icon}
            </div>
          )}
        </div>
      </div>
    )
  }
)

MetricCard.displayName = "MetricCard"


