# THE PLAN: Agent Patterns → 10k Stars

## Current Reality Check

| What exists | What it actually is |
|---|---|
| 7 patterns | Styled HTML. No sort/filter/pagination on DataTable. Chart is raw SVG (no Recharts). Form has no validation. |
| Playground | Static demo viewer — works but looks like a Storybook knockoff, not a product |
| CLI | `cp -r` with chalk colors. No registry, no dependency resolution |
| Core package | Exports `cn()` and a theme type. That's it. |
| Docs site | Nearly empty shell |
| llm-docs/ | 6 strategy files with more words than the entire codebase has lines of code |

**The gap:** This is a prototype with a strategy deck. It needs to become a product with a pulse.

---

## Phase 0: Surgery (Cut the Dead Weight)
**Goal: Remove everything that makes this look unfinished**

1. **Delete `llm-docs/`** — Strategy docs in the repo scream "this is a side project planning to be something." Ship, don't plan.
2. **Delete `apps/docs/`** — Empty shell. A broken docs site is worse than no docs site. The playground IS the docs for now.
3. **Delete `apps/examples/`** — Empty. Remove it.
4. **Delete `compliance.json`** from each pattern — Nobody cares about self-assessed compliance badges. The code speaks.
5. **Gut the README** — Current README is 300 lines of "standards compliance" claims. Replace with: what it is, a screenshot, how to use it. 30 lines max.

---

## Phase 1: Make the Patterns Actually Good
**Goal: Someone copies a pattern and it actually works in production**

### 1.1 DataTable → Real Table
- Add **client-side sorting** (click column headers)
- Add **search/filter** input
- Add **pagination** (10/25/50 rows)
- Add **row selection** with checkboxes
- Add **loading state** (skeleton rows)
- Keep it zero-dependency (no tanstack-table). The whole point is copy-paste.

### 1.2 Chart → Use Recharts
- Replace raw SVG with **Recharts** (the standard in React dashboards)
- Support: `bar`, `line`, `area`, `pie`, `donut`
- Add **responsive container**
- Add **tooltip on hover**
- Keep the Zod schema simple — LLMs already know Recharts

### 1.3 AgentForm → Real Form
- Add **Zod validation** (the schema IS the validation — this is the killer feature)
- Add **error states** per field
- Add **loading/submitting state**
- Add field types: `date`, `password`, `radio`, `toggle`, `file`
- The pitch: "Your LLM generates the Zod schema → the form validates itself"

### 1.4 MetricCard → Polish
- Add **sparkline** mini-chart (tiny SVG, no dep)
- Add **loading skeleton** variant
- Add **comparison mode** (vs previous period)

### 1.5 ThinkingIndicator → Streaming Indicator
- Rename to `StreamingIndicator` (broader use case)
- Add **streaming text** variant (typewriter effect for LLM output)
- Add **progress** variant (steps: "Analyzing..." → "Generating..." → "Done")
- Add **token counter** display option

### 1.6 InsightsList → Keep, Polish
- Add **collapsible** details
- Add **action buttons** per insight
- Add **priority sorting**

### 1.7 DetailCard → Keep, Polish
- Add **edit mode** (inline editing)
- Add **copy value** button
- Add **status badges**

---

## Phase 2: The Landing Page (This Gets the Stars)
**Goal: Someone lands on the site, says "holy shit," and stars it**

The playground becomes the ONLY site. No separate docs. No separate examples.

### 2.1 Hero Section
- **Typewriter animation** showing "an LLM building a dashboard" — pre-baked text, zero tokens
  - Show a prompt appearing: *"Build me a revenue dashboard with..."*
  - Show components materializing one by one (MetricCard → Chart → DataTable)
  - This is pure CSS/JS animation. Costs nothing.
- **One-liner:** "Copy-paste UI patterns designed for LLM generation"
- **Two buttons:** `Browse Patterns` | `View on GitHub`

### 2.2 Pattern Gallery
- **Grid of all patterns** with live mini-previews (not screenshots — actual rendered components)
- Click → full interactive demo with:
  - **Props panel** (toggle props, see component update live)
  - **Code tab** (copy component)
  - **Schema tab** (copy Zod schema)
  - **Prompt tab** (copy the prompt that generates this pattern)

### 2.3 Theme Showcase
- **Theme strip** at the top — click through 8 themes and watch ALL patterns re-skin instantly
- This is the "screenshot moment." People will record this and share it.

### 2.4 "AI-Ready" Demo (Zero Tokens)
- Show a **split-screen mockup**: left side = chat prompt, right side = rendered UI
- The chat is a **pre-scripted typewriter** — not a real LLM
- Shows 3 pre-built scenarios:
  1. "Build a sales dashboard" → MetricCards + Chart + DataTable
  2. "Create a user management panel" → DataTable + DetailCard + AgentForm  
  3. "Show me analytics insights" → Chart + InsightsList + MetricCard
- **BYOK field** at the bottom: "Have an API key? Try it live" → optional, costs YOU nothing

---

## Phase 3: New Patterns (Critical Mass = 15+)
**Goal: Enough patterns that this feels like a real library, not a demo**

Add 8 new patterns (in priority order):

| # | Pattern | Why |
|---|---------|-----|
| 1 | **ChatMessage** | Every AI app needs this. Bubbles, streaming text, avatars. |
| 2 | **CommandPalette** | ⌘K menu. High-value, high-wow, everyone wants one. |
| 3 | **KanbanBoard** | Drag-and-drop columns. Visual, screenshot-worthy. |
| 4 | **Timeline** | Event/activity feeds. Common in dashboards. |
| 5 | **Sidebar** | Navigation pattern. Every app needs one. |
| 6 | **StatsGrid** | Multiple MetricCards in a responsive grid layout with header. |
| 7 | **ConfirmDialog** | AI action confirmation. "Are you sure you want to delete 47 rows?" |
| 8 | **CodeBlock** | Syntax-highlighted code display. For dev tool UIs. |

Each pattern ships with:
- `component.tsx` — the component
- `schema.ts` — Zod schema with LLM descriptions
- `example.tsx` — usage example
- `prompt.md` — the prompt that makes any LLM generate this pattern correctly

---

## Phase 4: The Prompt Library (The Real Differentiator)
**Goal: This is what no other component library has**

Create `/prompts` directory:

```
prompts/
├── system-prompt.md          # "You are a UI generator. Here are the available patterns..."
├── build-dashboard.md        # Full prompt → generates a complete dashboard
├── build-admin-panel.md      # Full prompt → generates admin panel
├── build-analytics-view.md   # Full prompt → generates analytics page
├── build-chat-interface.md   # Full prompt → generates chat UI
├── build-settings-page.md    # Full prompt → generates settings page
└── pattern-index.md          # All schemas in one file for LLM context
```

**Why this matters:**
- User copies `system-prompt.md` into their Cursor rules / Claude project
- Every time they ask for UI, the LLM generates components using YOUR patterns
- This is zero cost, infinite value, and creates lock-in through developer habit

---

## Phase 5: The README (The Billboard)
**Goal: 30 seconds to understand, 60 seconds to first use**

Structure:
1. **One screenshot** (the theme showcase grid — shows all patterns in one image)
2. **One sentence** — "Copy-paste UI patterns optimized for AI code generation."
3. **Quick start** — 3 lines of code
4. **Pattern table** — name, description, preview link
5. **"Works with" badges** — Next.js, shadcn, Tailwind, CopilotKit, Vercel AI SDK, Cursor, v0
6. **Link to site**

That's it. No standards compliance section. No philosophy. No strategy.

---

## Phase 6: Distribution (Get the Stars)
**Goal: Put this in front of the right 10,000 people**

1. **Twitter/X thread:** Record a 30-second video of the theme switcher + prompt-to-UI demo. Post with: "I built a pattern library designed for AI code generation. Every pattern has a Zod schema that LLMs understand. Copy-paste, zero dependencies."
2. **r/reactjs + r/webdev + r/nextjs** — Post with the video
3. **Hacker News** — "Show HN: Copy-paste UI patterns designed for LLM generation"
4. **Dev.to article** — "How I built a pattern library that LLMs can actually use"
5. **Discord** — Post in shadcn, Next.js, CopilotKit, Vercel servers
6. **GitHub** — Add topics: `react`, `nextjs`, `tailwindcss`, `shadcn`, `ai`, `llm`, `copilot`, `ui-patterns`, `zod`, `typescript`

---

## Execution Order

| Week | What | Outcome |
|------|------|---------|
| **1** | Phase 0 (surgery) + Phase 1 (fix 7 patterns) | Patterns are production-grade |
| **2** | Phase 2 (landing page + playground) | Site looks incredible |
| **3** | Phase 3 (8 new patterns) | 15 total patterns = critical mass |
| **3** | Phase 4 (prompt library) + Phase 5 (README) | The differentiator + the billboard |
| **4** | Phase 6 (distribution) | Ship it, post it, let it run |

---

## What This Does NOT Include (On Purpose)

- ❌ npm package (copy-paste model is the point)
- ❌ Live LLM demo (costs tokens you don't have)
- ❌ Separate docs site (playground IS the docs)
- ❌ Standards compliance badges (nobody cares)
- ❌ More strategy documents (ship code, not plans)

