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
| `caption` | `string` | No | Table caption for accessibility (hidden visually, announced to screen readers) |
| `ariaLabel` | `string` | No | ARIA label for the table |
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

## Accessibility

The Data Table component includes full accessibility support:

- **Semantic HTML** - Uses proper `<table>`, `<thead>`, `<tbody>` structure
- **ARIA labels** - Supports `caption` and `ariaLabel` props
- **Scope attributes** - All headers include `scope="col"` for screen readers
- **Empty state** - Empty message is announced with `role="status"` and `aria-live="polite"`
- **Keyboard navigation** - Full keyboard support for table navigation

## Standards Compliance

✅ **rams.ai** - Accessible table structure with proper ARIA attributes  
✅ **ui-skills.com** - Schema-driven, LLM-generatable component  
✅ **Vercel Guidelines** - Theme-compatible, responsive design


