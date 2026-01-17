# Thinking Indicator

An animated loading indicator component for showing agent processing states.

## When to Use

Use the Thinking Indicator pattern when you need to:
- Show that an AI agent is processing
- Indicate background work is happening
- Provide visual feedback during async operations
- Display loading states in agent interfaces

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `string` | No | Message text (default: "Thinking...") |
| `variant` | `"dots" \| "pulse" \| "spinner"` | No | Animation type (default: "dots") |
| `className` | `string` | No | Additional CSS classes |

## Variants

- `dots` - Animated dots (default)
- `pulse` - Pulsing circle
- `spinner` - Rotating spinner

## Schema

```typescript
import { thinkingIndicatorSchema } from "./schema"

const data = thinkingIndicatorSchema.parse({
  message: "Processing...",
  variant: "dots"
})
```

## Example

```tsx
import { ThinkingIndicator } from "./component"

<ThinkingIndicator message="Analyzing data..." variant="pulse" />
```

## LLM Integration

```tsx
useRenderToolCall({
  toolName: "render_thinking_indicator",
  argumentsSchema: thinkingIndicatorSchema,
  render: (props) => <ThinkingIndicator {...props} />
})
```


