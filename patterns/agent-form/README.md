# Agent Form

A dynamic form component that can be generated from schema definitions, optimized for LLM generation.

## When to Use

Use the Agent Form pattern when you need to:
- Create forms dynamically from data
- Generate forms via LLM instructions
- Build multi-step or conditional forms
- Collect user input in agent interfaces

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | No | Form title |
| `description` | `string` | No | Form description |
| `fields` | `FormField[]` | Yes | Array of field definitions |
| `onSubmit` | `function` | No | Submit callback |
| `submitLabel` | `string` | No | Submit button label |

## Field Types

- `text` - Text input
- `email` - Email input
- `number` - Number input
- `textarea` - Multi-line text
- `select` - Dropdown select
- `checkbox` - Checkbox input

## Schema

```typescript
import { agentFormSchema } from "./schema"

const data = agentFormSchema.parse({
  title: "Contact Form",
  fields: [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true
    }
  ]
})
```

## Example

```tsx
import { AgentForm } from "./component"

<AgentForm
  title="Contact Form"
  fields={[
    { name: "name", label: "Name", type: "text", required: true }
  ]}
  onSubmit={(data) => console.log(data)}
/>
```

## LLM Integration

```tsx
useRenderToolCall({
  toolName: "render_agent_form",
  argumentsSchema: agentFormSchema,
  render: (props) => <AgentForm {...props} />
})
```


