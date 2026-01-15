"use client"

import * as React from "react"
import { cn } from "@agent-patterns/core"

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string
  language?: string
  showCopy?: boolean
  onCopy?: () => void
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ code, language = "tsx", showCopy = true, onCopy, className, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    }

    // Simple syntax highlighting (can be enhanced with a library like Prism or highlight.js)
    const highlightCode = (code: string, lang: string) => {
      // Basic keyword highlighting
      const keywords = [
        "import",
        "export",
        "from",
        "const",
        "let",
        "var",
        "function",
        "return",
        "if",
        "else",
        "for",
        "while",
        "class",
        "interface",
        "type",
        "extends",
        "React",
        "useState",
        "useEffect",
      ]

      let highlighted = code
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "g")
        highlighted = highlighted.replace(
          regex,
          `<span class="text-blue-600 dark:text-blue-400">${keyword}</span>`
        )
      })

      // String highlighting
      highlighted = highlighted.replace(
        /(["'`])(?:(?=(\\?))\2.)*?\1/g,
        '<span class="text-green-600 dark:text-green-400">$&</span>'
      )

      // Comment highlighting
      highlighted = highlighted.replace(
        /\/\/.*$/gm,
        '<span class="text-gray-500 dark:text-gray-400">$&</span>'
      )

      return highlighted
    }

    return (
      <div className="relative group">
        {showCopy && (
          <button
            onClick={handleCopy}
            className={cn(
              "absolute right-2 top-2 z-10 rounded-md border border-border bg-background/80 p-2 opacity-0 transition-opacity backdrop-blur-sm",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "group-hover:opacity-100"
            )}
            aria-label="Copy code"
          >
            {copied ? (
              <svg
                className="h-4 w-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        )}
        <pre
          ref={ref}
          className={cn(
            "relative overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm",
            "font-mono leading-relaxed",
            className
          )}
          {...props}
        >
          <code
            className="text-foreground"
            dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
          />
        </pre>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }

