import { z } from "zod"

export const insightsListSchema = z.object({
  title: z.string().optional().describe("Title for the insights list"),
  insights: z
    .array(
      z.object({
        id: z.string().describe("Unique identifier for the insight"),
        title: z.string().describe("Insight title or heading"),
        description: z.string().describe("Detailed description of the insight"),
        type: z
          .enum(["info", "warning", "success", "error"])
          .optional()
          .describe("Insight type affecting visual styling: 'info' (default), 'warning', 'success', or 'error'"),
        icon: z
          .any()
          .optional()
          .describe("Optional React icon component to display"),
      })
    )
    .describe("Array of insight objects to display"),
  emptyMessage: z
    .string()
    .optional()
    .default("No insights available")
    .describe("Message to display when there are no insights"),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the list container"),
})

export type InsightsListData = z.infer<typeof insightsListSchema>


