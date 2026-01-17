# Agent Patterns

An open-source, copy-paste pattern library for LLM-generated UIs.

**The implementation layer for agentic UI standards.** While [rams.ai](https://rams.ai), [ui-skills.com](https://ui-skills.com), and [Vercel Design Guidelines](https://vercel.com/design/guidelines) define the principles, Agent Patterns provides the ready-to-use React components and LLM-optimized schemas that make those standards actionable.

## Core Principles

1. **Copy-paste model** (not npm packages)
2. **LLM-optimized** (Zod schemas with descriptions)
3. **Theme-compatible** (all 20+ shadcn themes)
4. **TypeScript strict** (no `any` types)
5. **Community-driven** (unlimited patterns)

## Quick Start

```bash
# Install dependencies
pnpm install

# Run local testing script (recommended)
chmod +x scripts/test-local.sh
./scripts/test-local.sh

# Or manually:
# Build all packages
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## Local Testing

See [LOCAL_TESTING.md](./LOCAL_TESTING.md) for detailed testing instructions.

**Quick test commands:**
```bash
# Test playground
cd apps/playground && pnpm dev

# Test docs
cd apps/docs && pnpm dev

# Test examples
cd apps/examples/sales-dashboard && pnpm dev
cd apps/examples/customer-support && pnpm dev
```

## Project Structure

```
agent-patterns/
├── packages/
│   ├── cli/          # CLI tool
│   └── core/         # Theme utilities
├── patterns/         # 7 patterns
│   ├── metric-card/
│   ├── data-table/
│   ├── chart/
│   ├── agent-form/
│   ├── thinking-indicator/
│   ├── insights-list/
│   └── detail-card/
├── apps/
│   ├── playground/  # Next.js interactive editor
│   ├── docs/         # Documentation site
│   └── examples/     # Example projects
└── package.json
```

## Patterns

Each pattern includes:
- `component.tsx` - React component with forwardRef
- `schema.ts` - Zod schema with LLM descriptions
- `example.tsx` - CopilotKit integration example
- `README.md` - Complete documentation

### Available Patterns

1. **Metric Card** - Display KPIs with trend indicators
2. **Data Table** - Flexible table for structured data
3. **Chart** - Bar, line, and pie chart visualizations
4. **Agent Form** - Dynamic form generation
5. **Thinking Indicator** - Loading states for AI processing
6. **Insights List** - Display AI-generated insights
7. **Detail Card** - Structured detail views

## CLI Tool

```bash
# Initialize project
npx agent-patterns init

# Add pattern
npx agent-patterns add metric-card

# Update patterns
npx agent-patterns update
```

## Development

### Quality Gates

- ✅ TypeScript: `tsc --noEmit --strict` (0 errors)
- ✅ Linting: `eslint .` (0 warnings)
- ✅ Testing: `vitest` (80%+ coverage)
- ✅ Build: `pnpm build` (success)

## Standards Compliance

Agent Patterns implements and aligns with:

- ✅ [Vercel Design Guidelines](https://vercel.com/design/guidelines) - Web interface standards
- ✅ [ui-skills.com](https://ui-skills.com) - Agentic UI constraints and primitives
- ✅ [rams.ai](https://rams.ai) - Accessibility and design review standards

All patterns are designed to comply with these standards out of the box.

## References

- [shadcn/ui](https://ui.shadcn.com/)
- [Zod](https://zod.dev/)
- [CopilotKit](https://docs.copilotkit.ai/)
- [React](https://react.dev/)
- [rams.ai](https://rams.ai) - Accessibility & design review
- [ui-skills.com](https://ui-skills.com) - Agentic UI guidelines
- [Vercel Design Guidelines](https://vercel.com/design/guidelines) - Web interface standards

## License

MIT

