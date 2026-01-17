import { z } from "zod"

export const chartSchema = z.object({
  title: z.string().optional().describe("Chart title"),
  data: z
    .array(
      z.object({
        label: z.string().describe("Data point label"),
        value: z.number().describe("Numeric value for the data point"),
        color: z.string().optional().describe("Optional color for the data point"),
      })
    )
    .describe("Array of data points to display in the chart"),
  type: z
    .enum(["bar", "line", "pie"])
    .optional()
    .default("bar")
    .describe("Chart type: 'bar' for bar chart, 'line' for line chart, 'pie' for pie chart"),
  showLegend: z
    .boolean()
    .optional()
    .default(true)
    .describe("Whether to show the legend below the chart"),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the chart container"),
})

export type ChartData = z.infer<typeof chartSchema>


