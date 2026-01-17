# Insights List

A component for displaying a list of insights, recommendations, or key findings with type-based styling.

## When to Use

Use the Insights List pattern when you need to:
- Display AI-generated insights
- Show recommendations or findings
- Present key information in a structured list
- Highlight important observations

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | No | List title |
| `insights` | `Insight[]` | Yes | Array of insight objects |
| `emptyMessage` | `string` | No | Message when empty |
| `className` | `string` | No | Additional CSS classes |

## Insight Types

- `info` - Default informational style
- `warning` - Yellow/warning styling
- `success` - Green/success styling
- `error` - Red/error styling

## Schema

```typescript
import { insightsListSchema } from "./schema"

const data = insightsListSchema.parse({
  title: "Key Insights",
  insights: [
    {
      id: "1",
      title: "Revenue Growth",
      description: "Increased by 20%",
      type: "success"
    }
  ]
})
```

## Example

```tsx
import { InsightsList } from "./component"

<InsightsList
  title="Insights"
  insights={[
    {
      id: "1",
      title: "Finding",
      description: "Description",
      type: "info"
    }
  ]}
/>
```

## LLM Integration

```tsx
useRenderToolCall({
  toolName: "render_insights_list",
  argumentsSchema: insightsListSchema,
  render: (props) => <InsightsList {...props} />
})
```


