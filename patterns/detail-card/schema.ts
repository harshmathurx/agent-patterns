import { z } from "zod"

export const detailCardSchema = z.object({
  title: z.string().optional().describe("Card title"),
  description: z.string().optional().describe("Card description or subtitle"),
  fields: z
    .array(
      z.object({
        label: z.string().describe("Field label"),
        value: z
          .union([z.string(), z.number(), z.boolean()])
          .describe("Field value (can be string, number, or boolean)"),
        span: z
          .enum([1, 2])
          .optional()
          .describe("Column span: 1 for single column, 2 for full width"),
      })
    )
    .describe("Array of detail fields to display"),
  actions: z
    .any()
    .optional()
    .describe("Optional React node for action buttons"),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the card"),
})

export type DetailCardData = z.infer<typeof detailCardSchema>


