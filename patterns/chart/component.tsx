import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface ChartDataPoint {
  label: string
  value: number
  color?: string
}

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  data: ChartDataPoint[]
  type?: "bar" | "line" | "pie"
  showLegend?: boolean
}

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ title, data, type = "bar", showLegend = true, className, ...props }, ref) => {
    const maxValue = Math.max(...data.map((d) => d.value), 0)

    return (
      <div
        ref={ref}
        className={cn("rounded-lg border border-border bg-card p-6", className)}
        {...props}
      >
        {title && (
          <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
        )}
        <div className="space-y-4">
          {type === "bar" && (
            <div className="space-y-2">
              {data.map((point, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{point.label}</span>
                    <span className="text-muted-foreground">{point.value}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(point.value / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {type === "line" && (
            <div className="h-48 flex items-end justify-between gap-2">
              {data.map((point, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className="w-full bg-primary rounded-t transition-all"
                    style={{ height: `${(point.value / maxValue) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{point.label}</span>
                </div>
              ))}
            </div>
          )}
          {type === "pie" && (
            <div className="flex items-center justify-center">
              <div className="relative h-48 w-48">
                <svg className="h-full w-full transform -rotate-90">
                  {data.reduce(
                    (acc, point, index) => {
                      const percentage = point.value / data.reduce((sum, p) => sum + p.value, 0)
                      const offset = acc.offset
                      const strokeDasharray = `${percentage * 2 * Math.PI * 50} ${2 * Math.PI * 50}`
                      const element = (
                        <circle
                          key={index}
                          cx="50%"
                          cy="50%"
                          r="50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="20"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={-offset}
                          className="text-primary"
                        />
                      )
                      acc.offset += percentage * 2 * Math.PI * 50
                      acc.elements.push(element)
                      return acc
                    },
                    { offset: 0, elements: [] as React.ReactNode[] }
                  ).elements}
                </svg>
              </div>
            </div>
          )}
          {showLegend && (
            <div className="flex flex-wrap gap-4 pt-4">
              {data.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">
                    {point.label}: {point.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
)

Chart.displayName = "Chart"


