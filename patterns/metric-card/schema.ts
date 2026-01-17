import { z } from "zod"

export const metricCardSchema = z.object({
  label: z.string().describe("Display label for the metric"),
  value: z.union([z.string(), z.number()]).describe("The metric value to display"),
  trend: z
    .object({
      value: z.number().describe("Percentage change value"),
      label: z.string().describe("Trend description (e.g., 'vs last month')"),
      direction: z
        .enum(["up", "down", "neutral"])
        .describe("Trend direction: 'up' for positive, 'down' for negative, 'neutral' for no change"),
    })
    .optional()
    .describe("Optional trend information showing change over time"),
  icon: z
    .any()
    .optional()
    .describe("Optional React icon component to display"),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the card"),
})

export type MetricCardData = z.infer<typeof metricCardSchema>


