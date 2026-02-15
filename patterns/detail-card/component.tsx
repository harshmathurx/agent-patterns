import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface DetailField {
  label: string
  value: React.ReactNode
  span?: 1 | 2
  copyable?: boolean
  badge?: {
    text: string
    variant: "default" | "success" | "warning" | "error"
  }
}

export interface DetailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  fields: DetailField[]
  actions?: React.ReactNode
  editable?: boolean
  onEdit?: (fields: Record<string, any>) => void
  loading?: boolean
}

export const DetailCard = React.forwardRef<HTMLDivElement, DetailCardProps>(
  (
    {
      title,
      description,
      fields,
      actions,
      editable = false,
      onEdit,
      loading = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const [editValues, setEditValues] = React.useState<Record<string, any>>({})
    const [copiedField, setCopiedField] = React.useState<string | null>(null)

    const handleCopy = async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedField(label)
        setTimeout(() => setCopiedField(null), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }

    const handleEditStart = () => {
      // Initialize edit values with current field values
      const initialValues: Record<string, any> = {}
      fields.forEach((field) => {
        if (typeof field.value === "string" || typeof field.value === "number") {
          initialValues[field.label] = field.value
        }
      })
      setEditValues(initialValues)
      setIsEditing(true)
    }

    const handleEditCancel = () => {
      setIsEditing(false)
      setEditValues({})
    }

    const handleEditSave = () => {
      if (onEdit) {
        onEdit(editValues)
      }
      setIsEditing(false)
    }

    const getBadgeStyles = (variant: "default" | "success" | "warning" | "error") => {
      switch (variant) {
        case "success":
          return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
        case "warning":
          return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
        case "error":
          return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
        case "default":
        default:
          return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
      }
    }

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn("rounded-lg border border-border bg-card p-6", className)}
          {...props}
        >
          <div className="space-y-4">
            <div className="h-6 w-48 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("rounded-lg border border-border bg-card", className)}
        {...props}
      >
        {(title || description || editable || actions) && (
          <div className="border-b border-border p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {title && (
                  <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                )}
                {description && (
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editable && !isEditing && (
                  <button
                    onClick={handleEditStart}
                    className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    Edit
                  </button>
                )}
                {actions}
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field, index) => (
              <div
                key={index}
                className={cn(
                  "space-y-1",
                  field.span === 2 && "md:col-span-2"
                )}
              >
                <dt className="text-sm font-medium text-muted-foreground">
                  {field.label}
                </dt>
                <dd className="flex items-start gap-2">
                  {isEditing && typeof field.value === "string" ? (
                    <input
                      type="text"
                      value={editValues[field.label] || ""}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          [field.label]: e.target.value,
                        }))
                      }
                      className="flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground"
                    />
                  ) : (
                    <div className="flex flex-1 items-center gap-2">
                      <span className="text-sm text-foreground">{field.value}</span>
                      {field.badge && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            getBadgeStyles(field.badge.variant)
                          )}
                        >
                          {field.badge.text}
                        </span>
                      )}
                    </div>
                  )}

                  {field.copyable && !isEditing && typeof field.value === "string" && (
                    <button
                      onClick={() => handleCopy(field.value as string, field.label)}
                      className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                      aria-label={`Copy ${field.label}`}
                    >
                      {copiedField === field.label ? (
                        <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                </dd>
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={handleEditCancel}
                className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
)

DetailCard.displayName = "DetailCard"
