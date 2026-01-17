#!/usr/bin/env node

import { Command } from "commander"
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, writeFileSync } from "fs-extra"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import chalk from "chalk"
import { auditPatterns, printAuditReport } from "./commands/audit.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()

program
  .name("agent-patterns")
  .description("CLI tool for Agent Patterns")
  .version("0.1.0")

program
  .command("init")
  .description("Initialize Agent Patterns in your project")
  .action(() => {
    console.log(chalk.blue("Initializing Agent Patterns..."))

    const patternsDir = "app/patterns"
    const configFile = "theme.config.ts"

    // Create patterns directory
    if (!existsSync(patternsDir)) {
      mkdirSync(patternsDir, { recursive: true })
      console.log(chalk.green(`✓ Created ${patternsDir}`))
    } else {
      console.log(chalk.yellow(`⚠ ${patternsDir} already exists`))
    }

    // Create theme config
    const themeConfig = `import { type ThemeConfig } from "@agent-patterns/core"

export const theme: ThemeConfig = {
  name: "default",
  cssVariables: {
    "--background": "0 0% 100%",
    "--foreground": "222.2 84% 4.9%",
    "--card": "0 0% 100%",
    "--card-foreground": "222.2 84% 4.9%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "222.2 84% 4.9%",
    "--primary": "222.2 47.4% 11.2%",
    "--primary-foreground": "210 40% 98%",
    "--secondary": "210 40% 96.1%",
    "--secondary-foreground": "222.2 47.4% 11.2%",
    "--muted": "210 40% 96.1%",
    "--muted-foreground": "215.4 16.3% 46.9%",
    "--accent": "210 40% 96.1%",
    "--accent-foreground": "222.2 47.4% 11.2%",
    "--destructive": "0 84.2% 60.2%",
    "--destructive-foreground": "210 40% 98%",
    "--border": "214.3 31.8% 91.4%",
    "--input": "214.3 31.8% 91.4%",
    "--ring": "222.2 84% 4.9%",
    "--radius": "0.5rem",
  },
}
`

    if (!existsSync(configFile)) {
      writeFileSync(configFile, themeConfig)
      console.log(chalk.green(`✓ Created ${configFile}`))
    } else {
      console.log(chalk.yellow(`⚠ ${configFile} already exists`))
    }

    console.log(chalk.green("\n✓ Agent Patterns initialized!"))
  })

program
  .command("add <pattern>")
  .description("Add a pattern to your project")
  .action((pattern: string) => {
    console.log(chalk.blue(`Adding pattern: ${pattern}...`))

    const patternsSource = join(__dirname, "../../../patterns", pattern)
    const patternsDest = join(process.cwd(), "app/patterns", pattern)

    if (!existsSync(patternsSource)) {
      console.error(chalk.red(`✗ Pattern "${pattern}" not found`))
      process.exit(1)
    }

    // Copy pattern directory
    copyDirectory(patternsSource, patternsDest)
    console.log(chalk.green(`✓ Added pattern: ${pattern}`))
  })

program
  .command("update")
  .description("Update all patterns to latest version")
  .action(() => {
    console.log(chalk.blue("Updating patterns..."))

    const patternsDest = join(process.cwd(), "app/patterns")

    if (!existsSync(patternsDest)) {
      console.error(chalk.red("✗ Patterns directory not found. Run 'agent-patterns init' first."))
      process.exit(1)
    }

    const patterns = readdirSync(patternsDest).filter((item) => {
      const itemPath = join(patternsDest, item)
      return statSync(itemPath).isDirectory()
    })

    for (const pattern of patterns) {
      const patternsSource = join(__dirname, "../../../patterns", pattern)
      const patternDest = join(patternsDest, pattern)

      if (existsSync(patternsSource)) {
        copyDirectory(patternsSource, patternDest)
        console.log(chalk.green(`✓ Updated pattern: ${pattern}`))
      }
    }

    console.log(chalk.green("\n✓ All patterns updated!"))
  })

program
  .command("audit")
  .description("Audit patterns against standards (rams.ai, ui-skills.com, Vercel Guidelines)")
  .option("-v, --verbose", "Show detailed compliance information for each pattern")
  .option("-p, --patterns <dir>", "Patterns directory path", "patterns")
  .action((options) => {
    try {
      const report = auditPatterns(options.patterns)
      printAuditReport(report, options.verbose || false)

      // Exit with error code if there are critical issues
      if (report.criticalIssues.length > 0) {
        process.exit(1)
      }
    } catch (error) {
      console.error(chalk.red(`✗ Audit failed: ${error}`))
      process.exit(1)
    }
  })

function copyDirectory(src: string, dest: string): void {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true })
  }

  const entries = readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

program.parse()

