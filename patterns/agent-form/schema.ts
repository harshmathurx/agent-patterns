import { z } from "zod"

export const formFieldSchema = z.object({
  name: z
    .string()
    .describe("Unique field identifier used as the key in form data"),
  label: z
    .string()
    .describe("Display label shown above the field"),
  type: z
    .enum(["text", "email", "number", "textarea", "select", "checkbox", "date", "password", "radio", "toggle", "file"])
    .describe(
      "Field input type:\n" +
      "- 'text': Single-line text input\n" +
      "- 'email': Email input with validation\n" +
      "- 'number': Numeric input\n" +
      "- 'textarea': Multi-line text input\n" +
      "- 'select': Dropdown selection (requires 'options')\n" +
      "- 'checkbox': Single checkbox\n" +
      "- 'date': Date picker\n" +
      "- 'password': Password input (masked)\n" +
      "- 'radio': Radio button group (requires 'options')\n" +
      "- 'toggle': Toggle switch (on/off)\n" +
      "- 'file': File upload"
    ),
  placeholder: z
    .string()
    .optional()
    .describe("Placeholder text shown when field is empty"),
  required: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether this field is required. Shows asterisk (*) and validates on submit."),
  options: z
    .array(
      z.object({
        label: z.string().describe("Display text for the option"),
        value: z.string().describe("Value submitted when option is selected"),
      })
    )
    .optional()
    .describe("Array of options for 'select' and 'radio' field types. Required for those types."),
  defaultValue: z
    .union([z.string(), z.number(), z.boolean()])
    .optional()
    .describe("Default value for the field when form loads"),
  validation: z
    .any()
    .optional()
    .describe("Optional Zod schema for field-level validation. Example: z.string().email() for email validation"),
  description: z
    .string()
    .optional()
    .describe("Helper text shown below the field label to guide the user"),
})

export const agentFormSchema = z.object({
  title: z
    .string()
    .optional()
    .describe("Form title displayed at the top"),
  description: z
    .string()
    .optional()
    .describe("Form description shown below the title"),
  fields: z
    .array(formFieldSchema)
    .min(1)
    .describe(
      "Array of form field definitions. Each field needs 'name', 'label', and 'type'. " +
      "Fields are rendered in the order provided."
    ),
  onSubmit: z
    .function()
    .args(z.record(z.any()))
    .returns(z.union([z.void(), z.promise(z.void())]))
    .optional()
    .describe("Callback function called when form is submitted with valid data. Receives form data object."),
  submitLabel: z
    .string()
    .default("Submit")
    .describe("Text shown on the submit button"),
  schema: z
    .any()
    .optional()
    .describe(
      "Optional Zod schema for form-level validation. When provided, the entire form data is validated against this schema on submit. " +
      "This is the killer feature: LLMs can generate both the form fields AND the validation schema together!"
    ),
  showValidationErrors: z
    .boolean()
    .default(true)
    .describe("Whether to display validation error messages below fields"),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the form container"),
})

export type FormField = z.infer<typeof formFieldSchema>
export type AgentFormProps = z.infer<typeof agentFormSchema>
