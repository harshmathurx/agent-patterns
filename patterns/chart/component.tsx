import * as React from "react"
import { cn } from "@agent-patterns/core"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

export interface ChartDataPoint {
  label: string
  value: number
  color?: string
}

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  data: ChartDataPoint[]
  type?: "bar" | "line" | "area" | "pie" | "donut"
  showLegend?: boolean
  showGrid?: boolean
  colors?: string[]
}

const DEFAULT_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      title,
      data,
      type = "bar",
      showLegend = true,
      showGrid = true,
      colors = DEFAULT_COLORS,
      className,
      ...props
    },
    ref
  ) => {
    const chartId = React.useId()
    const titleId = title ? `${chartId}-title` : undefined

    // Transform data for Recharts
    const chartData = data.map((point, index) => ({
      name: point.label,
      value: point.value,
      fill: point.color || colors[index % colors.length],
    }))

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
            <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
            <p className="text-sm text-muted-foreground">
              Value: <span className="font-semibold text-foreground">{payload[0].value}</span>
            </p>
          </div>
        )
      }
      return null
    }

    const renderChart = () => {
      switch (type) {
        case "bar":
          return (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
                <XAxis
                  dataKey="name"
                  className="text-xs text-muted-foreground"
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  className="text-xs text-muted-foreground"
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip content={<CustomTooltip />} />
                {showLegend && <Legend />}
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )

        case "line":
          return (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
                <XAxis
                  dataKey="name"
                  className="text-xs text-muted-foreground"
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  className="text-xs text-muted-foreground"
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip content={<CustomTooltip />} />
                {showLegend && <Legend />}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )

        case "area":
          return (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
                <XAxis
                  dataKey="name"
                  className="text-xs text-muted-foreground"
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  className="text-xs text-muted-foreground"
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip content={<CustomTooltip />} />
                {showLegend && <Legend />}
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )

        case "pie":
        case "donut":
          return (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={type === "donut" ? 100 : 120}
                  innerRadius={type === "donut" ? 60 : 0}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                {showLegend && <Legend />}
              </PieChart>
            </ResponsiveContainer>
          )

        default:
          return null
      }
    }

    return (
      <div
        ref={ref}
        role="img"
        aria-labelledby={titleId}
        className={cn("rounded-lg border border-border bg-card p-6", className)}
        {...props}
      >
        {title && (
          <h3 id={titleId} className="mb-4 text-lg font-semibold text-foreground">
            {title}
          </h3>
        )}
        {renderChart()}
      </div>
    )
  }
)

Chart.displayName = "Chart"
