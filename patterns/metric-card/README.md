# Metric Card

A card component for displaying key metrics with optional trend indicators.

## When to Use

Use the Metric Card pattern when you need to:
- Display key performance indicators (KPIs)
- Show numerical values with context
- Highlight trends or changes over time
- Present dashboard-style metrics

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Display label for the metric |
| `value` | `string \| number` | Yes | The metric value to display |
| `trend` | `object` | No | Trend information with value, label, and direction |
| `icon` | `ReactNode` | No | Optional icon component |
| `className` | `string` | No | Additional CSS classes |

## Schema

The component uses a Zod schema optimized for LLM generation:

```typescript
import { metricCardSchema } from "./schema"

// Validates and infers type
const data = metricCardSchema.parse({
  label: "Revenue",
  value: 1000,
  trend: {
    value: 20.1,
    label: "vs last month",
    direction: "up"
  }
})
```

## Example

```tsx
import { MetricCard } from "./component"

<MetricCard
  label="Total Revenue"
  value="$45,231"
  trend={{
    value: 20.1,
    label: "vs last month",
    direction: "up"
  }}
/>
```

## LLM Integration

Use with CopilotKit's `useRenderToolCall`:

```tsx
import { useRenderToolCall } from "@copilotkit/react-core"
import { MetricCard } from "./component"
import { metricCardSchema } from "./schema"

useRenderToolCall({
  toolName: "render_metric_card",
  argumentsSchema: metricCardSchema,
  render: (props) => <MetricCard {...props} />
})
```

## Theming

The component uses CSS variables compatible with all shadcn themes:
- `bg-card` / `text-card-foreground`
- `border-border`
- `text-muted-foreground`
- `text-foreground`
- `text-emerald-600` / `text-destructive` for trend indicators (theme-aware)

## Accessibility

The Metric Card component includes full accessibility support:

- **ARIA labels** - Card has `role="region"` with descriptive `aria-label`
- **Semantic structure** - Proper heading and label associations
- **Screen reader support** - Trend information is fully described
- **Theme-aware colors** - Uses semantic colors that work across all themes
- **Decorative elements** - Icons are marked with `aria-hidden="true"`

## Standards Compliance

✅ **rams.ai** - Full ARIA support, keyboard accessible, screen reader compatible  
✅ **ui-skills.com** - Schema-driven, LLM-generatable component  
✅ **Vercel Guidelines** - Theme-compatible, responsive design


