"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { CodeBlock } from "./ui/code-block"

interface AgentWorkflowProps {
  patternName: string
  toolName: string
  schemaCode: string
  exampleCode: string
}

export function AgentWorkflow({ patternName, toolName, schemaCode, exampleCode }: AgentWorkflowProps) {
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1)

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                Agent Integration Workflow
              </CardTitle>
              <CardDescription>
                See how your AI agent uses this pattern to generate UI dynamically
              </CardDescription>
            </div>
            <Badge variant="success">LLM-Optimized</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Step-by-step workflow */}
          <div className="space-y-4">
            {/* Step 1: Agent decides to render */}
            <div
              className={`rounded-lg border-2 p-4 transition-all ${
                step >= 1
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/50 opacity-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Agent Calls Tool</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your AI agent decides to render a {patternName} and calls the tool
                  </p>
                  {step >= 1 && (
                    <div className="mt-3 rounded-md bg-muted p-3 font-mono text-xs">
                      <span className="text-blue-600 dark:text-blue-400">agent</span>
                      <span className="text-foreground">.callTool(</span>
                      <span className="text-green-600 dark:text-green-400">"{toolName}"</span>
                      <span className="text-foreground">, </span>
                      <span className="text-purple-600 dark:text-purple-400">{"{ ...data }"}</span>
                      <span className="text-foreground">)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Schema validation */}
            <div
              className={`rounded-lg border-2 p-4 transition-all ${
                step >= 2
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/50 opacity-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Zod Schema Validates</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The LLM-optimized schema validates and types the data
                  </p>
                  {step >= 2 && (
                    <div className="mt-3">
                      <CodeBlock code={schemaCode} language="ts" showCopy={false} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: Component renders */}
            <div
              className={`rounded-lg border-2 p-4 transition-all ${
                step >= 3
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/50 opacity-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Component Renders</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    CopilotKit renders the component with validated props
                  </p>
                  {step >= 3 && (
                    <div className="mt-3">
                      <CodeBlock code={exampleCode} language="tsx" showCopy={false} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 4: UI appears */}
            <div
              className={`rounded-lg border-2 p-4 transition-all ${
                step >= 4
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/50 opacity-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">UI Appears</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The pattern renders in your app, styled with your theme
                  </p>
                  {step >= 4 && (
                    <div className="mt-3 rounded-md bg-muted p-4 text-center">
                      <div className="text-4xl">✨</div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Live preview appears here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4">
            <div className="text-sm text-muted-foreground">
              Step {step} of 4
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep((s) => (s > 1 ? (s - 1) as 1 | 2 | 3 | 4 : 1))}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent"
              >
                ← Previous
              </button>
              <button
                onClick={() => setStep((s) => (s < 4 ? (s + 1) as 1 | 2 | 3 | 4 : 4))}
                className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Next →
              </button>
              <button
                onClick={() => {
                  let current = 1
                  const interval = setInterval(() => {
                    setStep(current as 1 | 2 | 3 | 4)
                    current++
                    if (current > 4) {
                      clearInterval(interval)
                    }
                  }, 1500)
                }}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent"
              >
                ▶️ Play Animation
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

