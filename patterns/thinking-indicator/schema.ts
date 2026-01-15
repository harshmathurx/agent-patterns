import { z } from "zod"

export const thinkingIndicatorSchema = z.object({
  message: z
    .string()
    .optional()
    .default("Thinking...")
    .describe("Message to display next to the indicator"),
  variant: z
    .enum(["dots", "pulse", "spinner"])
    .optional()
    .default("dots")
    .describe("Animation variant: 'dots' for animated dots, 'pulse' for pulsing circle, 'spinner' for rotating spinner"),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the indicator container"),
})

export type ThinkingIndicatorData = z.infer<typeof thinkingIndicatorSchema>

