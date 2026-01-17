# Contributing to Agent Patterns

Thank you for your interest in contributing to Agent Patterns! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/agent-patterns.git`
3. Install dependencies: `pnpm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development

### Running Locally

```bash
# Install dependencies
pnpm install

# Run playground
cd apps/playground && pnpm dev

# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## Adding a New Pattern

1. Create a new directory in `patterns/` with your pattern name
2. Add the required files:
   - `component.tsx` - React component
   - `schema.ts` - Zod schema with descriptions
   - `example.tsx` - CopilotKit integration example
   - `README.md` - Documentation
   - `package.json` - Package configuration
3. Follow the existing pattern structure
4. Add tests in `__tests__/component.test.tsx`
5. Update the playground to include your pattern

## Code Standards

- **TypeScript**: Strict mode, no `any` types
- **Components**: Use `forwardRef`, extend `React.HTMLAttributes`
- **Schemas**: All Zod schemas must have `.describe()` for LLMs
- **Theming**: Use CSS variables, no hardcoded colors
- **Testing**: Write tests for all new patterns

## Pull Request Process

1. Ensure all tests pass: `pnpm test`
2. Ensure TypeScript compiles: `pnpm typecheck`
3. Ensure linting passes: `pnpm lint`
4. Update documentation if needed
5. Create a pull request with a clear description

## Commit Messages

Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `test:` for tests
- `refactor:` for refactoring

Example: `feat: add notification pattern`

## Questions?

Open an issue or start a discussion on GitHub. We're happy to help!


