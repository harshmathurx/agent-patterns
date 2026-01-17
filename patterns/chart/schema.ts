import { z } from "zod"

/**
 * Chart Schema
 * 
 * Standards Compliance:
 * - rams.ai: Requires accessible chart descriptions, keyboard navigation, screen reader support
 * - ui-skills.com: Schema-driven, LLM-generatable, uses simple data structures
 * - Vercel Guidelines: Responsive, performant rendering, uses CSS variables
 * 
 * Accessibility: Provide text alternatives, use aria-label for chart descriptions.
 * Performance: Lazy load chart libraries, optimize data processing.
 */
export const chartSchema = z.object({
  title: z
    .string()
    .optional()
    .describe(
      "Chart title. " +
      "Accessibility: Use <h2> or <h3> with proper heading hierarchy (rams.ai). " +
      "Performance: Keep title static to avoid re-renders (Vercel Guidelines)."
    ),
  data: z
    .array(
      z.object({
        label: z
          .string()
          .describe(
            "Data point label. " +
            "Accessibility: Labels should be descriptive for screen readers (rams.ai). " +
            "Performance: Limit to reasonable number of data points (50-100 max) (Vercel Guidelines)."
          ),
        value: z
          .number()
          .describe(
            "Numeric value for the data point. " +
            "Accessibility: Values should be accessible via data table or aria-label (rams.ai). " +
            "Performance: Pre-process data to avoid calculations in render (Vercel Guidelines)."
          ),
        color: z
          .string()
          .optional()
          .describe(
            "Optional color for the data point. " +
            "Accessibility: Don't rely solely on color; use patterns or labels (rams.ai WCAG). " +
            "Vercel Guidelines: Use theme-aware color variables, not hardcoded hex values."
          ),
      })
    )
    .describe(
      "Array of data points to display in the chart. " +
      "Accessibility: Provide text alternative or data table for screen readers (rams.ai). " +
      "Performance: For large datasets, consider data aggregation (Vercel Guidelines). " +
      "ui-skills.com: Array structure is LLM-friendly and deterministic."
    ),
  type: z
    .enum(["bar", "line", "pie"])
    .optional()
    .default("bar")
    .describe(
      "Chart type: 'bar' for bar chart, 'line' for line chart, 'pie' for pie chart. " +
      "Accessibility: Ensure all chart types are keyboard navigable (rams.ai). " +
      "ui-skills.com: Enum ensures deterministic LLM generation. " +
      "Performance: Different chart types may have different rendering performance (Vercel Guidelines)."
    ),
  showLegend: z
    .boolean()
    .optional()
    .default(true)
    .describe(
      "Whether to show the legend below the chart. " +
      "Accessibility: Legend should be keyboard accessible and screen reader friendly (rams.ai). " +
      "Performance: Only render legend when needed (Vercel Guidelines)."
    ),
  className: z
    .string()
    .optional()
    .describe(
      "Additional CSS classes to apply to the chart container. " +
      "Vercel Guidelines: Use responsive utilities, theme-aware variables. " +
      "Performance: Minimize class string operations (Vercel Guidelines)."
    ),
})

export type ChartData = z.infer<typeof chartSchema>


