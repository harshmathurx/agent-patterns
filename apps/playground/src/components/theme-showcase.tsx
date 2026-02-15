"use client"

import { useState } from "react"
import { themes, type ThemeName } from "@/app/themes"

interface ThemeShowcaseProps {
  selectedTheme: ThemeName
  onThemeChange: (theme: ThemeName) => void
}

export function ThemeShowcase({ selectedTheme, onThemeChange }: ThemeShowcaseProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const themeList = Object.entries(themes) as [ThemeName, typeof themes[ThemeName]][]

  const applyTheme = (themeName: ThemeName) => {
    const theme = themes[themeName]
    Object.entries(theme.css).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
    onThemeChange(themeName)
  }

  return (
    <div className="w-full border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-semibold text-foreground">
              🎨 Live Theme Preview
            </h3>
            <span className="text-xs text-muted-foreground">
              {themes[selectedTheme].name}
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            {isExpanded ? "Hide Themes" : "Show All Themes"}
          </button>
        </div>

        {/* Theme Strip */}
        <div className={`mt-4 overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[600px]" : "max-h-24"}`}>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
            {themeList.map(([themeName, theme]) => (
              <button
                key={themeName}
                onClick={() => applyTheme(themeName)}
                className={`group relative overflow-hidden rounded-lg border-2 p-4 text-left transition-all hover:shadow-md ${
                  selectedTheme === themeName
                    ? "border-primary shadow-sm"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {/* Theme Color Swatches */}
                <div className="mb-3 flex gap-1.5">
                  <div
                    className="h-6 w-6 rounded-md border border-gray-200 shadow-sm"
                    style={{ backgroundColor: theme.css["--primary"] }}
                  />
                  <div
                    className="h-6 w-6 rounded-md border border-gray-200 shadow-sm"
                    style={{ backgroundColor: theme.css["--background"] }}
                  />
                  <div
                    className="h-6 w-6 rounded-md border border-gray-200 shadow-sm"
                    style={{ backgroundColor: theme.css["--card"] }}
                  />
                  <div
                    className="h-6 w-6 rounded-md border border-gray-200 shadow-sm"
                    style={{ backgroundColor: theme.css["--muted"] }}
                  />
                </div>

                {/* Theme Name */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {theme.name}
                  </span>
                  {selectedTheme === themeName && (
                    <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Sample Components Preview (mini) */}
                {isExpanded && (
                  <div className="mt-3 space-y-2 text-xs">
                    <div
                      className="rounded border px-2 py-1"
                      style={{
                        backgroundColor: theme.css["--primary"],
                        color: theme.css["--primary-foreground"],
                        borderColor: theme.css["--primary"],
                      }}
                    >
                      Primary Button
                    </div>
                    <div
                      className="rounded border px-2 py-1"
                      style={{
                        backgroundColor: theme.css["--card"],
                        color: theme.css["--card-foreground"],
                        borderColor: theme.css["--border"],
                      }}
                    >
                      Card Component
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50/80 p-3 dark:border-blue-800 dark:bg-blue-950/80">
          <p className="text-xs text-blue-950 dark:text-blue-50">
            <strong className="font-semibold">✨ All patterns work with every theme.</strong>{" "}
            Watch components re-skin instantly as you switch. This is the power of CSS variables and shadcn theming.
          </p>
        </div>
      </div>
    </div>
  )
}

