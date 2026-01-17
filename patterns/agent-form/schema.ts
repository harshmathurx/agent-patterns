import { z } from "zod"

/**
 * Agent Form Schema
 * 
 * Standards Compliance:
 * - rams.ai: Requires proper form labels, error handling, keyboard navigation, screen reader support
 * - ui-skills.com: Schema-driven, LLM-generatable, uses form primitives
 * - Vercel Guidelines: Accessible forms, responsive, performance-optimized
 * 
 * Accessibility: All fields must have labels, error messages, and keyboard support.
 * Performance: Debounce validation, minimize re-renders on input.
 */
export const agentFormSchema = z.object({
  title: z
    .string()
    .optional()
    .describe(
      "Form title. " +
      "Accessibility: Use <h2> or <h3> with proper heading hierarchy (rams.ai). " +
      "Performance: Keep title static to avoid re-renders (Vercel Guidelines)."
    ),
  description: z
    .string()
    .optional()
    .describe(
      "Form description or help text. " +
      "Accessibility: Use aria-describedby to associate with form fields (rams.ai). " +
      "Performance: Only render when provided (Vercel Guidelines)."
    ),
  fields: z
    .array(
      z.object({
        name: z
          .string()
          .describe(
            "Field name (used as key in form data). " +
            "Accessibility: Must match input id for proper label association (rams.ai). " +
            "ui-skills.com: Simple string key ensures LLM can generate valid schemas."
          ),
        label: z
          .string()
          .describe(
            "Display label for the field. " +
            "Accessibility: Required for all inputs, use <label> with htmlFor (rams.ai WCAG). " +
            "Performance: Keep labels static to avoid re-renders (Vercel Guidelines)."
          ),
        type: z
          .enum(["text", "email", "number", "textarea", "select", "checkbox"])
          .describe(
            "Input field type. " +
            "Accessibility: Use semantic input types (email, number) for better screen reader support (rams.ai). " +
            "ui-skills.com: Enum ensures deterministic LLM generation. " +
            "Performance: Native input types provide better browser optimization (Vercel Guidelines)."
          ),
        placeholder: z
          .string()
          .optional()
          .describe(
            "Placeholder text for the input. " +
            "Accessibility: Placeholder is not a substitute for labels (rams.ai WCAG). " +
            "Performance: Keep placeholders static (Vercel Guidelines)."
          ),
        required: z
          .boolean()
          .optional()
          .describe(
            "Whether the field is required. " +
            "Accessibility: Use aria-required='true' and indicate visually (rams.ai). " +
            "Performance: Validate on submit, not on every keystroke (Vercel Guidelines)."
          ),
        options: z
          .array(
            z.object({
              label: z
                .string()
                .describe(
                  "Option display label. " +
                  "Accessibility: Labels should be descriptive for screen readers (rams.ai)."
                ),
              value: z
                .string()
                .describe(
                  "Option value. " +
                  "ui-skills.com: Simple string value ensures LLM can generate valid options."
                ),
            })
          )
          .optional()
          .describe(
            "Options for select fields. " +
            "Accessibility: Use <select> with <option> elements for proper semantics (rams.ai). " +
            "Performance: Limit options for better UX (50 max recommended) (Vercel Guidelines). " +
            "ui-skills.com: Array structure is LLM-friendly."
          ),
        defaultValue: z
          .union([z.string(), z.number(), z.boolean()])
          .optional()
          .describe(
            "Default value for the field. " +
            "Accessibility: Default values should be announced to screen readers (rams.ai). " +
            "Performance: Set defaults during initialization, not in render (Vercel Guidelines)."
          ),
      })
    )
    .describe(
      "Array of form field definitions. " +
      "Accessibility: All fields must have proper labels and error handling (rams.ai). " +
      "Performance: Limit form fields for optimal UX (10-15 max recommended) (Vercel Guidelines). " +
      "ui-skills.com: Array structure is LLM-friendly and deterministic."
    ),
  onSubmit: z
    .function()
    .optional()
    .describe(
      "Callback function called when form is submitted. " +
      "Accessibility: Ensure form validation errors are announced to screen readers (rams.ai). " +
      "Performance: Debounce or throttle submission to prevent duplicate submissions (Vercel Guidelines). " +
      "ui-skills.com: Function should be pure, no side effects for LLM generation."
    ),
  submitLabel: z
    .string()
    .optional()
    .default("Submit")
    .describe(
      "Label for the submit button. " +
      "Accessibility: Use descriptive labels like 'Submit Order' not just 'Submit' (rams.ai). " +
      "Performance: Keep label static (Vercel Guidelines)."
    ),
  className: z
    .string()
    .optional()
    .describe(
      "Additional CSS classes to apply to the form. " +
      "Vercel Guidelines: Use responsive utilities, theme-aware variables. " +
      "Performance: Minimize class string operations (Vercel Guidelines)."
    ),
})

export type AgentFormData = z.infer<typeof agentFormSchema>


