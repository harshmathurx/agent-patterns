# Standards Reference

**Agent Patterns** aligns with three key standards for agentic UI development:

1. **[rams.ai](https://rams.ai)** - Accessibility and design review standards
2. **[ui-skills.com](https://ui-skills.com)** - Agentic UI constraints and primitives
3. **[Vercel Design Guidelines](https://vercel.com/design/guidelines)** - Web interface standards

This document captures the key requirements from each standard to guide our implementation.

---

## 1. rams.ai Standards

### Core Principles
- **Accessibility First**: All components must be accessible to users with disabilities
- **Design Review**: Components should be reviewable and auditable
- **Semantic HTML**: Use proper HTML elements and ARIA attributes
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper labeling and announcements

### Key Requirements

#### Accessibility
- ✅ All interactive elements must have ARIA labels
- ✅ Focus states must be visible and clear
- ✅ Keyboard navigation must work for all features
- ✅ Screen reader announcements must be accurate
- ✅ Color contrast must meet WCAG AA standards (4.5:1 for text)

#### Design Review
- ✅ Components must be auditable via automated tools
- ✅ Code must be readable and maintainable
- ✅ Patterns must be consistent across implementations

---

## 2. ui-skills.com Standards

### Core Principles
- **Agentic UI Constraints**: Patterns must work within LLM generation constraints
- **Primitive-First**: Use simple, composable primitives
- **Schema-Driven**: Components must be describable via schemas
- **Deterministic**: Output must be predictable and consistent

### Key Requirements

#### Constraints
- ✅ Components must be generatable by LLMs
- ✅ Props must be describable in schemas (Zod/JSON Schema)
- ✅ No complex state management in components
- ✅ Clear prop interfaces
- ✅ Minimal dependencies

#### Primitives
- ✅ Use standard HTML elements where possible
- ✅ Avoid custom complex components
- ✅ Prefer composition over configuration
- ✅ Clear separation of concerns

---

## 3. Vercel Design Guidelines

### Core Principles
- **Modern Web Standards**: Follow current web best practices
- **Performance**: Fast, efficient components
- **Responsive**: Work across all device sizes
- **Accessible**: WCAG compliant
- **Consistent**: Follow design system patterns

### Key Requirements

#### Design System
- ✅ Use CSS variables for theming
- ✅ Consistent spacing and typography
- ✅ Follow design tokens
- ✅ Support dark/light modes

#### Performance
- ✅ Minimal bundle size
- ✅ Efficient rendering
- ✅ Lazy loading where appropriate
- ✅ Optimized for Core Web Vitals

#### Responsive Design
- ✅ Mobile-first approach
- ✅ Flexible layouts
- ✅ Touch-friendly interactions
- ✅ Proper viewport handling

---

## Compliance Checklist Template

For each pattern, verify:

### Accessibility (rams.ai)
- [ ] All interactive elements have ARIA labels
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Screen reader support
- [ ] Color contrast meets WCAG AA

### Agentic UI (ui-skills.com)
- [ ] Component is generatable by LLMs
- [ ] Props are schema-describable
- [ ] No complex state management
- [ ] Clear prop interfaces
- [ ] Uses primitives

### Design System (Vercel)
- [ ] Uses CSS variables
- [ ] Responsive design
- [ ] Performance optimized
- [ ] Dark/light mode support
- [ ] Follows design tokens

---

## Integration Notes

### How Standards Work Together

1. **rams.ai** ensures our components are accessible and auditable
2. **ui-skills.com** ensures our components work with LLM generation
3. **Vercel Guidelines** ensure our components follow modern web standards

### Implementation Strategy

1. **Start with ui-skills.com constraints** - Design for LLM generation
2. **Apply rams.ai accessibility** - Ensure accessibility compliance
3. **Follow Vercel Guidelines** - Polish with design system standards

---

## References

- [rams.ai](https://rams.ai) - Accessibility & design review
- [ui-skills.com](https://ui-skills.com) - Agentic UI guidelines
- [Vercel Design Guidelines](https://vercel.com/design/guidelines) - Web interface standards
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - Web Content Accessibility Guidelines

---

**Last Updated**: January 2026  
**Status**: Active Reference Document

