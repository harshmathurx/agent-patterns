import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
          {
            "border-transparent bg-primary text-primary-foreground": variant === "default",
            "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
            "border-input": variant === "outline",
            "border-transparent bg-green-500 text-white": variant === "success",
            "border-transparent bg-yellow-500 text-white": variant === "warning",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }


