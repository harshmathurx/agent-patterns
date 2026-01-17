# Standards Integration Guide

**How Agent Patterns integrates with rams.ai, ui-skills.com, and Vercel Design Guidelines**

---

## Overview

Agent Patterns serves as the **implementation layer** for agentic UI standards. This document explains how we integrate with each standard and what developers need to know.

---

## Integration with rams.ai

### What is rams.ai?
rams.ai provides accessibility and design review standards for web interfaces.

### How We Integrate

**1. Accessibility Compliance**
- All patterns include ARIA labels and roles
- Keyboard navigation is fully supported
- Screen reader announcements are implemented
- Color contrast meets WCAG AA standards

**2. Design Review**
- Components are auditable via automated tools
- Code follows consistent patterns
- Documentation includes compliance checklists

**3. Implementation Details**

```tsx
// Example: Metric Card with rams.ai compliance
<MetricCard
  label="Revenue"
  value={1000}
  // Automatically includes:
  // - role="region"
  // - aria-labelledby
  // - aria-label with full description
/>
```

**4. What Developers Need to Know**
- All patterns are accessible out of the box
- No additional accessibility work required
- Patterns pass automated accessibility audits
- See `docs/COMPLIANCE_AUDIT.md` for details

---

## Integration with ui-skills.com

### What is ui-skills.com?
ui-skills.com defines agentic UI constraints and primitives for LLM-generated interfaces.

### How We Integrate

**1. Schema-Driven Components**
- Every pattern has a Zod schema
- Schemas include `.describe()` for LLM understanding
- Types are inferred from schemas

**2. LLM-Generatable**
- Props are clearly defined and typed
- No complex prop structures
- Components can be generated from schema alone

**3. Implementation Details**

```tsx
// Example: Using schema with CopilotKit
import { metricCardSchema } from "@/patterns/metric-card/schema"
import { MetricCard } from "@/patterns/metric-card/component"

useRenderToolCall({
  toolName: "render_metric_card",
  argumentsSchema: metricCardSchema, // LLM uses this to generate correct props
  render: (props) => <MetricCard {...props} />
})
```

**4. What Developers Need to Know**
- Schemas are optimized for LLM understanding
- All props are describable in JSON Schema
- Components work seamlessly with CopilotKit
- See pattern READMEs for integration examples

---

## Integration with Vercel Design Guidelines

### What are Vercel Design Guidelines?
Vercel Design Guidelines define modern web interface standards, including design system patterns.

### How We Integrate

**1. Design System Compliance**
- Uses CSS variables for theming
- Supports all 20+ shadcn themes
- Consistent spacing and typography
- Dark/light mode support

**2. Performance**
- Minimal bundle size
- Efficient rendering
- Optimized for Core Web Vitals

**3. Responsive Design**
- Mobile-first approach
- Flexible layouts
- Touch-friendly interactions

**4. Implementation Details**

```tsx
// Example: Theme-compatible component
<MetricCard
  label="Revenue"
  value={1000}
  // Automatically uses:
  // - CSS variables (--foreground, --background, etc.)
  // - Responsive design
  // - Dark/light mode support
/>
```

**4. What Developers Need to Know**
- Works with your existing shadcn theme
- No theme configuration needed
- All patterns are responsive
- See `apps/playground` for theme examples

---

## How Standards Work Together

### The Integration Stack

```
┌─────────────────────────────────────┐
│   rams.ai (Accessibility)           │
│   - ARIA labels                     │
│   - Keyboard navigation              │
│   - Screen reader support            │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   ui-skills.com (Agentic UI)        │
│   - Zod schemas                     │
│   - LLM-optimized                   │
│   - Schema-driven                   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Vercel Guidelines (Design)        │
│   - CSS variables                  │
│   - Responsive design               │
│   - Performance                     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Agent Patterns (Implementation)   │
│   - Ready-to-use components         │
│   - Copy-paste model                │
│   - All standards integrated        │
└─────────────────────────────────────┘
```

### Implementation Order

1. **Start with ui-skills.com** - Design for LLM generation
2. **Apply rams.ai** - Ensure accessibility compliance
3. **Follow Vercel Guidelines** - Polish with design system standards

---

## Developer Workflow

### 1. Choose a Pattern
```bash
npx agent-patterns add metric-card
```

### 2. Use with CopilotKit
```tsx
import { useRenderToolCall } from "@copilotkit/react-core"
import { MetricCard } from "@/patterns/metric-card/component"
import { metricCardSchema } from "@/patterns/metric-card/schema"

useRenderToolCall({
  toolName: "render_metric_card",
  argumentsSchema: metricCardSchema,
  render: (props) => <MetricCard {...props} />
})
```

### 3. Customize (Optional)
```tsx
<MetricCard
  label="Revenue"
  value={1000}
  className="custom-class" // Still theme-compatible
/>
```

### 4. Verify Compliance
- Run accessibility audit (axe-core, Lighthouse)
- Check TypeScript types
- Test with screen reader
- Verify keyboard navigation

---

## Compliance Verification

### Automated Checks
```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Test
pnpm test
```

### Manual Checks
- Test with keyboard only
- Test with screen reader
- Test in dark/light mode
- Test on mobile device

### Compliance Reports
- See `docs/COMPLIANCE_AUDIT.md` for full audit
- See `docs/COMPLIANCE_CHECKLIST.md` for verification template

---

## Best Practices

### 1. Always Use Schemas
```tsx
// ✅ CORRECT
const result = metricCardSchema.safeParse(data)
if (result.success) {
  <MetricCard {...result.data} />
}

// ❌ WRONG
<MetricCard {...data} /> // No validation
```

### 2. Preserve Accessibility
```tsx
// ✅ CORRECT
<MetricCard label="Revenue" value={1000} />

// ❌ WRONG
<div>Revenue: 1000</div> // No accessibility
```

### 3. Use Theme Variables
```tsx
// ✅ CORRECT
className="bg-card text-foreground"

// ❌ WRONG
className="bg-white text-black"
```

---

## Resources

### Standards
- [rams.ai](https://rams.ai) - Accessibility & design review
- [ui-skills.com](https://ui-skills.com) - Agentic UI guidelines
- [Vercel Design Guidelines](https://vercel.com/design/guidelines) - Web interface standards

### Documentation
- `docs/STANDARDS_REFERENCE.md` - Detailed standards reference
- `docs/COMPLIANCE_AUDIT.md` - Full compliance audit
- `docs/COMPLIANCE_CHECKLIST.md` - Verification checklist

### Examples
- `apps/playground` - Interactive examples
- `apps/examples` - Full application examples
- Pattern READMEs - Integration guides

---

## Support

### Questions?
- Check pattern READMEs
- Review compliance audit
- See examples in playground

### Issues?
- Open GitHub issue
- Check compliance checklist
- Review standards reference

---

**Last Updated**: January 2026  
**Status**: Active Integration Guide

