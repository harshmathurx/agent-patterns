"use client"

import { cn } from "@agent-patterns/core"

interface Stat {
  id: string
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  color?: "default" | "success" | "warning" | "danger"
}

interface StatsGridProps {
  stats: Stat[]
  columns?: number
  showDividers?: boolean
  className?: string
}

export function StatsGrid({
  stats,
  columns = 3,
  showDividers = true,
  className,
}: StatsGridProps) {
  const colorClasses = {
    default: "text-foreground",
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    danger: "text-red-600 dark:text-red-400",
  }

  const trendIcons = {
    up: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    down: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
        />
      </svg>
    ),
    neutral: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    ),
  }

  const getTrendColor = (trend: "up" | "down" | "neutral", change?: number) => {
    if (trend === "neutral") return "text-muted-foreground"
    if (change === undefined) return "text-muted-foreground"
    if (change > 0) return "text-green-600 dark:text-green-400"
    if (change < 0) return "text-red-600 dark:text-red-400"
    return "text-muted-foreground"
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        {
          "grid-cols-1": columns === 1,
          "grid-cols-2": columns === 2,
          "grid-cols-3": columns === 3,
          "grid-cols-4": columns === 4,
          "grid-cols-5": columns === 5,
          "grid-cols-6": columns === 6,
        },
        className
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={cn(
            "rounded-lg border border-border bg-card p-6 shadow-sm",
            showDividers && "relative"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p
                  className={cn(
                    "text-3xl font-bold",
                    stat.color ? colorClasses[stat.color] : colorClasses.default
                  )}
                >
                  {stat.value}
                </p>
              </div>
              {(stat.change !== undefined || stat.changeLabel) && (
                <div className="mt-2 flex items-center gap-1">
                  {stat.trend && (
                    <span className={getTrendColor(stat.trend, stat.change)}>
                      {trendIcons[stat.trend]}
                    </span>
                  )}
                  {stat.change !== undefined && (
                    <span
                      className={cn(
                        "text-sm font-medium",
                        getTrendColor(stat.trend || "neutral", stat.change)
                      )}
                    >
                      {stat.change > 0 ? "+" : ""}
                      {stat.change}%
                    </span>
                  )}
                  {stat.changeLabel && (
                    <span className="text-sm text-muted-foreground">{stat.changeLabel}</span>
                  )}
                </div>
              )}
            </div>
            {stat.icon && (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <div className="h-6 w-6 text-muted-foreground">{stat.icon}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

