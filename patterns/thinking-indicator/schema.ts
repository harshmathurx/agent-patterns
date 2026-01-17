import { z } from "zod"

/**
 * Thinking Indicator Schema
 * 
 * Standards Compliance:
 * - rams.ai: Requires aria-live regions, screen reader announcements, accessible animations
 * - ui-skills.com: Schema-driven, LLM-generatable, uses simple primitives
 * - Vercel Guidelines: Performant animations, uses CSS variables
 * 
 * Accessibility: Use aria-live to announce status changes, respect prefers-reduced-motion.
 * Performance: Use CSS animations, avoid JavaScript-based animations.
 */
export const thinkingIndicatorSchema = z.object({
  message: z
    .string()
    .optional()
    .default("Thinking...")
    .describe(
      "Message to display next to the indicator. " +
      "Accessibility: Use aria-live='polite' to announce status changes (rams.ai). " +
      "Performance: Keep message static to avoid re-renders (Vercel Guidelines)."
    ),
  variant: z
    .enum(["dots", "pulse", "spinner"])
    .optional()
    .default("dots")
    .describe(
      "Animation variant: 'dots' for animated dots, 'pulse' for pulsing circle, 'spinner' for rotating spinner. " +
      "Accessibility: Respect prefers-reduced-motion media query (rams.ai WCAG). " +
      "ui-skills.com: Enum ensures deterministic LLM generation. " +
      "Performance: Use CSS animations, not JavaScript (Vercel Guidelines)."
    ),
  className: z
    .string()
    .optional()
    .describe(
      "Additional CSS classes to apply to the indicator container. " +
      "Vercel Guidelines: Use theme-aware CSS variables. " +
      "Performance: Minimize class string operations (Vercel Guidelines)."
    ),
})

export type ThinkingIndicatorData = z.infer<typeof thinkingIndicatorSchema>


