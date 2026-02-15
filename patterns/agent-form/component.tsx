import * as React from "react"
import { cn } from "@agent-patterns/core"
import { z } from "zod"

export interface FormField {
  name: string
  label: string
  type: "text" | "email" | "number" | "textarea" | "select" | "checkbox" | "date" | "password" | "radio" | "toggle" | "file"
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
  defaultValue?: string | number | boolean
  validation?: z.ZodType<any>
  description?: string
}

export interface AgentFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  title?: string
  description?: string
  fields: FormField[]
  onSubmit?: (data: Record<string, unknown>) => void | Promise<void>
  submitLabel?: string
  schema?: z.ZodObject<any>
  showValidationErrors?: boolean
}

export const AgentForm = React.forwardRef<HTMLFormElement, AgentFormProps>(
  (
    {
      title,
      description,
      fields,
      onSubmit,
      submitLabel = "Submit",
      schema,
      showValidationErrors = true,
      className,
      ...props
    },
    ref
  ) => {
    const [formData, setFormData] = React.useState<Record<string, unknown>>(() => {
      const initial: Record<string, unknown> = {}
      fields.forEach((field) => {
        initial[field.name] = field.defaultValue ?? (field.type === "checkbox" || field.type === "toggle" ? false : "")
      })
      return initial
    })

    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle")
    const [touched, setTouched] = React.useState<Record<string, boolean>>({})

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setErrors({})
      setSubmitStatus("idle")
      setIsSubmitting(true)

      try {
        // Validate with schema if provided
        if (schema) {
          schema.parse(formData)
        } else {
          // Validate required fields and individual field validation
          const newErrors: Record<string, string> = {}
          fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
              newErrors[field.name] = `${field.label} is required`
            }
            // Individual field validation
            if (field.validation && formData[field.name]) {
              try {
                field.validation.parse(formData[field.name])
              } catch (err) {
                if (err instanceof z.ZodError) {
                  newErrors[field.name] = err.errors[0].message
                }
              }
            }
          })
          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsSubmitting(false)
            return
          }
        }

        // Submit
        await onSubmit?.(formData)
        setSubmitStatus("success")
        
        // Reset form after successful submit
        setTimeout(() => {
          setSubmitStatus("idle")
        }, 3000)
      } catch (err) {
        if (err instanceof z.ZodError) {
          const newErrors: Record<string, string> = {}
          err.errors.forEach((error) => {
            if (error.path[0]) {
              newErrors[error.path[0].toString()] = error.message
            }
          })
          setErrors(newErrors)
        }
        setSubmitStatus("error")
      } finally {
        setIsSubmitting(false)
      }
    }

    const handleChange = (name: string, value: unknown) => {
      setFormData((prev) => ({ ...prev, [name]: value }))
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    }

    const handleBlur = (name: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }))
      
      // Validate on blur
      const field = fields.find((f) => f.name === name)
      if (field) {
        if (field.required && !formData[name]) {
          setErrors((prev) => ({ ...prev, [name]: `${field.label} is required` }))
        } else if (field.validation && formData[name]) {
          try {
            field.validation.parse(formData[name])
          } catch (err) {
            if (err instanceof z.ZodError) {
              setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }))
            }
          }
        }
      }
    }

    const renderField = (field: FormField) => {
      const hasError = touched[field.name] && errors[field.name]

      switch (field.type) {
        case "textarea":
          return (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              aria-required={field.required}
              aria-invalid={!!hasError}
              aria-describedby={hasError ? `${field.name}-error` : field.description ? `${field.name}-description` : undefined}
              value={formData[field.name] as string}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              className={cn(
                "w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2",
                hasError
                  ? "border-destructive focus:ring-destructive"
                  : "border-input focus:ring-ring"
              )}
              rows={4}
            />
          )

        case "select":
          return (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              aria-required={field.required}
              aria-invalid={!!hasError}
              aria-describedby={hasError ? `${field.name}-error` : field.description ? `${field.name}-description` : undefined}
              value={formData[field.name] as string}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              className={cn(
                "w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2",
                hasError
                  ? "border-destructive focus:ring-destructive"
                  : "border-input focus:ring-ring"
              )}
            >
              <option value="">Select...</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )

        case "checkbox":
          return (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                checked={formData[field.name] as boolean}
                onChange={(e) => handleChange(field.name, e.target.checked)}
                aria-required={field.required}
                aria-invalid={!!hasError}
                className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
              />
              {field.placeholder && (
                <span className="text-sm text-muted-foreground">{field.placeholder}</span>
              )}
            </div>
          )

        case "toggle":
          return (
            <button
              type="button"
              role="switch"
              aria-checked={formData[field.name] as boolean}
              onClick={() => handleChange(field.name, !formData[field.name])}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                formData[field.name] ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  formData[field.name] ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          )

        case "radio":
          return (
            <div className="space-y-2">
              {field.options?.map((option) => (
                <label key={option.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="h-4 w-4 border-input text-primary focus:ring-2 focus:ring-ring"
                  />
                  <span className="text-sm text-foreground">{option.label}</span>
                </label>
              ))}
            </div>
          )

        case "file":
          return (
            <input
              type="file"
              id={field.name}
              name={field.name}
              required={field.required}
              aria-required={field.required}
              aria-invalid={!!hasError}
              onChange={(e) => handleChange(field.name, e.target.files?.[0])}
              onBlur={() => handleBlur(field.name)}
              className={cn(
                "w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90 focus:outline-none focus:ring-2",
                hasError
                  ? "border-destructive focus:ring-destructive"
                  : "border-input focus:ring-ring"
              )}
            />
          )

        case "date":
        case "password":
        case "email":
        case "text":
        case "number":
        default:
          return (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              aria-required={field.required}
              aria-invalid={!!hasError}
              aria-describedby={hasError ? `${field.name}-error` : field.description ? `${field.name}-description` : undefined}
              value={formData[field.name] as string | number}
              onChange={(e) =>
                handleChange(
                  field.name,
                  field.type === "number" ? Number(e.target.value) : e.target.value
                )
              }
              onBlur={() => handleBlur(field.name)}
              className={cn(
                "w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2",
                hasError
                  ? "border-destructive focus:ring-destructive"
                  : "border-input focus:ring-ring"
              )}
            />
          )
      }
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
                {field.required && (
                  <>
                    <span className="text-destructive" aria-label="required"> *</span>
                    <span className="sr-only"> (required)</span>
                  </>
                )}
              </label>
              {field.description && (
                <p id={`${field.name}-description`} className="text-xs text-muted-foreground">
                  {field.description}
                </p>
              )}
              {renderField(field)}
              {showValidationErrors && touched[field.name] && errors[field.name] && (
                <p
                  id={`${field.name}-error`}
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Submit status messages */}
        {submitStatus === "success" && (
          <div
            className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
            role="status"
          >
            Form submitted successfully!
          </div>
        )}
        {submitStatus === "error" && (
          <div
            className="mt-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
            role="alert"
          >
            There was an error submitting the form. Please check the fields and try again.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "mt-6 w-full rounded-md px-4 py-2 text-sm font-medium text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            isSubmitting
              ? "bg-primary/60"
              : "bg-primary hover:bg-primary/90"
          )}
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </button>
      </form>
    )
  }
)

AgentForm.displayName = "AgentForm"
