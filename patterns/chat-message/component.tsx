"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@agent-patterns/core"

interface ChatMessageAction {
  label: string
  onClick?: () => void
}

interface ChatMessageProps {
  role: "user" | "assistant" | "system"
  content: string
  avatar?: string
  timestamp?: string | Date
  isStreaming?: boolean
  status?: "sending" | "sent" | "error"
  actions?: ChatMessageAction[]
  className?: string
}

export function ChatMessage({
  role,
  content,
  avatar,
  timestamp,
  isStreaming = false,
  status,
  actions,
  className,
}: ChatMessageProps) {
  const [displayedContent, setDisplayedContent] = useState(isStreaming ? "" : content)
  const [currentIndex, setCurrentIndex] = useState(0)
  const messageRef = useRef<HTMLDivElement>(null)

  // Typewriter effect for streaming
  useEffect(() => {
    if (isStreaming && currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(content.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 20)
      return () => clearTimeout(timer)
    }
  }, [isStreaming, currentIndex, content])

  // Reset when content changes
  useEffect(() => {
    if (!isStreaming) {
      setDisplayedContent(content)
      setCurrentIndex(content.length)
    } else {
      setDisplayedContent("")
      setCurrentIndex(0)
    }
  }, [content, isStreaming])

  const isUser = role === "user"
  const isSystem = role === "system"

  // Format timestamp
  const formattedTime = timestamp
    ? typeof timestamp === "string"
      ? timestamp
      : timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null

  // Avatar component
  const avatarContent = avatar || (isUser ? "U" : "AI")

  if (isSystem) {
    return (
      <div className={cn("flex justify-center py-2", className)}>
        <div className="rounded-full bg-muted px-4 py-1.5 text-xs text-muted-foreground">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={messageRef}
      className={cn(
        "group flex gap-3 py-4",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {avatar ? (
          <img src={avatar} alt={role} className="h-full w-full rounded-full object-cover" />
        ) : (
          <span>{avatarContent}</span>
        )}
      </div>

      {/* Message Bubble */}
      <div className={cn("flex max-w-[80%] flex-col gap-2", isUser && "items-end")}>
        {/* Message Content */}
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm",
            isUser
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card text-card-foreground"
          )}
        >
          <div className="whitespace-pre-wrap break-words">
            {displayedContent}
            {isStreaming && currentIndex < content.length && (
              <span className="animate-pulse">|</span>
            )}
          </div>
        </div>

        {/* Metadata Row */}
        <div className={cn("flex items-center gap-2 px-2 text-xs text-muted-foreground", isUser && "flex-row-reverse")}>
          {formattedTime && <span>{formattedTime}</span>}
          
          {status === "sending" && (
            <span className="flex items-center gap-1">
              <div className="h-1 w-1 animate-pulse rounded-full bg-muted-foreground"></div>
              Sending
            </span>
          )}
          
          {status === "sent" && (
            <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          
          {status === "error" && (
            <span className="flex items-center gap-1 text-red-600">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Failed
            </span>
          )}
        </div>

        {/* Action Buttons */}
        {actions && actions.length > 0 && (
          <div className={cn("flex flex-wrap gap-2", isUser && "justify-end")}>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

