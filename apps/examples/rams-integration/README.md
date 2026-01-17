# rams.ai Integration Example

This example demonstrates how **Agent Patterns** comply with [rams.ai](https://rams.ai) accessibility and design review standards.

## What is rams.ai?

rams.ai provides accessibility and design review standards for web interfaces, ensuring that components are:
- **Accessible** - Work with screen readers, keyboard navigation, and assistive technologies
- **Auditable** - Can be reviewed and validated using automated tools
- **Compliant** - Meet WCAG AA standards for color contrast and semantic HTML

## Features Demonstrated

### 1. Accessibility Compliance
- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation support
- ✅ Screen reader announcements
- ✅ WCAG AA color contrast compliance

### 2. Automated Auditing
- Run accessibility audits using tools like axe-core, Lighthouse, or WAVE
- View compliance scores for each pattern
- Identify and fix accessibility issues

### 3. Manual Testing
- Test with keyboard only
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify ARIA labels and announcements

## Running the Example

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Open http://localhost:3001
```

## How to Run rams.ai Audits

### Automated Testing

```bash
# Install axe-core CLI
npm install -g @axe-core/cli

# Run audit
axe http://localhost:3001

# Or use Lighthouse
npx lighthouse http://localhost:3001 --view
```

### Manual Testing Checklist

- [ ] Test with keyboard only (Tab, Enter, Arrow keys)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify ARIA labels are announced correctly
- [ ] Check color contrast ratios (WCAG AA: 4.5:1)
- [ ] Verify focus states are visible
- [ ] Test form validation and error messages

## Compliance Status

All Agent Patterns are designed to comply with rams.ai standards:

- **MetricCard**: 95% compliance
- **DataTable**: 85% compliance
- **AgentForm**: 92% compliance
- **ThinkingIndicator**: 88% compliance
- **InsightsList**: 90% compliance
- **DetailCard**: 93% compliance

See `docs/COMPLIANCE_AUDIT.md` for detailed compliance reports.

## Resources

- [rams.ai](https://rams.ai) - Accessibility & design review standards
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - Web Content Accessibility Guidelines
- [axe-core](https://github.com/dequelabs/axe-core) - Accessibility testing engine
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Web quality auditing tool

## Next Steps

1. Run the accessibility audit using the button in the example
2. Review the compliance scores for each pattern
3. Test with keyboard and screen reader
4. Check `docs/COMPLIANCE_AUDIT.md` for detailed findings

---

**Last Updated**: January 2026  
**Status**: Active Example

