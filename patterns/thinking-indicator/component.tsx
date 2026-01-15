import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  variant?: "dots" | "pulse" | "spinner"
}

export const ThinkingIndicator = React.forwardRef<HTMLDivElement, ThinkingIndicatorProps>(
  ({ message = "Thinking...", variant = "dots", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3 rounded-lg border border-border bg-card p-4", className)}
        {...props}
      >
        {variant === "dots" && (
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 w-2 animate-pulse rounded-full bg-primary"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}
        {variant === "pulse" && (
          <div className="h-4 w-4 animate-pulse rounded-full bg-primary" />
        )}
        {variant === "spinner" && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        )}
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    )
  }
)

ThinkingIndicator.displayName = "ThinkingIndicator"

