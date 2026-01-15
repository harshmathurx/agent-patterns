"use client"

import * as React from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

interface PatternHeroProps {
  patternName: string
  description: string
  toolName: string
  onCopyIntegration: () => void
}

export function PatternHero({ patternName, description, toolName, onCopyIntegration }: PatternHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 p-8">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 -z-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl"></div>

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <Badge variant="default" className="bg-primary text-primary-foreground">
            Agent Pattern
          </Badge>
          <Badge variant="outline" className="border-blue-500 text-blue-700 dark:text-blue-400">
            LLM-Optimized
          </Badge>
          <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-400">
            CopilotKit Ready
          </Badge>
        </div>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          {patternName}
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={onCopyIntegration} size="lg" className="bg-primary text-primary-foreground">
            📋 Copy Integration Code
          </Button>
          <div className="rounded-lg border border-border bg-background/50 px-4 py-2 backdrop-blur-sm">
            <div className="text-xs text-muted-foreground">Tool Name</div>
            <div className="font-mono text-sm font-semibold text-foreground">{toolName}</div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50/90 p-4 dark:border-amber-800 dark:bg-amber-950/90">
          <p className="text-sm text-amber-950 dark:text-amber-50">
            <strong className="font-semibold">🎯 Not just a component:</strong> This is a complete pattern optimized for AI agents. 
            The Zod schema with descriptions helps your agent understand and use it correctly.
          </p>
        </div>
      </div>
    </div>
  )
}

