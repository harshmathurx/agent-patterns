import { z } from "zod"

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]).describe(
    "The role of the message sender: 'user' for human messages, 'assistant' for AI responses, 'system' for system notifications"
  ),
  content: z.string().describe("The message text content"),
  avatar: z.string().optional().describe("URL or initials for the avatar"),
  timestamp: z.union([z.string(), z.date()]).optional().describe("When the message was sent"),
  isStreaming: z.boolean().optional().describe("Whether the message is currently being streamed (typewriter effect)"),
  status: z.enum(["sending", "sent", "error"]).optional().describe("Message delivery status"),
  actions: z.array(z.object({
    label: z.string().describe("Button label"),
    onClick: z.function().optional().describe("Click handler function"),
  })).optional().describe("Action buttons below the message"),
  className: z.string().optional().describe("Additional CSS classes"),
})

export type ChatMessage = z.infer<typeof chatMessageSchema>

