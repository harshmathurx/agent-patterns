## OVERVIEW

14 days to build Agent Patterns MVP.
Each day has specific tasks + deliverables.
Follow exactly. No shortcuts.

## WEEK 1: FOUNDATION

### DAY 1: Monorepo Setup

**Task**: Create complete monorepo structure

**What to do**:

1. Create root package.json with workspaces
2. Create pnpm-workspace.yaml
3. Create tsconfig.json + tsconfig.base.json
4. Create folder structure
5. Setup GitHub repo

**Deliverables**:

- [ ]  Monorepo compiles
- [ ]  All folders created
- [ ]  pnpm install works

**Prompt to Claude**:
Create the complete Agent Patterns monorepo structure. Use pnpm workspaces. Create:

- packages/cli/
- packages/core/
- patterns/ (empty folders for 7 patterns)
- apps/playground/
- apps/docs/
- apps/examples/ All tsconfig files, root package.json with workspaces.

### DAYS 2-6: Build 7 Patterns

**Each pattern needs**:

1. component.tsx (React component)
2. schema.ts (Zod schema)
3. example.tsx (CopilotKit example)
4. [README.md](http://readme.md/) (documentation)

**Pattern order**:

1. Day 2: MetricCard
2. Day 3: DataTable + Chart
3. Day 4: AgentForm + ThinkingIndicator
4. Day 5: InsightsList + DetailCard
5. Day 6: Testing + Polish

**Success**: 7 patterns, 0 TypeScript errors, all tests pass

### DAY 7: CLI Tool

**Commands needed**:

1. init - Setup app/patterns/
2. add [pattern] - Copy pattern files
3. update - Update patterns

**Success**: All 3 commands working, publishable

---

## WEEK 2: FEATURES & LAUNCH

### DAYS 8-10: Playground

**What to build**:

1. Next.js 14 app
2. Pattern display
3. Theme customizer
4. Code preview
5. Live demo

**Success**: Fully functional, deployable to Vercel

### DAYS 11-12: Docs + Examples

**Documentation**:

- Full API docs
- Integration guides
- Best practices

**Examples**:

- Sales dashboard
- Customer support

**Success**: Both projects runnable locally

### DAYS 13-14: Launch

**Day 13**:

- Final QA
- GitHub public
- Deploy to Vercel

**Day 14**:

- HackerNews post
- Discord announcement
- Twitter thread
- GitHub discussion

**Success**: Live, 100+ stars, featured

---

## EXECUTION COMMANDS

```bash
# Day 1
mkdir agent-patterns
cd agent-patterns
git init

# Daily
pnpm install
pnpm build
pnpm test
pnpm type-check

# Before commit
git add .
git commit -m "feat: [what you built]"
git push origin main
```

## **RISK MITIGATION**

**Behind schedule?** Build in priority order:

1. Core patterns (metric, table, chart, form)
2. CLI tool
3. Basic playground
4. Docs
5. Examples (do post-launch)

**TypeScript errors?** Use debug prompt from CURSOR_PROMPTS.md

**Testing failing?** Use test debugging prompt

---

## **SUCCESS CHECKPOINTS**

Each day check:

- [ ]  Code compiles
- [ ]  TypeScript: 0 errors
- [ ]  Tests: passing
- [ ]  Git: committed

Each week check:

- [ ]  Week 1: Foundation complete, 7 patterns working
- [ ]  Week 2: Features complete, ready to launch