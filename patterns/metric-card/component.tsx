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
  sparkline?: number[]
  loading?: boolean
  comparison?: {
    value: string | number
    label: string
  }
  size?: "sm" | "md" | "lg"
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      label,
      value,
      trend,
      icon,
      sparkline,
      loading = false,
      comparison,
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const cardId = React.useId()
    const trendId = trend ? `${cardId}-trend` : undefined
    const trendColor =
      trend?.direction === "up"
        ? "text-green-600 dark:text-green-400"
        : trend?.direction === "down"
        ? "text-red-600 dark:text-red-400"
        : "text-muted-foreground"

    // Generate sparkline SVG path
    const generateSparklinePath = (data: number[]): string => {
      if (data.length === 0) return ""

      const width = 100
      const height = 30
      const max = Math.max(...data)
      const min = Math.min(...data)
      const range = max - min || 1

      const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * width
        const y = height - ((value - min) / range) * height
        return `${x},${y}`
      })

      return `M ${points.join(" L ")}`
    }

    // Size classes
    const sizeClasses = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    }

    const valueSizeClasses = {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-3xl",
    }

    const labelSizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    }

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg border border-border bg-card",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <div className="space-y-3">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-8 w-32 animate-pulse rounded bg-muted" />
            {sparkline && <div className="h-8 w-full animate-pulse rounded bg-muted" />}
            {trend && <div className="h-4 w-20 animate-pulse rounded bg-muted" />}
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-labelledby={`${cardId}-label`}
        className={cn(
          "rounded-lg border border-border bg-card",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-1">
            <p
              id={`${cardId}-label`}
              className={cn("font-medium text-muted-foreground", labelSizeClasses[size])}
            >
              {label}
            </p>
            <p
              className={cn("font-bold text-foreground", valueSizeClasses[size])}
              aria-live="polite"
            >
              {value}
            </p>

            {comparison && (
              <p className="text-xs text-muted-foreground">
                vs {comparison.label}: <span className="font-semibold text-foreground">{comparison.value}</span>
              </p>
            )}

            {trend && (
              <div className="flex items-center gap-1 text-xs" aria-describedby={trendId}>
                <span
                  className={cn("font-semibold", trendColor)}
                  aria-label={`${trend.direction === "up" ? "Increased" : trend.direction === "down" ? "Decreased" : "No change"} by ${Math.abs(trend.value)}%`}
                >
                  {trend.direction === "up" && "↑"}
                  {trend.direction === "down" && "↓"}
                  {trend.direction === "neutral" && "→"}
                  {trend.value > 0 ? "+" : ""}
                  {trend.value}%
                </span>
                <span id={trendId} className="text-muted-foreground">
                  {trend.label}
                </span>
              </div>
            )}
          </div>

          {icon && (
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
        </div>

        {sparkline && sparkline.length > 0 && (
          <div className="mt-4">
            <svg
              viewBox="0 0 100 30"
              className="h-8 w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d={generateSparklinePath(sparkline)}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={cn(
                  "transition-colors",
                  trend?.direction === "up"
                    ? "text-green-500"
                    : trend?.direction === "down"
                    ? "text-red-500"
                    : "text-primary"
                )}
              />
            </svg>
          </div>
        )}
      </div>
    )
  }
)

MetricCard.displayName = "MetricCard"
