import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface Column<T> {
  key: string
  header: string
  accessor?: (row: T) => React.ReactNode
  className?: string
}

export interface DataTableProps<T = Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
  caption?: string
  ariaLabel?: string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "No data available",
  caption,
  ariaLabel,
  className,
  ...props
}: DataTableProps<T>) {
  const tableId = React.useId()
  const captionId = `${tableId}-caption`
  const emptyMessageId = `${tableId}-empty`

  return (
    <div className={cn("rounded-lg border border-border bg-card", className)} {...props}>
      <div className="overflow-x-auto">
        <table
          className="w-full"
          aria-label={ariaLabel}
          aria-describedby={caption ? captionId : undefined}
        >
          {caption && (
            <caption id={captionId} className="sr-only">
              {caption}
            </caption>
          )}
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-sm font-medium text-foreground",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                  role="status"
                  aria-live="polite"
                  id={emptyMessageId}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-border transition-colors hover:bg-muted/50"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn("px-4 py-3 text-sm text-foreground", column.className)}
                    >
                      {column.accessor ? column.accessor(row) : (row[column.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


