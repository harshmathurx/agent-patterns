import { z } from "zod"

/**
 * Insights List Schema
 * 
 * Standards Compliance:
 * - rams.ai: Requires proper list semantics, ARIA labels, keyboard navigation, screen reader support
 * - ui-skills.com: Schema-driven, LLM-generatable, uses list primitives
 * - Vercel Guidelines: Responsive, performant, uses CSS variables
 * 
 * Accessibility: Use semantic <ul> or <ol>, proper ARIA labels, keyboard navigation.
 * Performance: Virtualize large lists, memoize insight items.
 */
export const insightsListSchema = z.object({
  title: z
    .string()
    .optional()
    .describe(
      "Title for the insights list. " +
      "Accessibility: Use <h2> or <h3> with proper heading hierarchy (rams.ai). " +
      "Performance: Keep title static to avoid re-renders (Vercel Guidelines)."
    ),
  insights: z
    .array(
      z.object({
        id: z
          .string()
          .describe(
            "Unique identifier for the insight. " +
            "Accessibility: Used for aria-describedby and focus management (rams.ai). " +
            "ui-skills.com: Simple string key ensures LLM can generate valid schemas."
          ),
        title: z
          .string()
          .describe(
            "Insight title or heading. " +
            "Accessibility: Use <h3> or <h4> within list items for proper structure (rams.ai). " +
            "Performance: Keep titles static to avoid re-renders (Vercel Guidelines)."
          ),
        description: z
          .string()
          .describe(
            "Detailed description of the insight. " +
            "Accessibility: Ensure descriptions are readable by screen readers (rams.ai). " +
            "Performance: Limit description length for optimal rendering (Vercel Guidelines)."
          ),
        type: z
          .enum(["info", "warning", "success", "error"])
          .optional()
          .describe(
            "Insight type affecting visual styling: 'info' (default), 'warning', 'success', or 'error'. " +
            "Accessibility: Don't rely solely on color; use icons or text labels (rams.ai WCAG). " +
            "ui-skills.com: Enum ensures deterministic LLM generation. " +
            "Vercel Guidelines: Use theme-aware color variables for types."
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
      })
    )
    .describe(
      "Array of insight objects to display. " +
      "Accessibility: Use semantic <ul> or <ol> with proper list structure (rams.ai). " +
      "Performance: For 50+ insights, consider virtualization (Vercel Guidelines). " +
      "ui-skills.com: Array structure is LLM-friendly and deterministic."
    ),
  emptyMessage: z
    .string()
    .optional()
    .default("No insights available")
    .describe(
      "Message to display when there are no insights. " +
      "Accessibility: Use role='status' or aria-live to announce empty state (rams.ai). " +
      "Performance: Only render when insights array is empty (Vercel Guidelines)."
    ),
  className: z
    .string()
    .optional()
    .describe(
      "Additional CSS classes to apply to the list container. " +
      "Vercel Guidelines: Use responsive utilities, theme-aware variables. " +
      "Performance: Minimize class string operations (Vercel Guidelines)."
    ),
})

export type InsightsListData = z.infer<typeof insightsListSchema>


