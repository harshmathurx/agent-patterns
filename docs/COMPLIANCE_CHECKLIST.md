# Compliance Checklist Template

Use this checklist to audit each pattern against the three standards: **rams.ai**, **ui-skills.com**, and **Vercel Design Guidelines**.

---

## Pattern: `[Pattern Name]`

**Date Audited**: _______________  
**Auditor**: _______________  
**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete

---

## 1. rams.ai Compliance (Accessibility)

### ARIA & Semantic HTML
- [ ] All interactive elements have `aria-label` or `aria-labelledby`
- [ ] Form inputs have associated `<label>` elements with `htmlFor`
- [ ] Required fields have `aria-required="true"`
- [ ] Error states use `aria-invalid` and `aria-describedby`
- [ ] Dynamic content uses `aria-live` regions
- [ ] Loading states use `aria-busy="true"`
- [ ] Decorative elements have `aria-hidden="true"`
- [ ] Containers have appropriate `role` attributes
- [ ] Lists use semantic HTML (`<ul>`, `<ol>`, `<dl>`) or `role="list"`
- [ ] Tables have `caption` or `aria-label`
- [ ] Table headers have `scope` attributes

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Focus order is logical (Tab order)
- [ ] Focus states are visible (outline/ring)
- [ ] Keyboard shortcuts work (Enter, Space, Arrow keys)
- [ ] No keyboard traps
- [ ] Skip links available if needed

### Screen Reader Support
- [ ] All content is announced correctly
- [ ] Status changes are announced (`aria-live`)
- [ ] Form validation feedback is announced
- [ ] Error messages are announced
- [ ] Loading states are announced
- [ ] Empty states are announced

### Color & Contrast
- [ ] Text meets WCAG AA contrast (4.5:1)
- [ ] Large text meets WCAG AA contrast (3:1)
- [ ] Color is not the only means of conveying information
- [ ] Focus indicators have sufficient contrast
- [ ] Uses theme color variables (not hardcoded)

### Animation & Motion
- [ ] Respects `prefers-reduced-motion` media query
- [ ] Animations don't cause seizures (no flashing)
- [ ] Animation duration is reasonable (< 5s)

---

## 2. ui-skills.com Compliance (Agentic UI)

### Schema-Driven
- [ ] Component has Zod schema in `schema.ts`
- [ ] Schema has `.describe()` for all fields
- [ ] Schema is exported and usable by LLMs
- [ ] Type is inferred from schema (`z.infer`)

### LLM-Generatable
- [ ] Props are clearly defined and typed
- [ ] No complex prop structures
- [ ] Props are describable in JSON Schema
- [ ] Component can be generated from schema alone

### Primitives & Composition
- [ ] Uses standard HTML elements where possible
- [ ] Avoids complex custom components
- [ ] Prefers composition over configuration
- [ ] Clear separation of concerns

### State Management
- [ ] Minimal or no internal state
- [ ] State is documented if present
- [ ] No complex state machines
- [ ] State is predictable and deterministic

### Dependencies
- [ ] Minimal external dependencies
- [ ] Dependencies are well-documented
- [ ] No heavy libraries

---

## 3. Vercel Design Guidelines Compliance

### Design System
- [ ] Uses CSS variables for theming (`var(--foreground)`)
- [ ] No hardcoded colors
- [ ] Follows design tokens
- [ ] Consistent spacing (uses Tailwind/spacing scale)
- [ ] Consistent typography (uses text scale)

### Dark/Light Mode
- [ ] Supports dark mode via CSS variables
- [ ] Supports light mode via CSS variables
- [ ] No hardcoded color values
- [ ] Transitions smoothly between modes

### Responsive Design
- [ ] Mobile-first approach
- [ ] Flexible layouts (grid/flex)
- [ ] Touch-friendly (min 44x44px touch targets)
- [ ] Proper viewport handling
- [ ] Works on all screen sizes

### Performance
- [ ] Minimal bundle size
- [ ] Efficient rendering (no unnecessary re-renders)
- [ ] Lazy loading where appropriate
- [ ] Optimized for Core Web Vitals
- [ ] Memoization used where needed

### Code Quality
- [ ] TypeScript strict mode
- [ ] No `any` types
- [ ] Proper error handling
- [ ] Clean, readable code
- [ ] Follows React best practices

---

## Pattern-Specific Checks

### Metric Card
- [ ] Metric value is announced
- [ ] Trend indicator is accessible
- [ ] Icon is properly labeled or hidden

### Data Table
- [ ] Table has caption or label
- [ ] Headers have scope
- [ ] Sortable columns have `aria-sort`
- [ ] Empty state is announced

### Chart
- [ ] Chart has text alternative (`aria-label`)
- [ ] Data is accessible to screen readers
- [ ] Legend is associated with chart
- [ ] Color is not the only indicator

### Agent Form
- [ ] All fields have labels
- [ ] Validation feedback is accessible
- [ ] Submit button has loading state
- [ ] Error states are announced

### Thinking Indicator
- [ ] Status is announced (`aria-live`)
- [ ] Animation respects reduced motion
- [ ] Message is accessible

### Insights List
- [ ] List has proper role
- [ ] Items are properly structured
- [ ] Type indicators are accessible
- [ ] Empty state is announced

### Detail Card
- [ ] Uses semantic HTML (`<dl>`, `<dt>`, `<dd>`)
- [ ] Title is associated with content
- [ ] Actions are keyboard accessible

---

## Testing Checklist

### Manual Testing
- [ ] Tested with keyboard only (Tab, Enter, Space, Arrows)
- [ ] Tested with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Tested in dark mode
- [ ] Tested in light mode
- [ ] Tested on mobile device
- [ ] Tested on tablet
- [ ] Tested on desktop

### Automated Testing
- [ ] Accessibility tests pass (axe-core, Lighthouse)
- [ ] TypeScript compiles without errors
- [ ] Linter passes
- [ ] Unit tests pass
- [ ] Visual regression tests pass (if applicable)

---

## Notes

**Issues Found:**
- 

**Fixes Applied:**
- 

**Remaining Issues:**
- 

---

## Sign-off

**Auditor**: _______________  
**Date**: _______________  
**Status**: ⬜ Not Compliant | 🟡 Partial | ✅ Fully Compliant

---

**Template Version**: 1.0  
**Last Updated**: January 2026

