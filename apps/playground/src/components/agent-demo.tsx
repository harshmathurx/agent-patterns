"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface AgentDemoProps {
  patternName: string
  toolName: string
  onAgentCall: (data: unknown) => void
}

export function AgentDemo({ patternName, toolName, onAgentCall }: AgentDemoProps) {
  const [isThinking, setIsThinking] = React.useState(false)
  const [agentMessage, setAgentMessage] = React.useState("")
  const [showResponse, setShowResponse] = React.useState(false)

  const simulateAgent = async () => {
    setIsThinking(true)
    setAgentMessage("")
    setShowResponse(false)

    // Simulate agent thinking
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setAgentMessage("I need to display some metrics. Let me use the metric card pattern...")

    await new Promise((resolve) => setTimeout(resolve, 1500))
    setAgentMessage(`Calling ${toolName} with the data...`)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsThinking(false)
    setShowResponse(true)
    onAgentCall({ label: "Total Revenue", value: "$45,231", trend: { value: 20.1, label: "vs last month", direction: "up" } })
  }

  return (
    <Card className="border-2 border-green-500/20 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎭</span>
              Live Agent Simulation
            </CardTitle>
            <CardDescription>
              See how an AI agent would use this pattern in real-time
            </CardDescription>
          </div>
          <Badge variant="success">Interactive</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Agent chat interface */}
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-muted-foreground">AI Agent</span>
            </div>
            <div className="min-h-[60px] space-y-2">
              {isThinking && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                  </div>
                  <span>Agent is thinking...</span>
                </div>
              )}
              {agentMessage && (
                <p className="text-sm text-foreground">{agentMessage}</p>
              )}
              {showResponse && (
                <div className="rounded-md bg-green-50 p-3 dark:bg-green-950/50">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    ✓ Successfully rendered {patternName}
                  </p>
                  <p className="mt-1 text-xs text-green-700 dark:text-green-300">
                    Component appeared in the preview above
                  </p>
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={simulateAgent}
            disabled={isThinking}
            className="w-full"
            variant="default"
          >
            {isThinking ? "Agent Thinking..." : "🎬 Simulate Agent Call"}
          </Button>

          <div className="rounded-lg border border-amber-200 bg-amber-50/90 p-3 dark:border-amber-800 dark:bg-amber-950/90">
            <p className="text-xs text-amber-950 dark:text-amber-50">
              <strong className="font-semibold">💡 This is the key difference:</strong> In a real app, your agent would call this tool automatically based on user requests. This simulation shows you exactly what happens.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

