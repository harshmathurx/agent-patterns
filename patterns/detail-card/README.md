# Detail Card

A card component for displaying detailed information in a structured key-value format.

## When to Use

Use the Detail Card pattern when you need to:
- Show detailed information about an entity
- Display user profiles or account details
- Present object properties in a structured way
- Create detail views in admin panels

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | No | Card title |
| `description` | `string` | No | Card description |
| `fields` | `DetailField[]` | Yes | Array of field definitions |
| `actions` | `ReactNode` | No | Action buttons or controls |
| `className` | `string` | No | Additional CSS classes |

## Field Definition

```typescript
interface DetailField {
  label: string        // Field label
  value: ReactNode     // Field value
  span?: 1 | 2         // Column span (1 or 2)
}
```

## Schema

```typescript
import { detailCardSchema } from "./schema"

const data = detailCardSchema.parse({
  title: "User Details",
  fields: [
    { label: "Name", value: "John Doe" },
    { label: "Email", value: "john@example.com" }
  ]
})
```

## Example

```tsx
import { DetailCard } from "./component"

<DetailCard
  title="User Profile"
  fields={[
    { label: "Name", value: "John Doe" },
    { label: "Email", value: "john@example.com", span: 2 }
  ]}
/>
```

## LLM Integration

```tsx
useRenderToolCall({
  toolName: "render_detail_card",
  argumentsSchema: detailCardSchema,
  render: (props) => <DetailCard {...props} />
})
```

## Accessibility

The Detail Card component includes full accessibility support:

- **Semantic HTML** - Uses proper `<dl>`, `<dt>`, `<dd>` structure for definition lists
- **ARIA associations** - Title and description are properly associated via `aria-labelledby` and `aria-describedby`
- **Region role** - Container has `role="region"` for screen reader navigation
- **Action grouping** - Actions are grouped with `role="group"` and proper labeling
- **Screen reader support** - All content is accessible and properly structured

## Standards Compliance

✅ **rams.ai** - Accessible structure with semantic HTML and ARIA attributes  
✅ **ui-skills.com** - Schema-driven, LLM-generatable component  
✅ **Vercel Guidelines** - Theme-compatible, responsive design


