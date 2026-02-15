import { z } from "zod"

export const codeBlockSchema = z.object({
  code: z.string().describe("Code content to display"),
  language: z.string().default("typescript").describe("Programming language for syntax highlighting"),
  filename: z.string().optional().describe("Optional filename to display"),
  showLineNumbers: z.boolean().default(true).describe("Whether to show line numbers"),
  highlightLines: z.array(z.number()).optional().describe("Line numbers to highlight (1-based)"),
  startLineNumber: z.number().default(1).describe("Starting line number"),
  copyable: z.boolean().default(true).describe("Whether to show copy button"),
  collapsible: z.boolean().default(false).describe("Whether code block can be collapsed"),
  maxHeight: z.string().optional().describe("Maximum height (e.g., '400px')"),
  className: z.string().optional().describe("Additional CSS classes"),
})

export type CodeBlock = z.infer<typeof codeBlockSchema>

