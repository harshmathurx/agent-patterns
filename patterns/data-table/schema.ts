import { z } from "zod"

export const dataTableSchema = z.object({
  columns: z
    .array(
      z.object({
        key: z.string().describe("Unique identifier for the column"),
        header: z.string().describe("Display header text for the column"),
        accessor: z
          .function()
          .optional()
          .describe("Optional function to transform row data for this column"),
        className: z
          .string()
          .optional()
          .describe("Additional CSS classes for the column"),
      })
    )
    .describe("Array of column definitions"),
  data: z
    .array(z.record(z.unknown()))
    .describe("Array of data objects, each representing a table row"),
  emptyMessage: z
    .string()
    .optional()
    .describe("Message to display when table has no data"),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the table container"),
})

export type DataTableData = z.infer<typeof dataTableSchema>

