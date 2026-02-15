"use client"

import { useState } from "react"
import { cn } from "@agent-patterns/core"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  startLineNumber?: number
  copyable?: boolean
  collapsible?: boolean
  maxHeight?: string
  className?: string
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = true,
  highlightLines = [],
  startLineNumber = 1,
  copyable = true,
  collapsible = false,
  maxHeight,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const lines = code.split("\n")

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const languageColors = {
    typescript: "text-blue-400",
    javascript: "text-yellow-400",
    python: "text-green-400",
    rust: "text-orange-400",
    go: "text-cyan-400",
    java: "text-red-400",
    default: "text-purple-400",
  }

  const languageColor = (languageColors as any)[language] || languageColors.default

  return (
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden", className)}>
      {/* Header */}
      {(filename || copyable || collapsible) && (
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm font-medium text-foreground">{filename}</span>
            )}
            <span className={cn("text-xs", languageColor)}>{language}</span>
          </div>
          <div className="flex items-center gap-2">
            {collapsible && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {collapsed ? "Expand" : "Collapse"}
              </button>
            )}
            {copyable && (
              <button
                onClick={handleCopy}
                className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {copied ? (
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Code Content */}
      {!collapsed && (
        <div
          className="overflow-x-auto overflow-y-auto"
          style={{ maxHeight: maxHeight || "600px" }}
        >
          <pre className="p-4 text-sm">
            <code>
              {lines.map((line, index) => {
                const lineNumber = startLineNumber + index
                const isHighlighted = highlightLines.includes(lineNumber)
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      isHighlighted && "bg-blue-500/10 border-l-2 border-l-blue-500 -ml-4 pl-3.5"
                    )}
                  >
                    {showLineNumbers && (
                      <span className="mr-4 inline-block w-8 select-none text-right text-muted-foreground">
                        {lineNumber}
                      </span>
                    )}
                    <span className="flex-1 text-foreground">{line || " "}</span>
                  </div>
                )
              })}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
}

