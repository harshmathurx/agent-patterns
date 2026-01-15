import Link from "next/link"
import { notFound } from "next/navigation"

const patterns = [
  {
    slug: "metric-card",
    name: "Metric Card",
    description: "Display KPIs with trend indicators",
    useCase: "Perfect for dashboards showing key metrics like revenue, users, or conversion rates",
  },
  {
    slug: "data-table",
    name: "Data Table",
    description: "Flexible table for structured data",
    useCase: "Display agent-generated results, user lists, or any tabular data",
  },
  {
    slug: "chart",
    name: "Chart",
    description: "Bar, line, and pie chart visualizations",
    useCase: "Visualize trends, distributions, or comparisons in agent outputs",
  },
  {
    slug: "agent-form",
    name: "Agent Form",
    description: "Dynamic form generation",
    useCase: "Let agents create forms dynamically based on user needs",
  },
  {
    slug: "thinking-indicator",
    name: "Thinking Indicator",
    description: "Loading states for AI processing",
    useCase: "Show users that the agent is processing or thinking",
  },
  {
    slug: "insights-list",
    name: "Insights List",
    description: "Display AI-generated insights",
    useCase: "Present bullet points, recommendations, or key findings from agents",
  },
  {
    slug: "detail-card",
    name: "Detail Card",
    description: "Structured detail views",
    useCase: "Show detailed information about entities, users, or transactions",
  },
]

export default function PatternPage({ params }: { params: { slug: string } }) {
  const pattern = patterns.find((p) => p.slug === params.slug)

  if (!pattern) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                ← Back to Patterns
              </Link>
              <h1 className="mt-2 text-3xl font-bold text-foreground">{pattern.name}</h1>
              <p className="mt-2 text-muted-foreground">{pattern.description}</p>
            </div>
            <Link
              href={`/playground?pattern=${pattern.slug}`}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Open in Playground
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">When to Use</h2>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-muted-foreground">{pattern.useCase}</p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">Installation</h2>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4 flex gap-2">
                  <button className="rounded-md border border-primary bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
                    CLI
                  </button>
                  <button className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
                    Manual
                  </button>
                </div>
                <div className="mb-4 flex gap-2">
                  <button className="rounded-md border border-primary bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
                    pnpm
                  </button>
                  <button className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
                    npm
                  </button>
                  <button className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
                    yarn
                  </button>
                  <button className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
                    bun
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
                  <code>pnpm dlx agent-patterns@latest add {pattern.slug}</code>
                </pre>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">Agent Integration</h2>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="mb-4 text-sm text-muted-foreground">
                  Add this pattern to your CopilotKit agent so it can render UI components dynamically.
                </p>
                <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
                  <code>{`import { useRenderToolCall } from "@copilotkit/react-core"
import { ${pattern.name.replace(/\s+/g, "")} } from "@/patterns/${pattern.slug}/component"
import { ${pattern.slug.replace(/-/g, "")}Schema } from "@/patterns/${pattern.slug}/schema"

useRenderToolCall({
  toolName: "render_${pattern.slug.replace(/-/g, "_")}",
  argumentsSchema: ${pattern.slug.replace(/-/g, "")}Schema,
  render: (props) => <${pattern.name.replace(/\s+/g, "")} {...props} />
})`}</code>
                </pre>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    href={`/playground?pattern=${pattern.slug}`}
                    className="block rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Try in Playground
                  </Link>
                  <a
                    href={`https://github.com/your-org/agent-patterns/tree/main/patterns/${pattern.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md border border-border px-4 py-2 text-center text-sm font-medium text-foreground hover:bg-muted"
                  >
                    View Source
                  </a>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Related Patterns</h3>
                <div className="space-y-2">
                  {patterns
                    .filter((p) => p.slug !== pattern.slug)
                    .slice(0, 3)
                    .map((p) => (
                      <Link
                        key={p.slug}
                        href={`/patterns/${p.slug}`}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        {p.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

