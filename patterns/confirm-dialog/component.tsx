"use client"

import { useState, useEffect } from "react"
import { cn } from "@agent-patterns/core"

interface ConfirmDialogProps {
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "default" | "destructive" | "warning"
  icon?: React.ReactNode
  open: boolean
  onConfirm?: () => void
  onCancel?: () => void
  className?: string
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  icon,
  open,
  onConfirm,
  onCancel,
  className,
}: ConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(open)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm?.()
      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    onCancel?.()
    setIsOpen(false)
  }

  const variantStyles = {
    default: {
      button: "bg-primary text-primary-foreground hover:bg-primary/90",
      icon: "text-primary",
    },
    destructive: {
      button: "bg-red-600 text-white hover:bg-red-700",
      icon: "text-red-600",
    },
    warning: {
      button: "bg-yellow-600 text-white hover:bg-yellow-700",
      icon: "text-yellow-600",
    },
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={handleCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={cn(
            "relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          {/* Icon */}
          {icon && (
            <div className="mb-4 flex justify-center">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full bg-muted",
                  variantStyles[variant].icon
                )}
              >
                {icon}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="text-center">
            <h2
              id="dialog-title"
              className="mb-2 text-lg font-semibold text-foreground"
            >
              {title}
            </h2>
            <p
              id="dialog-description"
              className="text-sm text-muted-foreground"
            >
              {description}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className={cn(
                "flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium",
                "hover:bg-accent hover:text-accent-foreground",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-colors"
              )}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              className={cn(
                "flex-1 rounded-lg px-4 py-2 text-sm font-medium",
                variantStyles[variant].button,
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-colors"
              )}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

