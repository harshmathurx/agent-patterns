import { z } from "zod"

/**
 * Detail Card Schema
 * 
 * Standards Compliance:
 * - rams.ai: Requires proper card semantics, ARIA labels, keyboard navigation, screen reader support
 * - ui-skills.com: Schema-driven, LLM-generatable, uses card primitives
 * - Vercel Guidelines: Responsive, performant, uses CSS variables
 * 
 * Accessibility: Use semantic structure, proper heading hierarchy, keyboard-accessible actions.
 * Performance: Minimize re-renders, memoize field values.
 */
export const detailCardSchema = z.object({
  title: z
    .string()
    .optional()
    .describe(
      "Card title. " +
      "Accessibility: Use <h2> or <h3> with proper heading hierarchy (rams.ai). " +
      "Performance: Keep title static to avoid re-renders (Vercel Guidelines)."
    ),
  description: z
    .string()
    .optional()
    .describe(
      "Card description or subtitle. " +
      "Accessibility: Use aria-describedby to associate with card content (rams.ai). " +
      "Performance: Only render when provided (Vercel Guidelines)."
    ),
  fields: z
    .array(
      z.object({
        label: z
          .string()
          .describe(
            "Field label. " +
            "Accessibility: Use <dt> in <dl> structure or proper label association (rams.ai). " +
            "Performance: Keep labels static to avoid re-renders (Vercel Guidelines)."
          ),
        value: z
          .union([z.string(), z.number(), z.boolean()])
          .describe(
            "Field value (can be string, number, or boolean). " +
            "Accessibility: Values should be readable by screen readers (rams.ai). " +
            "Performance: Format values during initialization, not in render (Vercel Guidelines). " +
            "ui-skills.com: Union type allows flexible values while maintaining schema validation."
          ),
        span: z
          .enum([1, 2])
          .optional()
          .describe(
            "Column span: 1 for single column, 2 for full width. " +
            "Accessibility: Ensure responsive layout doesn't break screen reader navigation (rams.ai). " +
            "ui-skills.com: Enum ensures deterministic LLM generation. " +
            "Vercel Guidelines: Use CSS Grid for responsive column spans."
          ),
      })
    )
    .describe(
      "Array of detail fields to display. " +
      "Accessibility: Use semantic <dl> structure or proper field grouping (rams.ai). " +
      "Performance: Limit field count for optimal rendering (20-30 max recommended) (Vercel Guidelines). " +
      "ui-skills.com: Array structure is LLM-friendly and deterministic."
    ),
  actions: z
    .any()
    .optional()
    .describe(
      "Optional React node for action buttons. " +
      "Accessibility: Ensure buttons are keyboard accessible and have proper ARIA labels (rams.ai). " +
      "Performance: Memoize action components to prevent unnecessary re-renders (Vercel Guidelines). " +
      "ui-skills.com: Actions should be simple React nodes, not complex stateful components."
    ),
  className: z
    .string()
    .optional()
    .describe(
      "Additional CSS classes to apply to the card. " +
      "Vercel Guidelines: Use theme-aware CSS variables, responsive utilities. " +
      "Performance: Minimize class string operations (Vercel Guidelines)."
    ),
})

export type DetailCardData = z.infer<typeof detailCardSchema>


