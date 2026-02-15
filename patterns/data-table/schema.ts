import { z } from "zod"

export const columnSchema = z.object({
  key: z
    .string()
    .describe("Column identifier that matches a key in the data objects"),
  header: z
    .string()
    .describe("Display text shown in the column header"),
  accessor: z
    .function()
    .args(z.record(z.any()))
    .returns(z.any())
    .optional()
    .describe("Optional function to transform row data before display. Use for custom formatting or rendering."),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to this column's cells"),
  sortable: z
    .boolean()
    .optional()
    .default(true)
    .describe("Whether this column can be sorted. Defaults to true. Click column header to sort."),
})

export const dataTableSchema = z.object({
  columns: z
    .array(columnSchema)
    .describe(
      "Array of column definitions. Each column needs a 'key' (matches data object keys) and 'header' (display text). " +
      "Set sortable: true to enable sorting on that column."
    ),
  data: z
    .array(z.record(z.any()))
    .describe(
      "Array of data objects to display. Each object's keys should match the column 'key' values. " +
      "Example: [{id: 1, name: 'John', email: 'john@example.com'}, ...]"
    ),
  emptyMessage: z
    .string()
    .optional()
    .default("No data available")
    .describe("Message shown when the table has no data to display"),
  caption: z
    .string()
    .optional()
    .describe("Accessible caption for screen readers describing the table purpose"),
  ariaLabel: z
    .string()
    .optional()
    .describe("ARIA label for the table element for screen reader accessibility"),
  searchable: z
    .boolean()
    .optional()
    .default(false)
    .describe("Enable search/filter functionality. Shows a search input above the table that filters rows across all columns."),
  searchPlaceholder: z
    .string()
    .optional()
    .default("Search...")
    .describe("Placeholder text for the search input when searchable is true"),
  pagination: z
    .boolean()
    .optional()
    .default(false)
    .describe("Enable pagination. Shows page controls below the table."),
  pageSize: z
    .number()
    .optional()
    .default(10)
    .describe("Number of rows to display per page when pagination is enabled. Common values: 10, 25, 50, 100"),
  selectable: z
    .boolean()
    .optional()
    .default(false)
    .describe("Enable row selection with checkboxes. Adds a checkbox column with select-all functionality."),
  onSelectionChange: z
    .function()
    .args(z.array(z.record(z.any())))
    .returns(z.void())
    .optional()
    .describe("Callback function called when row selection changes. Receives array of selected row objects."),
  loading: z
    .boolean()
    .optional()
    .default(false)
    .describe("Show loading skeleton when data is being fetched. Displays animated placeholder rows."),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes to apply to the table container"),
})

export type Column<T> = z.infer<typeof columnSchema> & {
  accessor?: (row: T) => React.ReactNode
}

export type DataTableProps<T = Record<string, unknown>> = Omit<
  z.infer<typeof dataTableSchema>,
  "columns" | "data" | "onSelectionChange"
> & {
  columns: Column<T>[]
  data: T[]
  onSelectionChange?: (selectedRows: T[]) => void
}
