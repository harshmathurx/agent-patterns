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
import { Navigation } from "@/components/navigation"
import { PatternSidebar } from "@/components/pattern-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { ToastProvider, useToast } from "@/components/ui/toast"

const patterns = [
  { id: "metric-card", name: "Metric Card", description: "Display KPIs with trend indicators" },
  { id: "data-table", name: "Data Table", description: "Flexible table for structured data" },
  { id: "chart", name: "Chart", description: "Bar, line, and pie chart visualizations" },
  { id: "agent-form", name: "Agent Form", description: "Dynamic form generation" },
  { id: "streaming-indicator", name: "Streaming Indicator", description: "Loading states for AI processing" },
  { id: "insights-list", name: "Insights List", description: "Display AI-generated insights" },
  { id: "detail-card", name: "Detail Card", description: "Structured detail views" },
]

function PlaygroundContent() {
  const searchParams = useSearchParams()
  const patternFromUrl = searchParams.get("pattern")
  const { showToast } = useToast()
  
  const [selectedPattern, setSelectedPattern] = useState(
    patternFromUrl && patterns.find((p) => p.id === patternFromUrl) ? patternFromUrl : "metric-card"
  )
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>("default")
  const [installMethod, setInstallMethod] = useState<"cli" | "manual">("cli")
  const [packageManager, setPackageManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm")
  const [searchQuery, _setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("preview")

  useEffect(() => {
    const pattern = searchParams.get("pattern")
    if (pattern && patterns.find((p) => p.id === pattern)) {
      setSelectedPattern(pattern)
    }
  }, [searchParams])

  useEffect(() => {
    const root = document.documentElement
    const theme = themes[selectedTheme]
    Object.entries(theme.css).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [selectedTheme])

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    showToast(`Copied ${type} to clipboard!`, "success")
  }

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
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <div className="flex flex-1 overflow-hidden">
        <PatternSidebar
          patterns={patterns}
          selectedPattern={selectedPattern}
          onPatternSelect={setSelectedPattern}
          searchQuery={searchQuery}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {patterns.find((p) => p.id === selectedPattern)?.name}
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    {patterns.find((p) => p.id === selectedPattern)?.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={selectedTheme}
                    onChange={(e) => {
                      const theme = themes[e.target.value as ThemeName]
                      setSelectedTheme(e.target.value as ThemeName)
                      Object.entries(theme.css).forEach(([key, value]) => {
                        document.documentElement.style.setProperty(key, value)
                      })
                    }}
                    className="w-40"
                  >
                    {Object.entries(themes).map(([key, theme]) => (
                      <option key={key} value={key}>
                        {theme.name}
                      </option>
                    ))}
                  </Select>
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

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="installation">Installation</TabsTrigger>
                <TabsTrigger value="code">Usage</TabsTrigger>
                <TabsTrigger value="integration">Integration</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>
                      See how this pattern looks with different themes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">{renderPattern()}</div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="installation" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Installation</CardTitle>
                    <CardDescription>Add this pattern to your project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs value={installMethod} onValueChange={(v) => setInstallMethod(v as "cli" | "manual")}>
                      <TabsList>
                        <TabsTrigger value="cli">CLI</TabsTrigger>
                        <TabsTrigger value="manual">Manual</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="cli" className="mt-4">
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
                              <Button
                                key={pm}
                                variant={packageManager === pm ? "default" : "outline"}
                                size="sm"
                                onClick={() => setPackageManager(pm)}
                              >
                                {pm}
                              </Button>
                            ))}
                          </div>
                          <CodeBlock
                            code={getInstallCommand()}
                            language="bash"
                            onCopy={() => handleCopy(getInstallCommand(), "command")}
                          />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="manual" className="mt-4">
                        <CodeBlock
                          code={`# Copy from:\npatterns/${selectedPattern}/\n\n# To:\napp/patterns/${selectedPattern}/\n\n# Files to copy:\n- component.tsx\n- schema.ts\n- example.tsx\n- README.md`}
                          language="bash"
                        />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Usage</CardTitle>
                    <CardDescription>How to use this pattern in your code</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={getCodePreview()}
                      language="tsx"
                      onCopy={() => handleCopy(getCodePreview(), "code")}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integration" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>CopilotKit Integration</CardTitle>
                    <CardDescription>
                      Add this pattern to your agent so it can render UI components dynamically
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={getCopilotKitExample()}
                      language="tsx"
                      onCopy={() => handleCopy(getCopilotKitExample(), "integration code")}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Schema</CardTitle>
                    <CardDescription>
                      Zod schema with LLM-optimized descriptions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={getSchemaPreview()} language="ts" />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function PlaygroundPage() {
  return (
    <ToastProvider>
      <PlaygroundContent />
    </ToastProvider>
  )
}


