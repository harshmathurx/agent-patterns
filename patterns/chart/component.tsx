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
    const chartId = React.useId()
    const titleId = title ? `${chartId}-title` : undefined
    const chartLabelId = `${chartId}-label`
    const dataTableId = `${chartId}-data`
    
    const maxValue = Math.max(...data.map((d) => d.value), 0)
    const totalValue = data.reduce((sum, p) => sum + p.value, 0)

    // Generate accessible text description
    const chartDescription = `${type} chart${title ? `: ${title}` : ""} showing ${data.length} data points. ${data.map((d, i) => `${d.label}: ${d.value}${i < data.length - 1 ? ", " : ""}`).join("")}`

    // Generate data table for screen readers
    const dataTable = (
      <table id={dataTableId} className="sr-only" aria-label="Chart data table">
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Value</th>
            {type === "pie" && <th scope="col">Percentage</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((point, index) => {
            const percentage = type === "pie" ? ((point.value / totalValue) * 100).toFixed(1) : undefined
            return (
              <tr key={index}>
                <td>{point.label}</td>
                <td>{point.value}</td>
                {percentage && <td>{percentage}%</td>}
              </tr>
            )
          })}
        </tbody>
      </table>
    )

    return (
      <div
        ref={ref}
        role="img"
        aria-label={chartDescription}
        aria-labelledby={titleId ? titleId : undefined}
        aria-describedby={dataTableId}
        className={cn("rounded-lg border border-border bg-card p-6", className)}
        {...props}
      >
        {dataTable}
        {title && (
          <h3 id={titleId} className="mb-4 text-lg font-semibold text-foreground">
            {title}
          </h3>
        )}
        <div className="space-y-4" aria-hidden="true">
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
                      aria-label={`${point.label}: ${point.value}`}
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
                    aria-label={`${point.label}: ${point.value}`}
                  />
                  <span className="text-xs text-muted-foreground">{point.label}</span>
                </div>
              ))}
            </div>
          )}
          {type === "pie" && (
            <div className="flex items-center justify-center">
              <div className="relative h-48 w-48">
                <svg
                  className="h-full w-full transform -rotate-90"
                  aria-hidden="true"
                  focusable="false"
                >
                  <title>{chartDescription}</title>
                  {data.reduce(
                    (acc, point, index) => {
                      const percentage = point.value / totalValue
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
                          aria-label={`${point.label}: ${point.value} (${(percentage * 100).toFixed(1)}%)`}
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
            <div className="flex flex-wrap gap-4 pt-4" role="list" aria-label="Chart legend">
              {data.map((point, index) => (
                <div key={index} className="flex items-center gap-2" role="listitem">
                  <div className="h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
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


