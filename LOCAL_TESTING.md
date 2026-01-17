# Local Testing Guide

Step-by-step guide to test Agent Patterns locally.

## Prerequisites

- Node.js 18+ installed
- pnpm 8+ installed (`npm install -g pnpm`)

## Initial Setup

### 1. Install Dependencies

```bash
# From the root directory
pnpm install
```

This installs dependencies for all packages, patterns, and apps in the monorepo.

### 2. Build Core Packages

```bash
# Build the core package (needed by patterns)
cd packages/core
pnpm build
cd ../..
```

## Testing Individual Components

### Test Patterns

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test:coverage
```

### Type Check

```bash
# Check TypeScript across entire monorepo
pnpm typecheck
```

### Lint

```bash
# Lint all code
pnpm lint
```

## Running Apps Locally

### Playground App

The interactive playground to test all patterns:

```bash
cd apps/playground
pnpm dev
```

Then open http://localhost:3000

**What to test:**
- Navigate between different patterns
- Verify each pattern renders correctly
- Check code preview updates
- Test responsive design

### Docs Site

The documentation site:

```bash
cd apps/docs
pnpm dev
```

Then open http://localhost:3000

**What to test:**
- All pages load correctly
- Links work
- Code examples are readable

### Example: Sales Dashboard

```bash
cd apps/examples/sales-dashboard
pnpm dev
```

Then open http://localhost:3000

**What to test:**
- All metrics display correctly
- Charts render properly
- Data table shows data
- Insights list displays

### Example: Customer Support

```bash
cd apps/examples/customer-support
pnpm dev
```

Then open http://localhost:3000

**What to test:**
- Form submission works
- Thinking indicator shows during processing
- Ticket table displays
- Detail card shows information

## Testing the CLI Tool

### Build CLI First

```bash
cd packages/cli
pnpm build
cd ../..
```

### Test CLI Commands

Create a test directory to avoid affecting your main project:

```bash
# Create a test directory
mkdir /tmp/agent-patterns-test
cd /tmp/agent-patterns-test

# Initialize (this should create app/patterns/ and theme.config.ts)
node /Users/harsh.rajmathur/Desktop/agent-patterns/packages/cli/dist/index.js init

# Add a pattern
node /Users/harsh.rajmathur/Desktop/agent-patterns/packages/cli/dist/index.js add metric-card

# Verify files were copied
ls -la app/patterns/metric-card/

# Update patterns
node /Users/harsh.rajmathur/Desktop/agent-patterns/packages/cli/dist/index.js update
```

**Note:** Once published, you'd use `npx agent-patterns` instead of the node command.

## Testing Individual Patterns

### Test a Pattern Component

Create a simple test file:

```bash
# Create test file
cat > test-pattern.tsx << 'EOF'
import { MetricCard } from "./patterns/metric-card/component"

export default function Test() {
  return (
    <MetricCard
      label="Test Revenue"
      value={1000}
      trend={{ value: 20, label: "vs last month", direction: "up" }}
    />
  )
}
EOF
```

### Test Pattern Schema

```bash
# Create schema test
node -e "
const { metricCardSchema } = require('./patterns/metric-card/schema.ts');
const result = metricCardSchema.safeParse({
  label: 'Revenue',
  value: 1000
});
console.log('Valid:', result.success);
"
```

## Quick Test Script

Create a test script to run everything:

```bash
# Create test-all.sh
cat > test-all.sh << 'EOF'
#!/bin/bash

echo "🔍 Type checking..."
pnpm typecheck || exit 1

echo "✅ Linting..."
pnpm lint || exit 1

echo "🧪 Running tests..."
pnpm test || exit 1

echo "🏗️  Building..."
pnpm build || exit 1

echo "✅ All checks passed!"
EOF

chmod +x test-all.sh
./test-all.sh
```

## Common Issues & Solutions

### Issue: "Cannot find module '@agent-patterns/core'"

**Solution:** Build the core package first:
```bash
cd packages/core && pnpm build && cd ../..
```

### Issue: "Module not found" in Next.js apps

**Solution:** Make sure you've run `pnpm install` from the root, and the app's `next.config.js` includes the package in `transpilePackages`.

### Issue: TypeScript errors in apps

**Solution:** 
1. Ensure all packages are built: `pnpm build`
2. Check that `tsconfig.json` extends `tsconfig.base.json`
3. Run `pnpm typecheck` to see all errors

### Issue: Tailwind styles not working

**Solution:** 
1. Check `tailwind.config.ts` includes pattern paths
2. Verify `globals.css` has Tailwind directives
3. Restart the dev server

## Testing Checklist

Before committing, verify:

- [ ] `pnpm typecheck` - 0 errors
- [ ] `pnpm lint` - 0 warnings
- [ ] `pnpm test` - All tests pass
- [ ] `pnpm build` - All packages build successfully
- [ ] Playground runs and all patterns display
- [ ] Docs site loads correctly
- [ ] Example apps run without errors
- [ ] CLI tool works (init, add, update)

## Development Workflow

1. **Make changes** to a pattern or package
2. **Build** if needed: `cd packages/core && pnpm build`
3. **Test** the change: `pnpm test`
4. **Run** the app: `cd apps/playground && pnpm dev`
5. **Verify** in browser
6. **Type check**: `pnpm typecheck`
7. **Commit** when all checks pass

## Hot Reload

All Next.js apps support hot reload:
- Make changes to components
- Save the file
- Browser automatically refreshes

For package changes:
- Rebuild the package: `cd packages/core && pnpm build`
- Restart the app if needed


