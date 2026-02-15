import { z } from "zod"

export const timelineSchema = z.object({
  events: z.array(z.object({
    id: z.string().describe("Event identifier"),
    title: z.string().describe("Event title"),
    description: z.string().optional().describe("Event description"),
    timestamp: z.union([z.string(), z.date()]).describe("Event time"),
    icon: z.any().optional().describe("Event icon component"),
    status: z.enum(["completed", "in-progress", "pending", "cancelled"]).optional().describe("Event status"),
    user: z.string().optional().describe("User associated with the event"),
  })).describe("Timeline events to display"),
  orientation: z.enum(["vertical", "horizontal"]).default("vertical").describe("Timeline orientation"),
  showTime: z.boolean().default(true).describe("Whether to show timestamps"),
  className: z.string().optional().describe("Additional CSS classes"),
})

export type Timeline = z.infer<typeof timelineSchema>

