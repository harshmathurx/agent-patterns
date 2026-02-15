"use client"

import { useState } from "react"
import { themes, type ThemeName } from "../app/themes"

interface ThemeCustomizerProps {
  selectedTheme: ThemeName
  onThemeChange: (theme: ThemeName) => void
  onCustomThemeChange: (css: Record<string, string>) => void
}

export function ThemeCustomizer({
  selectedTheme,
  onThemeChange,
  onCustomThemeChange,
}: ThemeCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [customTheme, setCustomTheme] = useState<Record<string, string>>(themes[selectedTheme].css as Record<string, string>)
  const [showCode, setShowCode] = useState(false)

  const handleColorChange = (key: string, value: string) => {
    const updated = { ...customTheme, [key]: value }
    setCustomTheme(updated)
    onCustomThemeChange(updated)
  }

  const handleRadiusChange = (value: string) => {
    const updated = { ...customTheme, "--radius": value }
    setCustomTheme(updated)
    onCustomThemeChange(updated)
  }

  const resetToTheme = (themeName: ThemeName) => {
    const theme = themes[themeName]
    setCustomTheme(theme.css as Record<string, string>)
    onThemeChange(themeName)
    onCustomThemeChange(theme.css as Record<string, string>)
  }

  const generateCSS = () => {
    return `:root {
${Object.entries(customTheme)
  .map(([key, value]) => `  ${key}: ${value};`)
  .join("\n")}
}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS())
    alert("CSS copied to clipboard!")
  }

  // Helper to get a visual color preview from HSL
  const getColorPreview = (hsl: string): string => {
    // Parse HSL values
    const parts = hsl.split(" ")
    if (parts.length < 3) return "#000000"
    
    const h = parseFloat(parts[0] || "0") || 0
    const s = parseFloat(parts[1] || "0") || 0
    const l = parseFloat(parts[2] || "0") || 0
    
    // Convert HSL to RGB for preview
    const hNorm = h / 360
    const sNorm = s / 100
    const lNorm = l / 100
    
    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm
    const x = c * (1 - Math.abs(((hNorm * 6) % 2) - 1))
    const m = lNorm - c / 2
    
    let r = 0, g = 0, b = 0
    
    if (hNorm < 1/6) { r = c; g = x; b = 0 }
    else if (hNorm < 2/6) { r = x; g = c; b = 0 }
    else if (hNorm < 3/6) { r = 0; g = c; b = x }
    else if (hNorm < 4/6) { r = 0; g = x; b = c }
    else if (hNorm < 5/6) { r = x; g = 0; b = c }
    else { r = c; g = 0; b = x }
    
    const toHex = (n: number) => {
      const val = Math.round((n + m) * 255)
      return val.toString(16).padStart(2, '0')
    }
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const colorInputs = [
    { key: "--primary", label: "Primary", description: "Main brand color" },
    { key: "--primary-foreground", label: "Primary Foreground", description: "Text on primary" },
    { key: "--secondary", label: "Secondary", description: "Secondary elements" },
    { key: "--accent", label: "Accent", description: "Accent color" },
    { key: "--destructive", label: "Destructive", description: "Error/danger color" },
    { key: "--background", label: "Background", description: "Page background" },
    { key: "--foreground", label: "Foreground", description: "Main text color" },
    { key: "--muted", label: "Muted", description: "Muted backgrounds" },
    { key: "--border", label: "Border", description: "Border color" },
  ]

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
      >
        Customize Theme
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Customize Theme</h2>
            <p className="text-sm text-muted-foreground">
              Adjust colors and radius to match your brand
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Preset Themes */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Preset Themes
            </label>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => resetToTheme(key as ThemeName)}
                  className={`rounded-md border p-3 text-sm transition-colors ${
                    selectedTheme === key
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color Customization */}
          <div>
            <label className="mb-4 block text-sm font-medium text-foreground">
              Colors
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              {colorInputs.map(({ key, label, description }) => {
                const hslValue = customTheme[key] || ""
                const previewColor = getColorPreview(hslValue)

                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-foreground">{label}</label>
                      <span className="text-xs text-muted-foreground">{description}</span>
                    </div>
                    <div className="flex gap-2">
                      <div
                        className="h-10 w-20 rounded border border-border"
                        style={{ backgroundColor: previewColor }}
                      />
                      <input
                        type="text"
                        value={hslValue}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        placeholder="0 0% 100%"
                        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Format: H S% L% (e.g., "222.2 47.4% 11.2%")
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Radius */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Border Radius
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={parseFloat(customTheme["--radius"] || "0.5")}
                onChange={(e) => handleRadiusChange(`${e.target.value}rem`)}
                className="flex-1"
              />
              <input
                type="text"
                value={customTheme["--radius"] || "0.5rem"}
                onChange={(e) => handleRadiusChange(e.target.value)}
                className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              />
            </div>
          </div>

          {/* Code Preview */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Generated CSS</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground hover:bg-muted"
                >
                  {showCode ? "Hide" : "Show"} Code
                </button>
                <button
                  onClick={copyToClipboard}
                  className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Copy Code
                </button>
              </div>
            </div>
            {showCode && (
              <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
                <code>{generateCSS()}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

