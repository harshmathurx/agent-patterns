import { z } from "zod"

/**
 * Data Table Schema
 * 
 * Standards Compliance:
 * - rams.ai: Requires semantic HTML, ARIA labels, keyboard navigation, screen reader support
 * - ui-skills.com: Schema-driven, LLM-generatable, uses table primitives
 * - Vercel Guidelines: Responsive, performant, uses CSS variables
 * 
 * Accessibility: Use semantic <table> elements, proper ARIA attributes, keyboard navigation.
 * Performance: Virtualize large datasets, memoize accessor functions.
 */
export const dataTableSchema = z.object({
  columns: z
    .array(
      z.object({
        key: z
          .string()
          .describe(
            "Unique identifier for the column. " +
            "Accessibility: Used for aria-colindex and column identification (rams.ai). " +
            "ui-skills.com: Simple string key ensures LLM can generate valid schemas."
          ),
        header: z
          .string()
          .describe(
            "Display header text for the column. " +
            "Accessibility: Use <th scope='col'> with proper semantic HTML (rams.ai). " +
            "Performance: Keep headers static to avoid re-renders (Vercel Guidelines)."
          ),
        accessor: z
          .function()
          .optional()
          .describe(
            "Optional function to transform row data for this column. " +
            "Performance: Memoize accessor functions to prevent unnecessary recalculations (Vercel Guidelines). " +
            "ui-skills.com: Functions should be pure, no side effects for LLM generation."
          ),
        className: z
          .string()
          .optional()
          .describe(
            "Additional CSS classes for the column. " +
            "Vercel Guidelines: Use theme-aware CSS variables for consistent styling."
          ),
      })
    )
    .describe(
      "Array of column definitions. " +
      "Accessibility: Each column should have clear headers for screen readers (rams.ai). " +
      "Performance: Limit column count for optimal rendering (Vercel Guidelines). " +
      "ui-skills.com: Array structure is LLM-friendly and deterministic."
    ),
  data: z
    .array(z.record(z.unknown()))
    .describe(
      "Array of data objects, each representing a table row. " +
      "Accessibility: Use aria-rowindex and aria-rowcount for large tables (rams.ai). " +
      "Performance: For 100+ rows, consider virtualization (Vercel Guidelines). " +
      "ui-skills.com: Record type allows flexible data structures while maintaining schema validation."
    ),
  emptyMessage: z
    .string()
    .optional()
    .describe(
      "Message to display when table has no data. " +
      "Accessibility: Use role='status' or aria-live to announce empty state (rams.ai). " +
      "Performance: Only render when data array is empty (Vercel Guidelines)."
    ),
  caption: z
    .string()
    .optional()
    .describe(
      "Optional table caption for accessibility. " +
      "Accessibility: Use <caption> element for table description (rams.ai WCAG). " +
      "rams.ai: Caption helps screen readers understand table context."
    ),
  ariaLabel: z
    .string()
    .optional()
    .describe(
      "Optional ARIA label for the table. " +
      "Accessibility: Required if caption is not provided (rams.ai). " +
      "rams.ai: Use descriptive labels like 'Sales data for Q1 2024'."
    ),
  className: z
    .string()
    .optional()
    .describe(
      "Additional CSS classes to apply to the table container. " +
      "Vercel Guidelines: Use responsive utilities, theme-aware variables. " +
      "Performance: Minimize class string operations (Vercel Guidelines)."
    ),
})

export type DataTableData = z.infer<typeof dataTableSchema>


