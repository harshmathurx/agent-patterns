import Link from "next/link"

const patterns = [
  { name: "Metric Card", slug: "metric-card", description: "Display KPIs with trend indicators" },
  { name: "Data Table", slug: "data-table", description: "Flexible table for structured data" },
  { name: "Chart", slug: "chart", description: "Bar, line, and pie chart visualizations" },
  { name: "Agent Form", slug: "agent-form", description: "Dynamic form generation" },
  { name: "Thinking Indicator", slug: "thinking-indicator", description: "Loading states for AI processing" },
  { name: "Insights List", slug: "insights-list", description: "Display AI-generated insights" },
  { name: "Detail Card", slug: "detail-card", description: "Structured detail views" },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Agent Patterns</h1>
          <p className="mt-2 text-muted-foreground">
            Open-source, copy-paste pattern library for LLM-generated UIs
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Getting Started</h2>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-xl font-semibold text-foreground">Installation</h3>
            <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
              <code>{`# Initialize project
npx agent-patterns init

# Add a pattern
npx agent-patterns add metric-card

# Update patterns
npx agent-patterns update`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Core Principles</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">Copy-Paste Model</h3>
              <p className="text-sm text-muted-foreground">
                No npm packages. Just copy the files you need directly into your project.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">LLM-Optimized</h3>
              <p className="text-sm text-muted-foreground">
                Zod schemas with descriptions make it easy for LLMs to generate correct code.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">Theme-Compatible</h3>
              <p className="text-sm text-muted-foreground">
                Works with all 20+ shadcn themes using CSS variables.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">TypeScript Strict</h3>
              <p className="text-sm text-muted-foreground">
                No `any` types. Full type safety throughout.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Patterns</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {patterns.map((pattern) => (
              <Link
                key={pattern.slug}
                href={`/patterns/${pattern.slug}`}
                className="rounded-lg border border-border bg-card p-6 transition-colors hover:bg-muted"
              >
                <h3 className="mb-2 font-semibold text-foreground">{pattern.name}</h3>
                <p className="text-sm text-muted-foreground">{pattern.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Integration Guide</h2>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-xl font-semibold text-foreground">With CopilotKit</h3>
            <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
              <code>{`import { useRenderToolCall } from "@copilotkit/react-core"
import { MetricCard } from "./patterns/metric-card/component"
import { metricCardSchema } from "./patterns/metric-card/schema"

useRenderToolCall({
  toolName: "render_metric_card",
  argumentsSchema: metricCardSchema,
  render: (props) => <MetricCard {...props} />
})`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Best Practices</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">1. Use CSS Variables</h3>
              <p className="text-sm text-muted-foreground">
                Always use theme CSS variables (e.g., `bg-background`, `text-foreground`) instead of hardcoded colors.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">2. Validate with Zod</h3>
              <p className="text-sm text-muted-foreground">
                Use the provided Zod schemas to validate data before rendering components.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">3. Type Safety</h3>
              <p className="text-sm text-muted-foreground">
                Leverage TypeScript's type inference from Zod schemas for full type safety.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

