# Vercel Guidelines Integration Example

This example demonstrates how **Agent Patterns** comply with [Vercel Design Guidelines](https://vercel.com/design/guidelines) for modern web interfaces.

## What are Vercel Design Guidelines?

Vercel Design Guidelines define modern web interface standards, including:
- **Design System** - CSS variables, consistent spacing, typography, and design tokens
- **Performance** - Fast, efficient components optimized for Core Web Vitals
- **Responsive** - Mobile-first approach that works across all device sizes
- **Accessible** - WCAG compliant with keyboard navigation and screen reader support

## Features Demonstrated

### 1. Design System Compliance
- ✅ Uses CSS variables for theming
- ✅ Supports all 20+ shadcn themes
- ✅ Consistent spacing and typography
- ✅ Dark/light mode support
- ✅ Design tokens throughout

### 2. Performance
- ✅ Minimal bundle size
- ✅ Efficient rendering
- ✅ Optimized for Core Web Vitals
- ✅ Lazy loading where appropriate

### 3. Responsive Design
- ✅ Mobile-first approach
- ✅ Flexible layouts
- ✅ Touch-friendly interactions
- ✅ Proper viewport handling

## Running the Example

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Open http://localhost:3003
```

## How to Verify Compliance

### 1. Theme Compatibility

All components automatically adapt to your theme:

- Toggle dark/light mode using the button in the example
- Components use CSS variables, not hardcoded colors
- Works with all 20+ shadcn themes

### 2. Responsive Design

Test on different screen sizes:

- **Mobile** (320px - 768px)
- **Tablet** (768px - 1024px)
- **Desktop** (1024px+)

### 3. Performance

Check Core Web Vitals:

```bash
npx lighthouse http://localhost:3003 --view
```

### 4. Design Tokens

All components use consistent design tokens:

- **Spacing**: Consistent padding and margins
- **Typography**: Standard font sizes and weights
- **Colors**: Theme-aware color variables
- **Border radius**: Consistent rounded corners

## Compliance Status

All Agent Patterns are designed to comply with Vercel Guidelines:

- **MetricCard**: 95% compliance
- **DataTable**: 95% compliance
- **AgentForm**: 95% compliance
- **ThinkingIndicator**: 80% compliance
- **InsightsList**: 80% compliance
- **DetailCard**: 95% compliance

## Resources

- [Vercel Design Guidelines](https://vercel.com/design/guidelines) - Web interface standards
- [shadcn/ui](https://ui.shadcn.com) - Design system components
- [Core Web Vitals](https://web.dev/vitals/) - Performance metrics
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Web quality auditing tool

## Next Steps

1. Toggle dark/light mode to see theme compatibility
2. Resize the browser to test responsive design
3. Run Lighthouse to check performance
4. Review design tokens in component code

---

**Last Updated**: January 2026  
**Status**: Active Example

