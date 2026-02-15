import { z } from "zod"

export const chartDataPointSchema = z.object({
  label: z
    .string()
    .describe("Label for this data point (e.g., month name, category name)"),
  value: z
    .number()
    .describe("Numeric value for this data point"),
  color: z
    .string()
    .optional()
    .describe("Optional custom color for this data point. Use CSS color values or HSL variables like 'hsl(var(--primary))'"),
})

export const chartSchema = z.object({
  title: z
    .string()
    .optional()
    .describe("Title displayed above the chart"),
  data: z
    .array(chartDataPointSchema)
    .min(1)
    .describe(
      "Array of data points to visualize. Each point needs a 'label' (string) and 'value' (number). " +
      "Example: [{label: 'Jan', value: 1200}, {label: 'Feb', value: 1900}]"
    ),
  type: z
    .enum(["bar", "line", "area", "pie", "donut"])
    .default("bar")
    .describe(
      "Chart type:\n" +
      "- 'bar': Vertical bar chart for comparing values\n" +
      "- 'line': Line chart for showing trends over time\n" +
      "- 'area': Area chart (filled line chart) for showing cumulative trends\n" +
      "- 'pie': Pie chart for showing proportions\n" +
      "- 'donut': Donut chart (pie chart with hollow center)"
    ),
  showLegend: z
    .boolean()
    .default(true)
    .describe("Whether to display the legend below the chart"),
  showGrid: z
    .boolean()
    .default(true)
    .describe("Whether to display grid lines (for bar/line/area charts only)"),
  colors: z
    .array(z.string())
    .optional()
    .describe(
      "Optional array of colors to use for chart elements. If not provided, uses theme default colors. " +
      "Can use HSL variables like ['hsl(var(--primary))', 'hsl(var(--secondary))'] or direct colors."
    ),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the chart container"),
})

export type ChartDataPoint = z.infer<typeof chartDataPointSchema>
export type ChartProps = z.infer<typeof chartSchema>
