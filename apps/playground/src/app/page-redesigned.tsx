"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { MetricCard } from "@agent-patterns/metric-card/component"
import { DataTable } from "@agent-patterns/data-table/component"
import { Chart } from "@agent-patterns/chart/component"
import { AgentForm } from "@agent-patterns/agent-form/component"
import { ThinkingIndicator } from "@agent-patterns/thinking-indicator/component"
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
import { Badge } from "@/components/ui/badge"
import { ToastProvider, useToast } from "@/components/ui/toast"

const patterns = [
  { id: "metric-card", name: "Metric Card", description: "Display KPIs with trend indicators" },
  { id: "data-table", name: "Data Table", description: "Flexible table for structured data" },
  { id: "chart", name: "Chart", description: "Bar, line, and pie chart visualizations" },
  { id: "agent-form", name: "Agent Form", description: "Dynamic form generation" },
  { id: "thinking-indicator", name: "Thinking Indicator", description: "Loading states for AI processing" },
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
  const [searchQuery, setSearchQuery] = useState("")
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

  // ... (keep all the renderPattern, getCodePreview, getCopilotKitExample, getSchemaPreview functions from original)

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
                    <div className="space-y-4">{/* renderPattern() */}</div>
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

