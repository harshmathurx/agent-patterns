import { z } from "zod"

export const commandPaletteSchema = z.object({
  isOpen: z.boolean().describe("Whether the command palette is open"),
  onClose: z.function().optional().describe("Callback when palette is closed"),
  placeholder: z.string().optional().describe("Search input placeholder text"),
  commands: z.array(z.object({
    id: z.string().describe("Unique command identifier"),
    label: z.string().describe("Command display name"),
    description: z.string().optional().describe("Command description"),
    icon: z.any().optional().describe("Command icon component"),
    keywords: z.array(z.string()).optional().describe("Keywords for search"),
    shortcut: z.string().optional().describe("Keyboard shortcut display (e.g., '⌘K')"),
    onSelect: z.function().optional().describe("Callback when command is selected"),
    group: z.string().optional().describe("Command group/category"),
  })).describe("List of available commands"),
  groups: z.array(z.object({
    id: z.string().describe("Group identifier"),
    label: z.string().describe("Group display name"),
  })).optional().describe("Command groups for organization"),
  recentCommands: z.array(z.string()).optional().describe("Recently used command IDs"),
  className: z.string().optional().describe("Additional CSS classes"),
})

export type CommandPalette = z.infer<typeof commandPaletteSchema>

