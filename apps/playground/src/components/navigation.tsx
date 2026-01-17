"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@agent-patterns/core"
import { Button } from "./ui/button"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <span className="text-sm font-bold">AP</span>
              </div>
              <span className="text-xl font-bold text-foreground">Agent Patterns</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === "/" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Playground
            </Link>
            <Link
              href="/standards"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === "/standards" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Standards
            </Link>
            <Link
              href="/docs"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === "/docs" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Docs
            </Link>
            <Button variant="outline" size="sm">
              <a
                href="https://github.com/your-org/agent-patterns"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

