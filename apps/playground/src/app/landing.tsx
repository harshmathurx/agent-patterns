"use client"

import { useState, useEffect } from "react"
import { themes, type ThemeName } from "./themes"
import { HeroAnimation } from "@/components/hero-animation"
import { PatternGallery } from "@/components/pattern-gallery"
import { ThemeShowcase } from "@/components/theme-showcase"
import { AIDemoZeroTokens } from "@/components/ai-demo-zero-tokens"
import Link from "next/link"

export default function NewLandingPage() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>("default")
  const [selectedPattern, setSelectedPattern] = useState<string | undefined>()

  // Apply theme
  useEffect(() => {
    const root = document.documentElement
    const theme = themes[selectedTheme]
    Object.entries(theme.css).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [selectedTheme])

  // Scroll to pattern gallery when pattern is selected
  useEffect(() => {
    if (selectedPattern) {
      const galleryElement = document.getElementById("pattern-gallery")
      if (galleryElement) {
        galleryElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [selectedPattern])

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-foreground">
              Agent Patterns
            </h1>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#hero" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#patterns" className="text-foreground hover:text-primary transition-colors">
                Patterns
              </a>
              <a href="#demo" className="text-foreground hover:text-primary transition-colors">
                Demo
              </a>
              <Link href="/playground" className="text-foreground hover:text-primary transition-colors">
                Playground
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/yourusername/agent-patterns"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">View on GitHub</span>
              <span className="sm:hidden">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Theme Showcase Strip */}
      <ThemeShowcase selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />

      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Copy-paste UI patterns designed for LLM generation
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Agent Patterns
          </h1>
          
          <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground md:text-2xl">
            Production-ready React components with LLM-optimized Zod schemas. 
            Build AI-powered UIs that work with any agent framework.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#patterns"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Browse Patterns →
            </a>
            <a
              href="https://github.com/yourusername/agent-patterns"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-background px-6 py-3 text-lg font-semibold text-foreground transition-all hover:border-primary hover:bg-muted"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>

        {/* Animated Hero Demo */}
        <HeroAnimation />

        {/* Key Features */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">LLM-Optimized Schemas</h3>
            <p className="text-muted-foreground">
              Every pattern includes Zod schemas with detailed descriptions that help LLMs understand and generate correct code.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Theme-Compatible</h3>
            <p className="text-muted-foreground">
              Works with 20+ themes out of the box. Built on shadcn/ui with CSS variables for instant theme switching.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Copy-Paste Model</h3>
            <p className="text-muted-foreground">
              No npm package, no lock-in. Copy the code directly into your project and customize it however you want.
            </p>
          </div>
        </div>
      </section>

      {/* Pattern Gallery */}
      <section id="patterns" className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PatternGallery selectedPattern={selectedPattern} onPatternSelect={setSelectedPattern} />
        </div>
      </section>

      {/* AI Demo Section */}
      <section id="demo" className="border-t border-border py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AIDemoZeroTokens />
        </div>
      </section>

      {/* Integration Section */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
              Works With Your Stack
            </h2>
            <p className="text-lg text-muted-foreground">
              Compatible with popular frameworks and tools
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {["Next.js", "React", "shadcn/ui", "Tailwind", "CopilotKit", "Vercel AI SDK", "Cursor"].map((tech) => (
              <div
                key={tech}
                className="flex items-center justify-center rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            Ready to build AI-powered UIs?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Start using Agent Patterns today. Copy the patterns you need, integrate with your agent, and ship faster.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Try the Playground →
            </Link>
            <a
              href="https://github.com/yourusername/agent-patterns"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-background px-6 py-3 text-lg font-semibold text-foreground transition-all hover:border-primary hover:bg-muted"
            >
              ⭐ Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Built by developers, for developers. Open source and free to use.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="https://github.com/yourusername/agent-patterns" className="hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="https://twitter.com/yourusername" className="hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="/playground" className="hover:text-foreground transition-colors">
              Playground
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

