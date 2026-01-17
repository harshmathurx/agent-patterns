import { z } from "zod"

/**
 * Metric Card Schema
 * 
 * Standards Compliance:
 * - rams.ai: Requires ARIA labels, keyboard navigation, and screen reader support
 * - ui-skills.com: Schema-driven, LLM-generatable, uses primitives
 * - Vercel Guidelines: Uses CSS variables, responsive, performance-optimized
 * 
 * Accessibility: Ensure label is descriptive and value is announced to screen readers.
 * Performance: Minimal re-renders, use React.memo for static values.
 */
export const metricCardSchema = z.object({
  label: z
    .string()
    .describe(
      "Display label for the metric. Accessibility: Use descriptive labels for screen readers (rams.ai). " +
      "Performance: Keep labels static to avoid unnecessary re-renders (Vercel Guidelines)."
    ),
  value: z
    .union([z.string(), z.number()])
    .describe(
      "The metric value to display. Accessibility: Value should be announced to screen readers via aria-live region (rams.ai). " +
      "Performance: Format numbers client-side to reduce bundle size (Vercel Guidelines)."
    ),
  trend: z
    .object({
      value: z
        .number()
        .describe(
          "Percentage change value. Accessibility: Include sign (+/-) and ensure color is not the only indicator (rams.ai WCAG)."
        ),
      label: z
        .string()
        .describe(
          "Trend description (e.g., 'vs last month'). Accessibility: Provide context for screen readers (rams.ai)."
        ),
      direction: z
        .enum(["up", "down", "neutral"])
        .describe(
          "Trend direction: 'up' for positive, 'down' for negative, 'neutral' for no change. " +
          "Accessibility: Use aria-label with direction for screen readers (rams.ai). " +
          "ui-skills.com: Enum ensures deterministic LLM generation."
        ),
    })
    .optional()
    .describe(
      "Optional trend information showing change over time. " +
      "Accessibility: Ensure trend is announced to screen readers via aria-live (rams.ai). " +
      "Performance: Only include if value changes to minimize re-renders (Vercel Guidelines)."
    ),
  icon: z
    .any()
    .optional()
    .describe(
      "Optional React icon component to display. " +
      "Accessibility: If decorative, use aria-hidden='true'; if informative, provide aria-label (rams.ai). " +
      "Performance: Use SVG icons optimized for size (Vercel Guidelines). " +
      "ui-skills.com: Icon should be a simple React component, not complex stateful element."
    ),
  className: z
    .string()
    .optional()
    .describe(
      "Additional CSS classes to apply to the card. " +
      "Vercel Guidelines: Use theme-aware CSS variables, avoid hardcoded colors. " +
      "Performance: Minimize class string concatenation in render (Vercel Guidelines)."
    ),
})

export type MetricCardData = z.infer<typeof metricCardSchema>


