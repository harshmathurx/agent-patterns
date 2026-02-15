import { z } from "zod"

export const detailFieldSchema = z.object({
  label: z
    .string()
    .describe("Label for the detail field (e.g., 'Email', 'Created Date')"),
  value: z
    .any()
    .describe("Value to display. Can be string, number, or React element for custom rendering."),
  span: z
    .enum([1, 2])
    .optional()
    .default(1)
    .describe(
      "Column span in grid layout:\n" +
      "- 1: Single column (default)\n" +
      "- 2: Full width (spans both columns)"
    ),
  copyable: z
    .boolean()
    .optional()
    .default(false)
    .describe("Show a copy button next to the value. Only works with string values."),
  badge: z
    .object({
      text: z
        .string()
        .describe("Badge text"),
      variant: z
        .enum(["default", "success", "warning", "error"])
        .describe("Badge visual variant: default (gray), success (green), warning (yellow), error (red)"),
    })
    .optional()
    .describe("Optional badge displayed next to the value for status indicators"),
})

export const detailCardSchema = z.object({
  title: z
    .string()
    .optional()
    .describe("Card title displayed at the top"),
  description: z
    .string()
    .optional()
    .describe("Card description shown below the title"),
  fields: z
    .array(detailFieldSchema)
    .min(1)
    .describe(
      "Array of detail fields to display in a grid layout. Each field has a label and value. " +
      "Fields are arranged in a 2-column grid by default."
    ),
  actions: z
    .any()
    .optional()
    .describe("Optional React node for action buttons displayed in the header"),
  editable: z
    .boolean()
    .default(false)
    .describe("Enable edit mode with an Edit button. Allows inline editing of string field values."),
  onEdit: z
    .function()
    .args(z.record(z.any()))
    .returns(z.void())
    .optional()
    .describe("Callback function called when Save is clicked in edit mode. Receives updated field values."),
  loading: z
    .boolean()
    .default(false)
    .describe("Show loading skeleton state while data is being fetched"),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the card container"),
})

export type DetailField = z.infer<typeof detailFieldSchema>
export type DetailCardProps = z.infer<typeof detailCardSchema>
