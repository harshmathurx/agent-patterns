import { z } from "zod"

export const statsGridSchema = z.object({
  stats: z.array(z.object({
    id: z.string().describe("Stat identifier"),
    label: z.string().describe("Stat label"),
    value: z.union([z.string(), z.number()]).describe("Current value"),
    change: z.number().optional().describe("Percentage change (e.g., 12.5 for +12.5%)"),
    changeLabel: z.string().optional().describe("Change description (e.g., 'vs last month')"),
    icon: z.any().optional().describe("Icon component"),
    trend: z.enum(["up", "down", "neutral"]).optional().describe("Trend direction"),
    color: z.enum(["default", "success", "warning", "danger"]).optional().describe("Color theme"),
  })).describe("Statistics to display in the grid"),
  columns: z.number().min(1).max(6).default(3).describe("Number of columns in the grid"),
  showDividers: z.boolean().default(true).describe("Whether to show dividers between stats"),
  className: z.string().optional().describe("Additional CSS classes"),
})

export type StatsGrid = z.infer<typeof statsGridSchema>

