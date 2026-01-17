import * as React from "react"
import { cn } from "@agent-patterns/core"

export interface FormField {
  name: string
  label: string
  type: "text" | "email" | "number" | "textarea" | "select" | "checkbox"
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
  defaultValue?: string | number | boolean
}

export interface AgentFormProps extends React.HTMLAttributes<HTMLFormElement> {
  title?: string
  description?: string
  fields: FormField[]
  onSubmit?: (data: Record<string, unknown>) => void
  submitLabel?: string
}

export const AgentForm = React.forwardRef<HTMLFormElement, AgentFormProps>(
  (
    { title, description, fields, onSubmit, submitLabel = "Submit", className, ...props },
    ref
  ) => {
    const [formData, setFormData] = React.useState<Record<string, unknown>>(() => {
      const initial: Record<string, unknown> = {}
      fields.forEach((field) => {
        initial[field.name] = field.defaultValue ?? ""
      })
      return initial
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit?.(formData)
    }

    const handleChange = (name: string, value: unknown) => {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn("rounded-lg border border-border bg-card p-6", className)}
        {...props}
      >
        {title && (
          <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        )}
        {description && (
          <p className="mb-6 text-sm text-muted-foreground">{description}</p>
        )}
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-foreground"
              >
                {field.label}
                {field.required && <span className="text-destructive"> *</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] as string}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={4}
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  value={formData[field.name] as string}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={field.name}
                    name={field.name}
                    checked={formData[field.name] as boolean}
                    onChange={(e) => handleChange(field.name, e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                  />
                  <span className="text-sm text-muted-foreground">{field.placeholder}</span>
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] as string | number}
                  onChange={(e) =>
                    handleChange(
                      field.name,
                      field.type === "number" ? Number(e.target.value) : e.target.value
                    )
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {submitLabel}
        </button>
      </form>
    )
  }
)

AgentForm.displayName = "AgentForm"


