"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { CodeBlock } from "./ui/code-block"

interface SchemaViewerProps {
  schemaCode: string
  patternName: string
}

export function SchemaViewer({ schemaCode, patternName }: SchemaViewerProps) {
  return (
    <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Zod Schema (LLM-Optimized)
            </CardTitle>
            <CardDescription>
              This schema is specifically designed for LLM understanding. The <code className="rounded bg-muted px-1 py-0.5 text-xs">.describe()</code> methods help agents generate correct code.
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-blue-500 text-blue-700 dark:text-blue-400">
            Key Differentiator
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CodeBlock code={schemaCode} language="ts" />
          
          <div className="rounded-lg border border-blue-200 bg-blue-50/90 p-4 dark:border-blue-800 dark:bg-blue-950/90">
            <h4 className="mb-2 font-semibold text-blue-950 dark:text-blue-50">
              Why This Matters for Agents
            </h4>
            <ul className="space-y-2 text-sm text-blue-950 dark:text-blue-50">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-700 dark:text-blue-300">✓</span>
                <span>
                  <strong className="text-blue-950 dark:text-blue-50">Descriptions guide LLMs:</strong> The <code className="rounded border border-blue-300 bg-white px-1.5 py-0.5 text-blue-950 dark:border-blue-700 dark:bg-gray-900 dark:text-blue-50">.describe()</code> methods provide context that helps agents understand what each field does
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">✓</span>
                <span>
                  <strong>Type safety:</strong> Zod validates the data before rendering, preventing errors
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">✓</span>
                <span>
                  <strong>Auto-completion:</strong> TypeScript infers types from the schema, giving agents better code suggestions
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-purple-200 bg-purple-50/90 p-4 dark:border-purple-800 dark:bg-purple-950/90">
            <h4 className="mb-2 font-semibold text-purple-950 dark:text-purple-50">
              vs. shadcn/ui
            </h4>
            <p className="text-sm text-purple-950 dark:text-purple-50">
              shadcn/ui components don't include LLM-optimized schemas. Agent Patterns includes Zod schemas with detailed descriptions specifically for AI agents to understand and use correctly.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

