import { z } from "zod"

export const insightSchema = z.object({
  id: z
    .string()
    .describe("Unique identifier for the insight"),
  title: z
    .string()
    .describe("Title/headline of the insight"),
  description: z
    .string()
    .describe("Detailed description or explanation of the insight"),
  type: z
    .enum(["info", "warning", "success", "error"])
    .optional()
    .default("info")
    .describe(
      "Type of insight that determines visual styling:\n" +
      "- 'info': Informational insight (blue)\n" +
      "- 'warning': Warning that needs attention (yellow)\n" +
      "- 'success': Positive insight or achievement (green)\n" +
      "- 'error': Error or critical issue (red)"
    ),
  icon: z
    .any()
    .optional()
    .describe("Optional custom React icon component. If not provided, uses default icon based on type."),
  priority: z
    .enum(["high", "medium", "low"])
    .optional()
    .describe("Priority level displayed as a badge. Use with sortByPriority for automatic sorting."),
  collapsible: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether the insight can be collapsed/expanded. Useful for long descriptions."),
  actions: z
    .array(
      z.object({
        label: z
          .string()
          .describe("Button label text"),
        onClick: z
          .function()
          .returns(z.void())
          .describe("Function called when action button is clicked"),
      })
    )
    .optional()
    .describe("Optional array of action buttons displayed below the insight description"),
})

export const insightsListSchema = z.object({
  insights: z
    .array(insightSchema)
    .describe("Array of insights to display. Each insight can have different types, priorities, and actions."),
  emptyMessage: z
    .string()
    .default("No insights available")
    .describe("Message shown when there are no insights to display"),
  showFilters: z
    .boolean()
    .default(false)
    .describe("Show filter buttons above the list to filter by type (All, Info, Warnings, Success, Errors)"),
  sortByPriority: z
    .boolean()
    .default(false)
    .describe("Automatically sort insights by priority: high → medium → low"),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the container"),
})

export type Insight = z.infer<typeof insightSchema>
export type InsightsListProps = z.infer<typeof insightsListSchema>
