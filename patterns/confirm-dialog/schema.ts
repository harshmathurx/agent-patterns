import { z } from "zod"

export const confirmDialogSchema = z.object({
  title: z.string().describe("Dialog title"),
  description: z.string().describe("Dialog description/message"),
  confirmLabel: z.string().default("Confirm").describe("Confirm button label"),
  cancelLabel: z.string().default("Cancel").describe("Cancel button label"),
  variant: z.enum(["default", "destructive", "warning"]).default("default").describe("Dialog visual style"),
  icon: z.any().optional().describe("Icon component to display"),
  open: z.boolean().default(false).describe("Whether the dialog is open"),
  onConfirm: z.function().optional().describe("Callback function when confirmed"),
  onCancel: z.function().optional().describe("Callback function when cancelled"),
  className: z.string().optional().describe("Additional CSS classes"),
})

export type ConfirmDialog = z.infer<typeof confirmDialogSchema>

