You are building **Agent Patterns** - an open-source, copy-paste pattern library for LLM-generated UIs.

## CORE PRINCIPLES

1. **Copy-paste model** (not npm packages)
2. **LLM-optimized** (Zod schemas with descriptions)
3. **Theme-compatible** (all 20+ shadcn themes)
4. **TypeScript strict** (no `any` types)
5. **Community-driven** (unlimited patterns)

## PROJECT STRUCTURE

```markdown
agent-patterns/ ├── packages/ │ ├── cli/ # CLI tool │ └── core/ # Theme utilities ├── patterns/ # 7 patterns │ ├── metric-card/ │ ├── data-table/ │ ├── chart/ │ ├── agent-form/ │ ├── thinking-indicator/ │ ├── insights-list/ │ └── detail-card/ ├── apps/ │ ├── playground/ # Next.js interactive editor │ ├── docs/ # Documentation site │ └── examples/ # Example projects ├── package.json # Root (workspaces) ├── pnpm-workspace.yaml ├── tsconfig.json └── tsconfig.base.json
```

## COMPONENT STANDARDS

### Each Pattern Has 4 Files

1. **component.tsx**
    - React component with forwardRef
    - Extends React.HTMLAttributes<HTMLDivElement>
    - Uses CSS variables for theming
    - Full TypeScript typing
2. **schema.ts**
    - Zod schema with .describe() for LLMs
    - Export inferred type
    - Validation examples
    - Optional fields marked
3. **example.tsx**
    - CopilotKit useRenderToolCall example
    - Shows real usage
    - Includes sample data
4. [**README.md**](http://readme.md/)
    - When to use section
    - Props table
    - Schema documentation
    - Example code
    - LLM integration

## CODE STANDARDS

### TypeScript

```tsx
// ✅ CORRECT
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: number
}

const Component = React.forwardRef<HTMLDivElement, Props>(
  ({ label, value, className, ...props }, ref) => (
    <div ref={ref} className={cn("...", className)} {...props}>
      {/* content */}
    </div>
  )
)

// ❌ WRONG
function Component(props: any) { ... }

```

### **Zod Schemas**

```tsx
// ✅ CORRECT
const schema = z.object({
  label: z.string().describe("Display label"),
  value: z.number().describe("Numeric value"),
})

// ❌ WRONG
const schema = z.object({
  label: z.string(),
  value: z.number(),
})

```

### **CSS & Theming**

```tsx
// ✅ Use CSS variables
className="bg-background text-foreground border-border"

// ❌ Don't hardcode colors
className="bg-white text-black border-gray-200"

```

## **CLI TOOL**

### **Commands**

```bash
# Initialize project
npx agent-patterns init
# Creates: app/patterns/, theme.config.ts

# Add pattern
npx agent-patterns add metric-card
# Copies: pattern files to app/patterns/

# Update patterns
npx agent-patterns update
# Updates: all patterns to latest

```

## **DEVELOPMENT WORKFLOW**

### **Per Day**

1. **Morning**: Read task, understand requirements
2. **Midday**: Claude generates code
3. **Afternoon**: Review, test, fix issues
4. **Evening**: Commit, push

### **Quality Gates**

- ✅ TypeScript: `tsc --noEmit --strict` (0 errors)
- ✅ Linting: `eslint .` (0 warnings)
- ✅ Testing: `vitest` (80%+ coverage)
- ✅ Build: `pnpm build` (success)

## **TESTING**

```tsx
describe("MetricCard", () => {
  it("renders with required props", () => {
    render(<MetricCard label="Revenue" value={1000} />)
    expect(screen.getByText("Revenue")).toBeInTheDocument()
  })

  it("validates schema", () => {
    const result = schema.safeParse({ label: "Revenue", value: 1000 })
    expect(result.success).toBe(true)
  })
})

```

## **SUCCESS CRITERIA**

### **Day 7**

- [ ]  Monorepo working
- [ ]  7 patterns complete
- [ ]  CLI tool functional
- [ ]  0 TypeScript errors
- [ ]  All tests pass

### **Day 14**

- [ ]  Playground live
- [ ]  Docs complete
- [ ]  Examples working
- [ ]  GitHub public
- [ ]  Ready for launch

## **REFERENCES**

- shadcn/ui: [https://ui.shadcn.com](https://ui.shadcn.com/)
- Zod: [https://zod.dev](https://zod.dev/)
- CopilotKit: [https://docs.copilotkit.ai](https://docs.copilotkit.ai/)
- React: [https://react.dev](https://react.dev/)