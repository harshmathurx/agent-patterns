import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface DetailField {
  label: string
  value: React.ReactNode
  span?: 1 | 2
}

export interface DetailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  fields: DetailField[]
  actions?: React.ReactNode
}

export const DetailCard = React.forwardRef<HTMLDivElement, DetailCardProps>(
  ({ title, description, fields, actions, className, ...props }, ref) => {
    const cardId = React.useId()
    const titleId = title ? `${cardId}-title` : undefined
    const descriptionId = description ? `${cardId}-description` : undefined

    return (
      <div
        ref={ref}
        role="region"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn("rounded-lg border border-border bg-card p-6", className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h3 id={titleId} className="text-lg font-semibold text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p id={descriptionId} className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fields.map((field, index) => (
            <div
              key={index}
              className={cn(
                "space-y-1",
                field.span === 2 && "md:col-span-2"
              )}
            >
              <dt className="text-sm font-medium text-muted-foreground">{field.label}</dt>
              <dd className="text-sm text-foreground">{field.value}</dd>
            </div>
          ))}
        </dl>
        {actions && (
          <div className="mt-6 flex gap-2" role="group" aria-label="Actions">
            {actions}
          </div>
        )}
      </div>
    )
  }
)

DetailCard.displayName = "DetailCard"


