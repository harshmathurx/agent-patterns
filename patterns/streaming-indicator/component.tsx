import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface StreamingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  variant?: "dots" | "pulse" | "spinner" | "typing" | "progress"
  steps?: {
    label: string
    status: "pending" | "active" | "completed"
  }[]
  tokenCount?: number
  showTokenCounter?: boolean
}

export const StreamingIndicator = React.forwardRef<HTMLDivElement, StreamingIndicatorProps>(
  (
    {
      message,
      variant = "dots",
      steps,
      tokenCount,
      showTokenCounter = false,
      className,
      ...props
    },
    ref
  ) => {
    const renderIndicator = () => {
      switch (variant) {
        case "dots":
          return (
            <div className="flex gap-1" role="status" aria-busy="true" aria-live="polite">
              <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
            </div>
          )

        case "pulse":
          return (
            <div className="flex items-center gap-2" role="status" aria-busy="true" aria-live="polite">
              <div className="h-4 w-4 animate-pulse rounded-full bg-primary" />
              <div className="h-3 w-3 animate-pulse rounded-full bg-primary [animation-delay:-0.2s]" />
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:-0.4s]" />
            </div>
          )

        case "spinner":
          return (
            <div
              className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )

        case "typing":
          return (
            <div className="flex items-center gap-2" role="status" aria-busy="true" aria-live="polite">
              <div className="flex gap-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">AI is typing...</span>
            </div>
          )

        case "progress":
          if (!steps || steps.length === 0) return null
          return (
            <div className="space-y-3" role="status" aria-busy="true" aria-live="polite">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {step.status === "completed" ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  ) : step.status === "active" ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      step.status === "completed"
                        ? "text-muted-foreground line-through"
                        : step.status === "active"
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          )

        default:
          return null
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3 rounded-lg border border-border bg-card p-4", className)}
        {...props}
      >
        <div className="flex items-center gap-3">
          {renderIndicator()}
          {message && variant !== "typing" && variant !== "progress" && (
            <span className="text-sm text-muted-foreground">{message}</span>
          )}
        </div>

        {showTokenCounter && tokenCount !== undefined && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>{tokenCount.toLocaleString()} tokens</span>
          </div>
        )}
      </div>
    )
  }
)

StreamingIndicator.displayName = "StreamingIndicator"
