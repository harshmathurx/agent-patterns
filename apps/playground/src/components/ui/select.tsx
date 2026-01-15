import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-foreground" htmlFor={props.id}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }

