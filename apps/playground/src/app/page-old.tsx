"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { MetricCard } from "@agent-patterns/metric-card/component"
import { DataTable } from "@agent-patterns/data-table/component"
import { Chart } from "@agent-patterns/chart/component"
import { AgentForm } from "@agent-patterns/agent-form/component"
import { StreamingIndicator } from "@agent-patterns/streaming-indicator/component"
import { InsightsList } from "@agent-patterns/insights-list/component"
import { DetailCard } from "@agent-patterns/detail-card/component"
import type { Column } from "@agent-patterns/data-table/component"
import { themes, type ThemeName } from "./themes"
import { ThemeCustomizer } from "@/components/ThemeCustomizer"
// Simple icon components to avoid dependency
const Copy = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const Terminal = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const patterns = [
  { id: "metric-card", name: "Metric Card" },
  { id: "data-table", name: "Data Table" },
  { id: "chart", name: "Chart" },
  { id: "agent-form", name: "Agent Form" },
  { id: "streaming-indicator", name: "Streaming Indicator" },
  { id: "insights-list", name: "Insights List" },
  { id: "detail-card", name: "Detail Card" },
]

export default function PlaygroundPage() {
  const searchParams = useSearchParams()
  const patternFromUrl = searchParams.get("pattern")
  
  const [selectedPattern, setSelectedPattern] = useState(
    patternFromUrl && patterns.find((p) => p.id === patternFromUrl) ? patternFromUrl : "metric-card"
  )
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>("default")
  const [installMethod, setInstallMethod] = useState<"cli" | "manual">("cli")
  const [packageManager, setPackageManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "installation" | "integration">(
    "preview"
  )

  // Update selected pattern when URL changes
  useEffect(() => {
    const pattern = searchParams.get("pattern")
    if (pattern && patterns.find((p) => p.id === pattern)) {
      setSelectedPattern(pattern)
    }
  }, [searchParams])

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement
    const theme = themes[selectedTheme]
    Object.entries(theme.css).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [selectedTheme])

  const renderPattern = () => {
    switch (selectedPattern) {
      case "metric-card":
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              label="Total Revenue"
              value="$45,231"
              trend={{ value: 20.1, label: "vs last month", direction: "up" }}
            />
            <MetricCard
              label="Active Users"
              value={2350}
              trend={{ value: 12.5, label: "vs last month", direction: "up" }}
            />
            <MetricCard
              label="Conversion Rate"
              value="3.2%"
              trend={{ value: 5.4, label: "vs last month", direction: "down" }}
            />
          </div>
        )
      case "data-table": {
        const columns: Column<{ name: string; email: string; role: string }>[] = [
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "role", header: "Role" },
        ]
        const data = [
          { name: "John Doe", email: "john@example.com", role: "Admin" },
          { name: "Jane Smith", email: "jane@example.com", role: "User" },
          { name: "Bob Johnson", email: "bob@example.com", role: "User" },
        ]
        return <DataTable columns={columns} data={data} />
      }
      case "chart":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Chart
              title="Sales by Month"
              type="bar"
              data={[
                { label: "Jan", value: 1200 },
                { label: "Feb", value: 1900 },
                { label: "Mar", value: 3000 },
                { label: "Apr", value: 2780 },
              ]}
            />
            <Chart
              title="Revenue Distribution"
              type="pie"
              data={[
                { label: "Product A", value: 45 },
                { label: "Product B", value: 30 },
                { label: "Product C", value: 25 },
              ]}
            />
          </div>
        )
      case "agent-form":
        return (
          <AgentForm
            title="Contact Form"
            description="Please fill out the form below"
            fields={[
              {
                name: "name",
                label: "Name",
                type: "text",
                placeholder: "Enter your name",
                required: true,
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "Enter your email",
                required: true,
              },
              {
                name: "message",
                label: "Message",
                type: "textarea",
                placeholder: "Enter your message",
                required: true,
              },
            ]}
            onSubmit={(data) => {
              console.log("Form submitted:", data)
              alert("Form submitted! Check console.")
            }}
          />
        )
      case "streaming-indicator":
        return (
          <div className="space-y-4">
            <StreamingIndicator message="Processing your request..." variant="dots" />
            <StreamingIndicator message="Analyzing data..." variant="pulse" />
            <StreamingIndicator message="Loading..." variant="spinner" />
          </div>
        )
      case "insights-list":
        return (
          <InsightsList
            title="Key Insights"
            insights={[
              {
                id: "1",
                title: "Revenue Growth",
                description: "Revenue increased by 20% compared to last quarter",
                type: "success",
              },
              {
                id: "2",
                title: "User Engagement",
                description: "Active users decreased slightly this month",
                type: "warning",
              },
              {
                id: "3",
                title: "System Status",
                description: "All systems operating normally",
                type: "info",
              },
            ]}
          />
        )
      case "detail-card":
        return (
          <DetailCard
            title="User Details"
            description="Information about the selected user"
            fields={[
              { label: "Name", value: "John Doe" },
              { label: "Email", value: "john@example.com" },
              { label: "Role", value: "Admin" },
              { label: "Status", value: "Active" },
              {
                label: "Bio",
                value: "Software engineer with 5 years of experience",
                span: 2,
              },
            ]}
          />
        )
      default:
        return null
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getInstallCommand = (): string => {
    const patternName = selectedPattern
    if (installMethod === "cli") {
      const commands: Record<"pnpm" | "npm" | "yarn" | "bun", string> = {
        pnpm: `pnpm dlx agent-patterns@latest add ${patternName}`,
        npm: `npx agent-patterns@latest add ${patternName}`,
        yarn: `yarn dlx agent-patterns@latest add ${patternName}`,
        bun: `bunx agent-patterns@latest add ${patternName}`,
      }
      return commands[packageManager]
    }
    return `# Copy files from patterns/${patternName}/ to your app/patterns/${patternName}/`
  }

  const getCodePreview = () => {
    switch (selectedPattern) {
      case "metric-card":
        return `import { MetricCard } from "@/patterns/metric-card/component"

<MetricCard
  label="Total Revenue"
  value="$45,231"
  trend={{
    value: 20.1,
    label: "vs last month",
    direction: "up"
  }}
/>`
      case "data-table":
        return `import { DataTable } from "@/patterns/data-table/component"
import type { Column } from "@/patterns/data-table/component"

const columns: Column<{ name: string; email: string; role: string }>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" }
]

const data = [
  { name: "John Doe", email: "john@example.com", role: "Admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "User" }
]

<DataTable columns={columns} data={data} />`
      case "chart":
        return `import { Chart } from "@/patterns/chart/component"

<Chart
  title="Sales by Month"
  type="bar"
  data={[
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 1900 },
    { label: "Mar", value: 3000 }
  ]}
/>`
      case "agent-form":
        return `import { AgentForm } from "@/patterns/agent-form/component"

<AgentForm
  title="Contact Form"
  description="Please fill out the form below"
  fields={[
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      required: true
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Enter your message",
      required: true
    }
  ]}
  onSubmit={(data) => console.log(data)}
/>`
      case "streaming-indicator":
        return `import { StreamingIndicator } from "@/patterns/streaming-indicator/component"

<StreamingIndicator
  message="Processing your request..."
  variant="dots"
/>

// Variants: "dots" | "pulse" | "spinner"`
      case "insights-list":
        return `import { InsightsList } from "@/patterns/insights-list/component"

<InsightsList
  title="Key Insights"
  insights={[
    {
      id: "1",
      title: "Revenue Growth",
      description: "Revenue increased by 20%",
      type: "success"
    },
    {
      id: "2",
      title: "User Engagement",
      description: "Active users decreased",
      type: "warning"
    }
  ]}
/>

// Types: "info" | "warning" | "success" | "error"`
      case "detail-card":
        return `import { DetailCard } from "@/patterns/detail-card/component"

<DetailCard
  title="User Details"
  description="Information about the user"
  fields={[
    { label: "Name", value: "John Doe" },
    { label: "Email", value: "john@example.com" },
    { label: "Role", value: "Admin" },
    { label: "Bio", value: "Software engineer", span: 2 }
  ]}
/>`
      default:
        return "// Select a pattern to see code"
    }
  }

  const getCopilotKitExample = () => {
    const patternName = selectedPattern
    const componentName = patternName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")
    const schemaName = patternName.replace(/-/g, "") + "Schema"
    const toolName = "render_" + patternName.replace(/-/g, "_")

    return `import { useRenderToolCall } from "@copilotkit/react-core"
import { ${componentName} } from "@/patterns/${patternName}/component"
import { ${schemaName} } from "@/patterns/${patternName}/schema"

export function ${componentName}Integration() {
  useRenderToolCall({
    toolName: "${toolName}",
    argumentsSchema: ${schemaName},
    render: (props) => <${componentName} {...props} />
  })

  return null
}

// Your agent can now call "${toolName}" and render ${componentName} components dynamically!`
  }

  const getSchemaPreview = () => {
    // Schema previews for each pattern
    const schemas: Record<string, string> = {
      "metric-card": `import { z } from "zod"

export const metricCardSchema = z.object({
  label: z.string().describe("Display label for the metric"),
  value: z.union([z.string(), z.number()]).describe("The metric value to display"),
  trend: z.object({
    value: z.number().describe("Percentage change value"),
    label: z.string().describe("Trend description (e.g., 'vs last month')"),
    direction: z.enum(["up", "down", "neutral"])
      .describe("Trend direction: 'up' for positive, 'down' for negative"),
  }).optional().describe("Optional trend information"),
  icon: z.any().optional().describe("Optional React icon component"),
  className: z.string().optional().describe("Additional CSS classes"),
})`,
      "data-table": `import { z } from "zod"

export const dataTableSchema = z.object({
  columns: z.array(z.object({
    key: z.string().describe("Column key (matches data object keys)"),
    header: z.string().describe("Column header text"),
    sortable: z.boolean().optional().describe("Whether column is sortable"),
  })).describe("Array of column definitions"),
  data: z.array(z.record(z.any())).describe("Array of row data objects"),
  className: z.string().optional().describe("Additional CSS classes"),
})`,
      "chart": `import { z } from "zod"

export const chartSchema = z.object({
  title: z.string().optional().describe("Chart title"),
  data: z.array(z.object({
    label: z.string().describe("Data point label"),
    value: z.number().describe("Numeric value for the data point"),
    color: z.string().optional().describe("Optional color"),
  })).describe("Array of data points"),
  type: z.enum(["bar", "line", "pie"]).default("bar")
    .describe("Chart type: 'bar', 'line', or 'pie'"),
  showLegend: z.boolean().default(true)
    .describe("Whether to show the legend"),
  className: z.string().optional(),
})`,
      "agent-form": `import { z } from "zod"

export const agentFormSchema = z.object({
  title: z.string().optional().describe("Form title"),
  description: z.string().optional().describe("Form description"),
  fields: z.array(z.object({
    name: z.string().describe("Field name (used as key)"),
    label: z.string().describe("Display label"),
    type: z.enum(["text", "email", "number", "textarea", "select", "checkbox"])
      .describe("Input field type"),
    placeholder: z.string().optional(),
    required: z.boolean().optional(),
    options: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional().describe("Options for select fields"),
  })).describe("Array of form field definitions"),
  onSubmit: z.function().optional(),
  submitLabel: z.string().default("Submit"),
  className: z.string().optional(),
})`,
      "streaming-indicator": `import { z } from "zod"

export const streamingIndicatorSchema = z.object({
  message: z.string().describe("Status message to display"),
  variant: z.enum(["dots", "pulse", "spinner"]).default("dots")
    .describe("Animation variant: 'dots', 'pulse', or 'spinner'"),
  className: z.string().optional(),
})`,
      "insights-list": `import { z } from "zod"

export const insightsListSchema = z.object({
  title: z.string().optional().describe("List title"),
  insights: z.array(z.object({
    id: z.string().describe("Unique identifier"),
    title: z.string().describe("Insight title"),
    description: z.string().describe("Insight description"),
    type: z.enum(["info", "warning", "success", "error"])
      .describe("Insight type for styling"),
    icon: z.any().optional().describe("Optional icon component"),
  })).describe("Array of insights to display"),
  className: z.string().optional(),
})`,
      "detail-card": `import { z } from "zod"

export const detailCardSchema = z.object({
  title: z.string().describe("Card title"),
  description: z.string().optional().describe("Card description"),
  fields: z.array(z.object({
    label: z.string().describe("Field label"),
    value: z.union([z.string(), z.number()]).describe("Field value"),
    span: z.number().optional().describe("Column span (1-2)"),
  })).describe("Array of field definitions"),
  className: z.string().optional(),
})`,
    }
    return schemas[selectedPattern] || `// See patterns/${selectedPattern}/schema.ts for full schema`
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Agent Patterns</h1>
              <p className="text-base text-muted-foreground max-w-2xl">
                The implementation layer for agentic UI standards. Ready-to-use React components and LLM-optimized schemas that make standards actionable.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <a
                  href="https://rams.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  rams.ai
                </a>
                <a
                  href="https://ui-skills.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  ui-skills.com
                </a>
                <a
                  href="https://vercel.com/design/guidelines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  Vercel Guidelines
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="theme-select" className="text-sm font-medium text-foreground">
                Theme:
              </label>
              <select
                id="theme-select"
                value={selectedTheme}
                onChange={(e) => {
                  const theme = themes[e.target.value as ThemeName]
                  setSelectedTheme(e.target.value as ThemeName)
                  Object.entries(theme.css).forEach(([key, value]) => {
                    document.documentElement.style.setProperty(key, value)
                  })
                }}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {Object.entries(themes).map(([key, theme]) => (
                  <option key={key} value={key}>
                    {theme.name}
                  </option>
                ))}
              </select>
              <ThemeCustomizer
                selectedTheme={selectedTheme}
                onThemeChange={(theme) => {
                  setSelectedTheme(theme)
                  const themeData = themes[theme]
                  Object.entries(themeData.css).forEach(([key, value]) => {
                    document.documentElement.style.setProperty(key, value)
                  })
                }}
                onCustomThemeChange={(css) => {
                  Object.entries(css).forEach(([key, value]) => {
                    document.documentElement.style.setProperty(key, value)
                  })
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Standards Compliance Section */}
        <div className="mb-8 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">Standards Compliance</h2>
            <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-semibold text-green-700 dark:text-green-400">
              All Patterns Compliant
            </span>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Agent Patterns implements the "holy trinity" of agentic UI standards. While these resources define the principles, we provide the ready-to-use components that make them actionable.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <a
              href="https://rams.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg font-semibold text-foreground">rams.ai</span>
                <span className="text-green-600 dark:text-green-400">✓</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Accessibility & design review standards. All patterns include ARIA labels, keyboard navigation, and screen reader support.
              </p>
            </a>
            <a
              href="https://ui-skills.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg font-semibold text-foreground">ui-skills.com</span>
                <span className="text-green-600 dark:text-green-400">✓</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Agentic UI constraints and primitives. Every pattern includes LLM-optimized Zod schemas with descriptions.
              </p>
            </a>
            <a
              href="https://vercel.com/design/guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg font-semibold text-foreground">Vercel Guidelines</span>
                <span className="text-green-600 dark:text-green-400">✓</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Web interface standards. All patterns use CSS variables, support 20+ themes, and follow responsive design principles.
              </p>
            </a>
          </div>
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50/80 p-4 dark:border-blue-800 dark:bg-blue-950/80">
            <p className="text-sm text-blue-950 dark:text-blue-50">
              <strong className="font-semibold">Learn more:</strong> See{" "}
              <a
                href="/docs/standards-integration"
                className="underline hover:no-underline"
              >
                Standards Integration Guide
              </a>{" "}
              for detailed compliance information and integration examples.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="rounded-lg border border-border bg-card p-4">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Patterns</h2>
              <nav className="space-y-2">
                {patterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => {
                      setSelectedPattern(pattern.id)
                    }}
                    className={`group relative w-full rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                      selectedPattern === pattern.id
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pattern.name}</span>
                      {selectedPattern === pattern.id && (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <div className={`mt-1.5 flex flex-wrap items-center gap-1.5 ${
                      selectedPattern === pattern.id ? "opacity-90" : ""
                    }`}>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${
                        selectedPattern === pattern.id
                          ? "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground"
                          : "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400"
                      }`}>
                        <span>✓</span>
                        <span>Compliant</span>
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${
                        selectedPattern === pattern.id
                          ? "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground"
                          : "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
                      }`}>
                        LLM-Ready
                      </span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="space-y-6">
              {/* Tabs */}
              <div className="flex gap-2 border-b border-border">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === "preview"
                      ? "border-b-2 border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("installation")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === "installation"
                      ? "border-b-2 border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Installation
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === "code"
                      ? "border-b-2 border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Usage
                </button>
                <button
                  onClick={() => setActiveTab("integration")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === "integration"
                      ? "border-b-2 border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Agent Integration
                </button>
              </div>

              {/* Preview Tab */}
              {activeTab === "preview" && (
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="mb-4 text-xl font-semibold text-foreground">
                    {patterns.find((p) => p.id === selectedPattern)?.name}
                  </h2>
                  <div className="space-y-4">{renderPattern()}</div>
                </div>
              )}

              {/* Installation Tab */}
              {activeTab === "installation" && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <h2 className="mb-4 text-xl font-semibold text-foreground">Installation</h2>
                    
                    {/* Method Tabs */}
                    <div className="mb-4 flex gap-2 border-b border-border">
                      <button
                        onClick={() => setInstallMethod("cli")}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${
                          installMethod === "cli"
                            ? "border-b-2 border-primary text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Terminal className="mr-2 inline h-4 w-4" />
                        CLI
                      </button>
                      <button
                        onClick={() => setInstallMethod("manual")}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${
                          installMethod === "manual"
                            ? "border-b-2 border-primary text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Manual
                      </button>
                    </div>

                    {installMethod === "cli" ? (
                      <div className="space-y-4">
                        {/* Package Manager Selector */}
                        <div className="flex gap-2">
                          {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
                            <button
                              key={pm}
                              onClick={() => setPackageManager(pm)}
                              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                                packageManager === pm
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-background text-foreground hover:bg-muted"
                              }`}
                            >
                              {pm}
                            </button>
                          ))}
                        </div>

                        {/* Command */}
                        <div className="relative">
                          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
                            <code>{getInstallCommand()}</code>
                          </pre>
                      <button
                        onClick={() => {
                          const cmd = getInstallCommand()
                          if (cmd) copyToClipboard(cmd, "install")
                        }}
                        className="absolute right-2 top-2 rounded-md bg-background p-2 hover:bg-muted"
                      >
                        {copiedCode === "install" ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                        </div>

                        <div className="rounded-md border border-blue-200 bg-blue-50/80 dark:border-blue-800 dark:bg-blue-950/80 p-4 text-sm backdrop-blur-sm">
                          <p className="font-semibold text-blue-950 dark:text-blue-50">
                            First time? Run this first:
                          </p>
                          <pre className="mt-2 overflow-x-auto rounded-md border border-blue-200 bg-white dark:border-blue-800 dark:bg-gray-900 p-3 text-xs shadow-sm">
                            <code className="font-mono text-blue-950 dark:text-blue-50">
                              {packageManager === "pnpm"
                                ? "pnpm dlx agent-patterns@latest init"
                                : packageManager === "npm"
                                  ? "npx agent-patterns@latest init"
                                  : packageManager === "yarn"
                                    ? "yarn dlx agent-patterns@latest init"
                                    : "bunx agent-patterns@latest init"}
                            </code>
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Copy the pattern files directly into your project:
                        </p>
                        <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
                          <code>{`# Copy from:
patterns/${selectedPattern}/

# To:
app/patterns/${selectedPattern}/

# Files to copy:
- component.tsx
- schema.ts
- example.tsx
- README.md`}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Code Tab */}
              {activeTab === "code" && (
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="mb-4 text-xl font-semibold text-foreground">Usage</h2>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
                      <code>{getCodePreview()}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(getCodePreview(), "code")}
                      className="absolute right-2 top-2 rounded-md bg-background p-2 hover:bg-muted"
                    >
                      {copiedCode === "code" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Integration Tab */}
              {activeTab === "integration" && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <h2 className="mb-4 text-xl font-semibold text-foreground">
                      CopilotKit Integration
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Add this pattern to your agent so it can render UI components dynamically.
                    </p>
                    <div className="relative">
                      <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
                        <code>{getCopilotKitExample()}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(getCopilotKitExample(), "integration")}
                        className="absolute right-2 top-2 rounded-md bg-background p-2 hover:bg-muted"
                      >
                        {copiedCode === "integration" ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Schema</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      The Zod schema includes descriptions optimized for LLM understanding:
                    </p>
                    <div className="relative">
                      <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
                        <code>{getSchemaPreview()}</code>
                      </pre>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                      See <code className="rounded bg-muted px-1 py-0.5">patterns/{selectedPattern}/schema.ts</code> for the full schema
                    </p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

