import { z } from "zod"

export const sidebarSchema = z.object({
  items: z.array(z.object({
    id: z.string().describe("Item identifier"),
    label: z.string().describe("Display label"),
    icon: z.any().optional().describe("Icon component"),
    href: z.string().optional().describe("Navigation link"),
    badge: z.string().optional().describe("Badge text (count, status, etc)"),
    children: z.array(z.any()).optional().describe("Nested sub-items"),
    active: z.boolean().optional().describe("Whether the item is active"),
  })).describe("Sidebar navigation items"),
  header: z.object({
    title: z.string().describe("Sidebar header title"),
    subtitle: z.string().optional().describe("Sidebar header subtitle"),
    logo: z.any().optional().describe("Logo component"),
  }).optional().describe("Sidebar header configuration"),
  footer: z.any().optional().describe("Footer content component"),
  collapsible: z.boolean().default(true).describe("Whether sidebar can be collapsed"),
  defaultCollapsed: z.boolean().default(false).describe("Initial collapsed state"),
  className: z.string().optional().describe("Additional CSS classes"),
})

export type Sidebar = z.infer<typeof sidebarSchema>

