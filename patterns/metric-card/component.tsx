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
    const trendColor =
      trend?.direction === "up"
        ? "text-green-600 dark:text-green-400"
        : trend?.direction === "down"
          ? "text-red-600 dark:text-red-400"
          : "text-muted-foreground"

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-border bg-card p-6 shadow-sm",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 text-sm">
                <span className={trendColor}>
                  {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→"}
                  {Math.abs(trend.value)}%
                </span>
                <span className="text-muted-foreground">{trend.label}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="text-muted-foreground">{icon}</div>
          )}
        </div>
      </div>
    )
  }
)

MetricCard.displayName = "MetricCard"


