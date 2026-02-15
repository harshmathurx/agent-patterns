import { z } from "zod"

export const kanbanBoardSchema = z.object({
  columns: z.array(z.object({
    id: z.string().describe("Column identifier"),
    title: z.string().describe("Column title"),
    color: z.string().optional().describe("Column color accent"),
    limit: z.number().optional().describe("WIP limit for the column"),
  })).describe("Board columns"),
  cards: z.array(z.object({
    id: z.string().describe("Card identifier"),
    columnId: z.string().describe("Current column ID"),
    title: z.string().describe("Card title"),
    description: z.string().optional().describe("Card description"),
    labels: z.array(z.string()).optional().describe("Card labels/tags"),
    assignee: z.string().optional().describe("Assigned user name or avatar"),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional().describe("Card priority"),
  })).describe("Cards to display on the board"),
  onCardMove: z.function().optional().describe("Callback when card is moved between columns"),
  onCardClick: z.function().optional().describe("Callback when card is clicked"),
  className: z.string().optional().describe("Additional CSS classes"),
})

export type KanbanBoard = z.infer<typeof kanbanBoardSchema>

