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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Agent Patterns</h1>
              <p className="mt-2 text-muted-foreground">
                Copy-paste patterns for LLM-generated UIs • Optimized for CopilotKit & AI agents
              </p>
            </div>
            <Link
              href="/playground"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Open Playground
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Why Agent Patterns?</h2>
          <div className="mb-6 rounded-lg border-2 border-primary bg-primary/5 p-6">
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Built for LLM-Generated UIs
            </h3>
            <p className="text-sm text-muted-foreground">
              Unlike shadcn/ui which is for general components, Agent Patterns is specifically
              optimized for AI agents generating UI dynamically. Every pattern includes Zod schemas
              with LLM-friendly descriptions, making it easy for agents to generate correct code.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-xl font-semibold text-foreground">Quick Start</h3>
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
              <h3 className="mb-2 font-semibold text-foreground">🤖 LLM-Optimized</h3>
              <p className="text-sm text-muted-foreground">
                Zod schemas with detailed descriptions make it easy for AI agents to generate
                correct code. This is our key differentiator from shadcn.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">📋 Copy-Paste Model</h3>
              <p className="text-sm text-muted-foreground">
                No npm packages. Just copy the files you need directly into your project, just like
                shadcn/ui.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">🎨 Theme-Compatible</h3>
              <p className="text-sm text-muted-foreground">
                Works with all 20+ shadcn themes using CSS variables. Use your existing theme setup.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">🔌 Agent Integration</h3>
              <p className="text-sm text-muted-foreground">
                Built-in CopilotKit examples show exactly how to add patterns to your AI agent.
                Ready to use out of the box.
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
                className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary hover:bg-muted"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">{pattern.name}</h3>
                    <p className="text-sm text-muted-foreground">{pattern.description}</p>
                  </div>
                  <span className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Agent Integration</h2>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-xl font-semibold text-foreground">With CopilotKit</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Each pattern includes a ready-to-use CopilotKit integration. Your agent can call
              render functions and dynamically generate UI components.
            </p>
            <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
              <code>{`import { useRenderToolCall } from "@copilotkit/react-core"
import { MetricCard } from "@/patterns/metric-card/component"
import { metricCardSchema } from "@/patterns/metric-card/schema"

useRenderToolCall({
  toolName: "render_metric_card",
  argumentsSchema: metricCardSchema,
  render: (props) => <MetricCard {...props} />
})

// Your agent can now call "render_metric_card" and 
// generate MetricCard components dynamically!`}</code>
            </pre>
            <div className="mt-4 rounded-md bg-blue-50 dark:bg-blue-950 p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                💡 <strong>Tip:</strong> See the{" "}
                <Link href="/playground" className="underline hover:no-underline">
                  Playground
                </Link>{" "}
                to try patterns live and see integration examples for each pattern.
              </p>
            </div>
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

