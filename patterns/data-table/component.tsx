import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface Column<T> {
  key: string
  header: string
  accessor?: (row: T) => React.ReactNode
  className?: string
  sortable?: boolean
}

export interface DataTableProps<T = Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
  caption?: string
  ariaLabel?: string
  searchable?: boolean
  searchPlaceholder?: string
  pagination?: boolean
  pageSize?: number
  selectable?: boolean
  onSelectionChange?: (selectedRows: T[]) => void
  loading?: boolean
}

type SortDirection = "asc" | "desc" | null

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "No data available",
  caption,
  ariaLabel,
  searchable = false,
  searchPlaceholder = "Search...",
  pagination = false,
  pageSize = 10,
  selectable = false,
  onSelectionChange,
  loading = false,
  className,
  ...props
}: DataTableProps<T>) {
  const tableId = React.useId()
  const captionId = `${tableId}-caption`
  const emptyMessageId = `${tableId}-empty`

  // Search state
  const [searchQuery, setSearchQuery] = React.useState("")

  // Sort state
  const [sortColumn, setSortColumn] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1)

  // Selection state
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set())

  // Filter data by search
  const filteredData = React.useMemo(() => {
    if (!searchable || !searchQuery) return data

    return data.filter((row) => {
      return columns.some((column) => {
        const value = column.accessor 
          ? column.accessor(row) 
          : row[column.key]
        
        if (value === null || value === undefined) return false
        
        return String(value)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      })
    })
  }, [data, searchQuery, searchable, columns])

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData

    return [...filteredData].sort((a, b) => {
      const column = columns.find((col) => col.key === sortColumn)
      if (!column) return 0

      const aValue = column.accessor ? column.accessor(a) : a[sortColumn]
      const bValue = column.accessor ? column.accessor(b) : b[sortColumn]

      // Handle null/undefined
      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      // Compare
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredData, sortColumn, sortDirection, columns])

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sortedData.slice(startIndex, endIndex)
  }, [sortedData, currentPage, pageSize, pagination])

  const totalPages = pagination ? Math.ceil(sortedData.length / pageSize) : 1

  // Handle sort
  const handleSort = (columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey)
    if (!column?.sortable) return

    if (sortColumn === columnKey) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortColumn(null)
      }
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  // Handle selection
  const handleRowSelect = (index: number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedRows(newSelected)
    
    if (onSelectionChange) {
      const selected = sortedData.filter((_, i) => newSelected.has(i))
      onSelectionChange(selected)
    }
  }

  const handleSelectAll = () => {
    if (selectedRows.size === sortedData.length) {
      setSelectedRows(new Set())
      if (onSelectionChange) onSelectionChange([])
    } else {
      const allIndices = new Set(sortedData.map((_, i) => i))
      setSelectedRows(allIndices)
      if (onSelectionChange) onSelectionChange(sortedData)
    }
  }

  // Reset pagination when search/sort changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortColumn, sortDirection])

  // Loading skeleton rows
  const skeletonRows = Array.from({ length: pageSize }, (_, i) => i)

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {/* Search input */}
      {searchable && (
        <div className="flex items-center">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Search table"
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
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
                {selectable && (
                  <th scope="col" className="w-12 px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === sortedData.length && sortedData.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                      aria-label="Select all rows"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={cn(
                      "px-4 py-3 text-left text-sm font-medium text-foreground",
                      column.sortable && "cursor-pointer select-none hover:bg-muted",
                      column.className
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.header}</span>
                      {column.sortable && (
                        <span className="text-muted-foreground" aria-hidden="true">
                          {sortColumn === column.key ? (
                            sortDirection === "asc" ? "↑" : "↓"
                          ) : (
                            "↕"
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Loading skeleton
                skeletonRows.map((i) => (
                  <tr key={i} className="border-b border-border">
                    {selectable && (
                      <td className="px-4 py-3">
                        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-3">
                        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                    role="status"
                    aria-live="polite"
                    id={emptyMessageId}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => {
                  const actualIndex = pagination 
                    ? (currentPage - 1) * pageSize + rowIndex
                    : rowIndex
                  const isSelected = selectedRows.has(actualIndex)

                  return (
                    <tr
                      key={actualIndex}
                      className={cn(
                        "border-b border-border transition-colors hover:bg-muted/50",
                        isSelected && "bg-muted"
                      )}
                    >
                      {selectable && (
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleRowSelect(actualIndex)}
                            className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                            aria-label={`Select row ${actualIndex + 1}`}
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={cn("px-4 py-3 text-sm text-foreground", column.className)}
                        >
                          {column.accessor ? column.accessor(row) : (row[column.key] as React.ReactNode)}
                        </td>
                      ))}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && !loading && paginatedData.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Previous page"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
