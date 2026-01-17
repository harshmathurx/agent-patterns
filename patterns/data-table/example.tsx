"use client"

import { useRenderToolCall } from "@copilotkit/react-core"
import { DataTable, type DataTableProps, type Column } from "./component"
import { dataTableSchema } from "./schema"

export function DataTableExample() {
  useRenderToolCall({
    toolName: "render_data_table",
    argumentsSchema: dataTableSchema,
    render: (props: DataTableProps) => {
      return <DataTable {...props} />
    },
  })

  return null
}

// Example usage with sample data:
export function DataTableSample() {
  const columns: Column<{ id: string; name: string; email: string; role: string }>[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ]

  const data = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ]

  return <DataTable columns={columns} data={data} />
}


