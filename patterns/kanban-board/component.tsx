"use client"

import { useState } from "react"
import { cn } from "@agent-patterns/core"

interface KanbanCard {
  id: string
  columnId: string
  title: string
  description?: string
  labels?: string[]
  assignee?: string
  priority?: "low" | "medium" | "high" | "urgent"
}

interface KanbanColumn {
  id: string
  title: string
  color?: string
  limit?: number
}

interface KanbanBoardProps {
  columns: KanbanColumn[]
  cards: KanbanCard[]
  onCardMove?: (cardId: string, fromColumn: string, toColumn: string) => void
  onCardClick?: (card: KanbanCard) => void
  className?: string
}

export function KanbanBoard({
  columns,
  cards: initialCards,
  onCardMove,
  onCardClick,
  className,
}: KanbanBoardProps) {
  const [cards, setCards] = useState(initialCards)
  const [draggedCard, setDraggedCard] = useState<string | null>(null)

  const handleDragStart = (cardId: string) => {
    setDraggedCard(cardId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (columnId: string) => {
    if (!draggedCard) return

    const card = cards.find((c) => c.id === draggedCard)
    if (!card || card.columnId === columnId) {
      setDraggedCard(null)
      return
    }

    const fromColumn = card.columnId
    setCards((prev) =>
      prev.map((c) => (c.id === draggedCard ? { ...c, columnId } : c))
    )
    onCardMove?.(draggedCard, fromColumn, columnId)
    setDraggedCard(null)
  }

  const priorityColors = {
    low: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400",
    medium: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400",
    high: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-400",
    urgent: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400",
  }

  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
      {columns.map((column) => {
        const columnCards = cards.filter((c) => c.columnId === column.id)
        const isOverLimit = column.limit && columnCards.length > column.limit

        return (
          <div
            key={column.id}
            className="min-w-[280px] flex-shrink-0"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            {/* Column Header */}
            <div className="mb-3 flex items-center justify-between rounded-lg border border-border bg-card p-3">
              <div className="flex items-center gap-2">
                {column.color && (
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: column.color }}
                  />
                )}
                <h3 className="font-semibold text-foreground">{column.title}</h3>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  isOverLimit
                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                    : "bg-muted text-muted-foreground"
                )}>
                  {columnCards.length}
                  {column.limit && `/${column.limit}`}
                </span>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-2">
              {columnCards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card.id)}
                  onClick={() => onCardClick?.(card)}
                  className={cn(
                    "cursor-move rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md",
                    draggedCard === card.id && "opacity-50"
                  )}
                >
                  {/* Card Priority Indicator */}
                  {card.priority && (
                    <div className="mb-2">
                      <span className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                        priorityColors[card.priority]
                      )}>
                        {card.priority === "urgent" && "🔥"}
                        {card.priority}
                      </span>
                    </div>
                  )}

                  {/* Card Title */}
                  <h4 className="mb-1 text-sm font-semibold text-foreground">
                    {card.title}
                  </h4>

                  {/* Card Description */}
                  {card.description && (
                    <p className="mb-2 text-xs text-muted-foreground line-clamp-2">
                      {card.description}
                    </p>
                  )}

                  {/* Card Labels */}
                  {card.labels && card.labels.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {card.labels.map((label, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Card Assignee */}
                  {card.assignee && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                        {card.assignee.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs text-muted-foreground">{card.assignee}</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Empty State */}
              {columnCards.length === 0 && (
                <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                  Drop cards here
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

