# Agent Patterns

![Agent Patterns Hero](https://via.placeholder.com/1200x400/1a1a1a/ffffff?text=Agent+Patterns+%7C+15+Copy-Paste+UI+Components+for+AI+Apps)

> Copy-paste UI patterns optimized for AI code generation.

Beautiful, production-ready React components designed for LLM code generation. Each pattern has a Zod schema that AI models understand. No dependencies, just copy and paste.

---

## 🚀 Quick Start

```bash
# 1. Copy a pattern into your project
npx agent-patterns@latest add metric-card

# 2. Use it in your code
import { MetricCard } from '@/patterns/metric-card/component'

<MetricCard 
  label="Revenue" 
  value="$45,231" 
  trend={{ value: 12.5, direction: "up", label: "vs last month" }}
/>
```

That's it. No npm install, no version conflicts, no build config.

---

## 📦 15 Production-Ready Patterns

| Pattern | Use Case | Preview |
|---------|----------|---------|
| **[MetricCard](patterns/metric-card)** | KPIs, dashboards, stats | Metrics with trends & sparklines |
| **[Chart](patterns/chart)** | Analytics, data visualization | Bar, line, area, pie, donut charts |
| **[DataTable](patterns/data-table)** | Lists, tables, data management | Sort, filter, paginate, select rows |
| **[AgentForm](patterns/agent-form)** | User input, settings | 11 field types + Zod validation |
| **[DetailCard](patterns/detail-card)** | User profiles, record details | Structured info with edit mode |
| **[InsightsList](patterns/insights-list)** | AI insights, notifications | Prioritized insights with actions |
| **[StreamingIndicator](patterns/streaming-indicator)** | Loading, AI processing | 5 variants + progress steps |
| **[ChatMessage](patterns/chat-message)** | Chat interfaces, AI assistants | Bubbles with streaming text |
| **[CommandPalette](patterns/command-palette)** | Quick actions, ⌘K menus | Fuzzy search command menu |
| **[KanbanBoard](patterns/kanban-board)** | Project management, pipelines | Drag-and-drop task boards |
| **[Timeline](patterns/timeline)** | Activity feeds, audit logs | Event/activity timelines |
| **[Sidebar](patterns/sidebar)** | App navigation, menus | Collapsible nav with nesting |
| **[StatsGrid](patterns/stats-grid)** | Dashboard headers, overview | Responsive grid of metrics |
| **[ConfirmDialog](patterns/confirm-dialog)** | Confirmations, warnings | Modal confirmations |
| **[CodeBlock](patterns/code-block)** | Documentation, code display | Syntax highlighting + copy |

→ **[View Live Demos](https://agent-patterns.vercel.app)** — Try all patterns, switch themes, copy code

---

## 🤖 Built for AI Code Generation

Every pattern has an LLM-optimized Zod schema:

```typescript
import { metricCardSchema } from '@/patterns/metric-card/schema'

// AI models understand this:
const props = metricCardSchema.parse({
  label: "Total Revenue",
  value: "$45,231",
  trend: { value: 12.5, direction: "up", label: "vs last month" }
})
```

**Use our prompts** to make any LLM generate components using these patterns:

- [`prompts/system-prompt.md`](prompts/system-prompt.md) — Add to your Cursor rules or Claude project
- [`prompts/build-dashboard.md`](prompts/build-dashboard.md) — Generate complete dashboards
- [`prompts/build-admin-panel.md`](prompts/build-admin-panel.md) — Generate admin interfaces
- [`prompts/build-chat-interface.md`](prompts/build-chat-interface.md) — Generate AI chat UIs
- [`prompts/pattern-index.md`](prompts/pattern-index.md) — Complete schema reference

---

## ✨ Why Agent Patterns?

### 1. **Zero Dependencies**
No npm install. No version conflicts. No build config. Just copy the component file and use it.

### 2. **LLM-First Design**
Zod schemas with detailed descriptions that AI models understand. Your LLM generates valid props automatically.

### 3. **Production Ready**
Not toy examples. Real components with:
- Loading states
- Error handling
- Accessibility
- Responsive design
- TypeScript strict mode

### 4. **Theme Compatible**
Works with all shadcn/ui themes. Change themes, components adapt instantly.

### 5. **Copy-Paste Model**
Own your code. Modify freely. No black-box libraries. No "ejecting."

---

## 🎨 Works With

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
</p>

<p align="left">
  <img src="https://img.shields.io/badge/Cursor-000000?style=for-the-badge&logo=cursor&logoColor=white" alt="Cursor" />
  <img src="https://img.shields.io/badge/Claude-000000?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude" />
  <img src="https://img.shields.io/badge/ChatGPT-74AA9C?style=for-the-badge&logo=openai&logoColor=white" alt="ChatGPT" />
  <img src="https://img.shields.io/badge/Vercel_v0-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="v0" />
  <img src="https://img.shields.io/badge/Vercel_AI_SDK-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel AI SDK" />
  <img src="https://img.shields.io/badge/CopilotKit-000000?style=for-the-badge&logo=github&logoColor=white" alt="CopilotKit" />
</p>

---

## 🏗️ Example: Build a Dashboard in 60 Seconds

```typescript
import { StatsGrid } from '@/patterns/stats-grid/component'
import { Chart } from '@/patterns/chart/component'
import { DataTable } from '@/patterns/data-table/component'

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* 4 Key Metrics */}
      <StatsGrid 
        stats={[
          { id: '1', label: 'Revenue', value: '$847K', change: 12, trend: 'up' },
          { id: '2', label: 'Users', value: '12.4K', change: 8, trend: 'up' },
          { id: '3', label: 'Conversion', value: '3.2%', change: -2, trend: 'down' },
          { id: '4', label: 'Avg Order', value: '$68', change: 5, trend: 'up' },
        ]}
        columns={4}
      />

      {/* Revenue Trend */}
      <Chart
        title="Monthly Revenue"
        type="bar"
        data={[
          { label: 'Jan', value: 125000 },
          { label: 'Feb', value: 132000 },
          { label: 'Mar', value: 148000 },
        ]}
      />

      {/* Transactions Table */}
      <DataTable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'customer', header: 'Customer' },
          { key: 'amount', header: 'Amount' },
          { key: 'status', header: 'Status' },
        ]}
        data={transactions}
        searchable
        pagination
        pageSize={10}
      />
    </div>
  )
}
```

---

## 📚 Documentation

- **[Pattern Index](prompts/pattern-index.md)** — Complete schema reference for all 15 patterns
- **[System Prompt](prompts/system-prompt.md)** — Use with Cursor, Claude, ChatGPT
- **[Build Guides](prompts/)** — Example prompts for common layouts
- **[Live Playground](https://agent-patterns.vercel.app)** — Interactive demos with theme switcher

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### What We Need

- New patterns (submit via PR with component + schema + example + prompt)
- Bug fixes (especially theme compatibility issues)
- Documentation improvements
- Example use cases and prompts

---

## 📄 License

MIT © Agent Patterns

---

## ⭐ Star This Repo

If you find Agent Patterns useful, give it a star! It helps others discover the project.

[![GitHub stars](https://img.shields.io/github/stars/harshmathurx/agent-patterns?style=social)](https://github.com/harshmathurx/agent-patterns)

---

**Built with ❤️ for the AI code generation era.**

[Website](https://agent-patterns.vercel.app) • [GitHub](https://github.com/harshmathurx/agent-patterns) • [Issues](https://github.com/harshmathurx/agent-patterns/issues)
