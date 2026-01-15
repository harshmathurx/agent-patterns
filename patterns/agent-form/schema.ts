import { z } from "zod"

export const agentFormSchema = z.object({
  title: z.string().optional().describe("Form title"),
  description: z.string().optional().describe("Form description or help text"),
  fields: z
    .array(
      z.object({
        name: z.string().describe("Field name (used as key in form data)"),
        label: z.string().describe("Display label for the field"),
        type: z
          .enum(["text", "email", "number", "textarea", "select", "checkbox"])
          .describe("Input field type"),
        placeholder: z
          .string()
          .optional()
          .describe("Placeholder text for the input"),
        required: z
          .boolean()
          .optional()
          .describe("Whether the field is required"),
        options: z
          .array(
            z.object({
              label: z.string().describe("Option display label"),
              value: z.string().describe("Option value"),
            })
          )
          .optional()
          .describe("Options for select fields"),
        defaultValue: z
          .union([z.string(), z.number(), z.boolean()])
          .optional()
          .describe("Default value for the field"),
      })
    )
    .describe("Array of form field definitions"),
  onSubmit: z
    .function()
    .optional()
    .describe("Callback function called when form is submitted"),
  submitLabel: z
    .string()
    .optional()
    .default("Submit")
    .describe("Label for the submit button"),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the form"),
})

export type AgentFormData = z.infer<typeof agentFormSchema>

