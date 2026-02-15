import { DataTable } from "./component"
import type { Column } from "./component"

// Sample data
interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  lastActive: string
}

const sampleData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active", lastActive: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "active", lastActive: "2024-01-14" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "inactive", lastActive: "2024-01-10" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", role: "Editor", status: "active", lastActive: "2024-01-15" },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "active", lastActive: "2024-01-13" },
  { id: 6, name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "active", lastActive: "2024-01-15" },
  { id: 7, name: "Ethan Hunt", email: "ethan@example.com", role: "User", status: "inactive", lastActive: "2024-01-08" },
  { id: 8, name: "Fiona Green", email: "fiona@example.com", role: "Editor", status: "active", lastActive: "2024-01-14" },
  { id: 9, name: "George Miller", email: "george@example.com", role: "User", status: "active", lastActive: "2024-01-12" },
  { id: 10, name: "Hannah Lee", email: "hannah@example.com", role: "User", status: "active", lastActive: "2024-01-15" },
  { id: 11, name: "Ian Malcolm", email: "ian@example.com", role: "Editor", status: "active", lastActive: "2024-01-11" },
  { id: 12, name: "Julia Roberts", email: "julia@example.com", role: "User", status: "inactive", lastActive: "2024-01-09" },
]

// Example 1: Basic table with sort and search
export function BasicDataTableExample() {
  const columns: Column<User>[] = [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "role", header: "Role", sortable: true },
  ]

  return (
    <DataTable
      columns={columns}
      data={sampleData}
      searchable
      caption="User directory"
    />
  )
}

// Example 2: Table with pagination
export function PaginatedDataTableExample() {
  const columns: Column<User>[] = [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "role", header: "Role", sortable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      accessor: (row) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            row.status === "active"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "lastActive", header: "Last Active", sortable: true },
  ]

  return (
    <DataTable
      columns={columns}
      data={sampleData}
      searchable
      pagination
      pageSize={5}
      caption="User directory with pagination"
    />
  )
}

// Example 3: Selectable table
export function SelectableDataTableExample() {
  const columns: Column<User>[] = [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "role", header: "Role", sortable: true },
  ]

  return (
    <DataTable
      columns={columns}
      data={sampleData}
      searchable
      pagination
      pageSize={5}
      selectable
      onSelectionChange={(selected) => {
        console.log("Selected rows:", selected)
      }}
      caption="Selectable user directory"
    />
  )
}

// Example 4: Loading state
export function LoadingDataTableExample() {
  const columns: Column<User>[] = [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "role", header: "Role", sortable: true },
  ]

  return (
    <DataTable
      columns={columns}
      data={[]}
      loading={true}
      pagination
      pageSize={5}
      caption="Loading user data"
    />
  )
}

// Example 5: Full-featured table
export function FullFeaturedDataTableExample() {
  const columns: Column<User>[] = [
    { key: "id", header: "ID", sortable: true },
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "role", header: "Role", sortable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      accessor: (row) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            row.status === "active"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "lastActive", header: "Last Active", sortable: true },
  ]

  return (
    <DataTable
      columns={columns}
      data={sampleData}
      searchable
      searchPlaceholder="Search users..."
      pagination
      pageSize={5}
      selectable
      onSelectionChange={(selected) => {
        console.log(`${selected.length} user(s) selected`)
      }}
      caption="Full-featured user directory"
      ariaLabel="User management table"
    />
  )
}

export default BasicDataTableExample
