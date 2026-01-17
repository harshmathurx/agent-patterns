# Chart

A flexible chart component for visualizing data with multiple chart types.

## When to Use

Use the Chart pattern when you need to:
- Visualize numerical data
- Display trends over time
- Show data distributions
- Create dashboard visualizations

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | No | Chart title |
| `data` | `ChartDataPoint[]` | Yes | Array of data points |
| `type` | `"bar" \| "line" \| "pie"` | No | Chart type (default: "bar") |
| `showLegend` | `boolean` | No | Show legend (default: true) |
| `className` | `string` | No | Additional CSS classes |

## Schema

```typescript
import { chartSchema } from "./schema"

const data = chartSchema.parse({
  title: "Sales",
  type: "bar",
  data: [
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 1900 }
  ]
})
```

## Example

```tsx
import { Chart } from "./component"

<Chart
  title="Monthly Sales"
  type="bar"
  data={[
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 1900 }
  ]}
/>
```

## LLM Integration

```tsx
useRenderToolCall({
  toolName: "render_chart",
  argumentsSchema: chartSchema,
  render: (props) => <Chart {...props} />
})
```

## Accessibility

The Chart component includes comprehensive accessibility support:

- **Text alternatives** - Chart has `role="img"` with descriptive `aria-label`
- **Data table** - Hidden data table provides full data access to screen readers
- **ARIA descriptions** - Chart is linked to data table via `aria-describedby`
- **Legend association** - Legend is properly structured with `role="list"`
- **SVG accessibility** - SVG elements include proper labels and descriptions
- **Color independence** - Data is accessible without relying on color alone

## Standards Compliance

✅ **rams.ai** - Full accessibility with text alternatives and data tables  
✅ **ui-skills.com** - Schema-driven, LLM-generatable component  
✅ **Vercel Guidelines** - Theme-compatible, responsive design


