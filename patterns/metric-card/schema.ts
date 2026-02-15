import { z } from "zod"

export const metricCardSchema = z.object({
  label: z
    .string()
    .describe("Display label for the metric (e.g., 'Total Revenue', 'Active Users')"),
  value: z
    .union([z.string(), z.number()])
    .describe("The metric value to display (e.g., '$45,231' or 1250)"),
  trend: z
    .object({
      value: z
        .number()
        .describe("Percentage change value (can be positive, negative, or zero)"),
      label: z
        .string()
        .describe("Trend time period description (e.g., 'vs last month', 'from yesterday')"),
      direction: z
        .enum(["up", "down", "neutral"])
        .describe(
          "Trend direction:\n" +
          "- 'up': Positive trend (green indicator with up arrow)\n" +
          "- 'down': Negative trend (red indicator with down arrow)\n" +
          "- 'neutral': No significant change (gray indicator with right arrow)"
        ),
    })
    .optional()
    .describe("Optional trend information showing change over time with visual indicator"),
  icon: z
    .any()
    .optional()
    .describe("Optional React icon component displayed in the top-right corner"),
  sparkline: z
    .array(z.number())
    .optional()
    .describe(
      "Optional array of numbers to display as a mini line chart below the metric. " +
      "Shows trend visualization. Example: [10, 15, 13, 18, 20, 25]"
    ),
  loading: z
    .boolean()
    .default(false)
    .describe("Show loading skeleton state while data is being fetched"),
  comparison: z
    .object({
      value: z
        .union([z.string(), z.number()])
        .describe("Comparison metric value"),
      label: z
        .string()
        .describe("Comparison time period label (e.g., 'last month', 'last year')"),
    })
    .optional()
    .describe("Optional comparison with previous period showing side-by-side values"),
  size: z
    .enum(["sm", "md", "lg"])
    .default("md")
    .describe(
      "Card size:\n" +
      "- 'sm': Compact size for dense layouts\n" +
      "- 'md': Standard size (default)\n" +
      "- 'lg': Large size for emphasis"
    ),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the card container"),
})

export type MetricCardProps = z.infer<typeof metricCardSchema>
