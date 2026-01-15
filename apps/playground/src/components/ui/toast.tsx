"use client"

import * as React from "react"
import { cn } from "@agent-patterns/core"

interface ToastContextValue {
  showToast: (message: string, variant?: "success" | "error" | "info") => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

interface Toast {
  id: string
  message: string
  variant: "success" | "error" | "info"
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const showToast = React.useCallback(
    (message: string, variant: "success" | "error" | "info" = "success") => {
      const id = Math.random().toString(36).substring(7)
      setToasts((prev) => [...prev, { id, message, variant }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, 3000)
    },
    []
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-lg transition-all duration-300",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        {
          "border-green-500/50 bg-green-50 dark:bg-green-950": toast.variant === "success",
          "border-red-500/50 bg-red-50 dark:bg-red-950": toast.variant === "error",
          "border-blue-500/50 bg-blue-50 dark:bg-blue-950": toast.variant === "info",
        }
      )}
      role="alert"
    >
      {toast.variant === "success" && (
        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {toast.variant === "error" && (
        <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      {toast.variant === "info" && (
        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      <span className="text-sm font-medium text-foreground">{toast.message}</span>
    </div>
  )
}

