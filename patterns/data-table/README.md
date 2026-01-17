# Data Table

A flexible table component for displaying structured data with customizable columns.

## When to Use

Use the Data Table pattern when you need to:
- Display tabular data
- Show lists of records with multiple attributes
- Present structured information in rows and columns
- Create admin panels or data dashboards

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `columns` | `Column[]` | Yes | Array of column definitions |
| `data` | `T[]` | Yes | Array of data objects (rows) |
| `emptyMessage` | `string` | No | Message when table is empty |
| `className` | `string` | No | Additional CSS classes |

## Column Definition

```typescript
interface Column<T> {
  key: string              // Unique identifier
  header: string          // Column header text
  accessor?: (row: T) => React.ReactNode  // Optional transform function
  className?: string       // Column-specific styles
}
```

## Schema

```typescript
import { dataTableSchema } from "./schema"

const data = dataTableSchema.parse({
  columns: [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" }
  ],
  data: [
    { name: "John", email: "john@example.com" }
  ]
})
```

## Example

```tsx
import { DataTable } from "./component"

const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" }
]

const data = [
  { name: "John Doe", email: "john@example.com" }
]

<DataTable columns={columns} data={data} />
```

## LLM Integration

```tsx
useRenderToolCall({
  toolName: "render_data_table",
  argumentsSchema: dataTableSchema,
  render: (props) => <DataTable {...props} />
})
```


