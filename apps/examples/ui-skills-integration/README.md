# ui-skills.com Integration Example

This example demonstrates how **Agent Patterns** follow [ui-skills.com](https://ui-skills.com) constraints for LLM-generatable agentic UI components.

## What is ui-skills.com?

ui-skills.com defines agentic UI constraints and primitives for LLM-generated interfaces, ensuring that components are:
- **Schema-Driven** - Every component has a Zod schema with `.describe()` for LLM understanding
- **LLM-Generatable** - Props are clearly defined and can be generated from schema alone
- **Primitive-Based** - Uses simple, composable primitives, no complex abstractions
- **Deterministic** - Output is predictable and consistent

## Features Demonstrated

### 1. Schema-Driven Components
- ✅ All patterns have Zod schemas
- ✅ Schemas include `.describe()` for LLM understanding
- ✅ Types are inferred from schemas
- ✅ JSON Schema compatible

### 2. LLM-Generatable
- ✅ Props are clearly defined and typed
- ✅ No complex prop structures
- ✅ Components can be generated from schema alone
- ✅ Works seamlessly with CopilotKit

### 3. Constraint Validation
- ✅ Schema-driven validation
- ✅ Primitive-based architecture
- ✅ No complex state management
- ✅ Clear prop interfaces

## Running the Example

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Open http://localhost:3002
```

## How to Use with LLMs

### 1. Schema Export

All patterns export Zod schemas that can be used with LLM tools:

```tsx
import { metricCardSchema } from "@agent-patterns/metric-card/schema"
import { MetricCard } from "@agent-patterns/metric-card/component"

// Use with CopilotKit
useRenderToolCall({
  toolName: "render_metric_card",
  argumentsSchema: metricCardSchema,
  render: (props) => <MetricCard {...props} />
})
```

### 2. JSON Schema Conversion

Zod schemas can be converted to JSON Schema for LLM tool definitions:

```tsx
import { zodToJsonSchema } from "zod-to-json-schema"

const jsonSchema = zodToJsonSchema(metricCardSchema)
// Use jsonSchema in LLM tool definitions
```

### 3. Constraint Validation

All Agent Patterns follow ui-skills.com constraints:

- ✅ All props are describable in schemas
- ✅ No complex state management in components
- ✅ Clear prop interfaces
- ✅ Minimal dependencies
- ✅ Uses standard HTML primitives

## Compliance Status

All Agent Patterns are designed to comply with ui-skills.com constraints:

- **MetricCard**: 100% compliance
- **DataTable**: 90% compliance
- **AgentForm**: 90% compliance
- **ThinkingIndicator**: 100% compliance
- **InsightsList**: 100% compliance
- **DetailCard**: 100% compliance

## Resources

- [ui-skills.com](https://ui-skills.com) - Agentic UI guidelines
- [Zod](https://zod.dev) - TypeScript-first schema validation
- [CopilotKit](https://copilotkit.ai) - LLM integration framework
- [zod-to-json-schema](https://github.com/StefanTerdell/zod-to-json-schema) - Convert Zod to JSON Schema

## Next Steps

1. Run the constraint validation using the button in the example
2. Try the "Simulate LLM Generation" button to see schema validation
3. Review the schema files in each pattern directory
4. Integrate with CopilotKit or similar LLM frameworks

---

**Last Updated**: January 2026  
**Status**: Active Example

