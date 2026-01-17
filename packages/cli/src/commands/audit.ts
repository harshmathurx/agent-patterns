#!/usr/bin/env node

import { readFileSync, readdirSync, statSync, existsSync } from "fs-extra"
import { join } from "path"
import chalk from "chalk"

interface ComplianceData {
  pattern: string
  version: string
  lastAuditDate: string
  standards: {
    "rams-ai"?: StandardCompliance
    "ui-skills"?: StandardCompliance
    "vercel-guidelines"?: StandardCompliance
  }
  overallCompliance: number
  overallStatus: "compliant" | "partial" | "needs-improvement" | "non-compliant"
  nextAuditDate?: string
  notes?: string
}

interface StandardCompliance {
  status: "compliant" | "partial" | "needs-improvement" | "non-compliant"
  compliance: number
  requirements?: Record<string, RequirementStatus>
  issues?: string[]
  fixes?: string[]
}

interface RequirementStatus {
  status: "compliant" | "needs-improvement" | "critical"
  notes: string
}

interface AuditReport {
  patterns: ComplianceData[]
  overall: {
    compliance: number
    status: string
    standards: {
      "rams-ai": { compliance: number; count: number }
      "ui-skills": { compliance: number; count: number }
      "vercel-guidelines": { compliance: number; count: number }
    }
  }
  criticalIssues: Array<{ pattern: string; issue: string; standard: string }>
}

export function auditPatterns(patternsDir: string = "patterns"): AuditReport {
  const patternsPath = join(process.cwd(), patternsDir)
  
  if (!existsSync(patternsPath)) {
    console.error(chalk.red(`✗ Patterns directory not found: ${patternsPath}`))
    process.exit(1)
  }

  const patterns = readdirSync(patternsPath).filter((item) => {
    const itemPath = join(patternsPath, item)
    return statSync(itemPath).isDirectory()
  })

  const complianceData: ComplianceData[] = []
  const criticalIssues: Array<{ pattern: string; issue: string; standard: string }> = []

  for (const pattern of patterns) {
    const compliancePath = join(patternsPath, pattern, "compliance.json")
    
    if (!existsSync(compliancePath)) {
      console.warn(chalk.yellow(`⚠ No compliance.json found for pattern: ${pattern}`))
      continue
    }

    try {
      const complianceContent = readFileSync(compliancePath, "utf-8")
      const compliance: ComplianceData = JSON.parse(complianceContent)
      complianceData.push(compliance)

      // Collect critical issues
      if (compliance.standards["rams-ai"]) {
        const ramsIssues = compliance.standards["rams-ai"].issues || []
        ramsIssues
          .filter((issue) => issue.includes("CRITICAL"))
          .forEach((issue) => {
            criticalIssues.push({
              pattern: compliance.pattern,
              issue: issue.replace("CRITICAL: ", ""),
              standard: "rams-ai",
            })
          })
      }
    } catch (error) {
      console.error(chalk.red(`✗ Error reading compliance.json for ${pattern}: ${error}`))
    }
  }

  // Calculate overall statistics
  const totalCompliance = complianceData.reduce((sum, p) => sum + p.overallCompliance, 0)
  const avgCompliance = complianceData.length > 0 ? totalCompliance / complianceData.length : 0

  const ramsCompliance = complianceData
    .filter((p) => p.standards["rams-ai"])
    .reduce((sum, p) => sum + (p.standards["rams-ai"]?.compliance || 0), 0)
  const ramsCount = complianceData.filter((p) => p.standards["rams-ai"]).length
  const avgRamsCompliance = ramsCount > 0 ? ramsCompliance / ramsCount : 0

  const uiSkillsCompliance = complianceData
    .filter((p) => p.standards["ui-skills"])
    .reduce((sum, p) => sum + (p.standards["ui-skills"]?.compliance || 0), 0)
  const uiSkillsCount = complianceData.filter((p) => p.standards["ui-skills"]).length
  const avgUiSkillsCompliance = uiSkillsCount > 0 ? uiSkillsCompliance / uiSkillsCount : 0

  const vercelCompliance = complianceData
    .filter((p) => p.standards["vercel-guidelines"])
    .reduce((sum, p) => sum + (p.standards["vercel-guidelines"]?.compliance || 0), 0)
  const vercelCount = complianceData.filter((p) => p.standards["vercel-guidelines"]).length
  const avgVercelCompliance = vercelCount > 0 ? vercelCompliance / vercelCount : 0

  let overallStatus = "compliant"
  if (avgCompliance < 50) {
    overallStatus = "non-compliant"
  } else if (avgCompliance < 70) {
    overallStatus = "needs-improvement"
  } else if (avgCompliance < 90) {
    overallStatus = "partial"
  }

  return {
    patterns: complianceData,
    overall: {
      compliance: Math.round(avgCompliance),
      status: overallStatus,
      standards: {
        "rams-ai": {
          compliance: Math.round(avgRamsCompliance),
          count: ramsCount,
        },
        "ui-skills": {
          compliance: Math.round(avgUiSkillsCompliance),
          count: uiSkillsCount,
        },
        "vercel-guidelines": {
          compliance: Math.round(avgVercelCompliance),
          count: vercelCount,
        },
      },
    },
    criticalIssues,
  }
}

export function printAuditReport(report: AuditReport, verbose: boolean = false): void {
  console.log(chalk.blue.bold("\n📊 Agent Patterns Compliance Audit Report\n"))
  console.log(chalk.gray("Standards: rams.ai, ui-skills.com, Vercel Design Guidelines\n"))

  // Overall Summary
  const statusColor =
    report.overall.status === "compliant"
      ? chalk.green
      : report.overall.status === "partial"
      ? chalk.yellow
      : report.overall.status === "needs-improvement"
      ? chalk.orange
      : chalk.red

  console.log(chalk.bold("Overall Compliance:"))
  console.log(
    `  Status: ${statusColor(report.overall.status.toUpperCase())} (${chalk.bold(
      report.overall.compliance + "%"
    )})`
  )
  console.log()

  // Standards Summary
  console.log(chalk.bold("Standards Compliance:"))
  console.log(
    `  ${chalk.cyan("rams.ai")}: ${getComplianceColor(report.overall.standards["rams-ai"].compliance)(
      report.overall.standards["rams-ai"].compliance + "%"
    )} (${report.overall.standards["rams-ai"].count} patterns)`
  )
  console.log(
    `  ${chalk.cyan("ui-skills.com")}: ${getComplianceColor(
      report.overall.standards["ui-skills"].compliance
    )(report.overall.standards["ui-skills"].compliance + "%")} (${report.overall.standards["ui-skills"].count} patterns)`
  )
  console.log(
    `  ${chalk.cyan("Vercel Guidelines")}: ${getComplianceColor(
      report.overall.standards["vercel-guidelines"].compliance
    )(report.overall.standards["vercel-guidelines"].compliance + "%")} (${report.overall.standards["vercel-guidelines"].count} patterns)`
  )
  console.log()

  // Critical Issues
  if (report.criticalIssues.length > 0) {
    console.log(chalk.red.bold("🚨 Critical Issues:"))
    report.criticalIssues.forEach((issue) => {
      console.log(
        `  ${chalk.red("✗")} ${chalk.bold(issue.pattern)} (${issue.standard}): ${issue.issue}`
      )
    })
    console.log()
  }

  // Pattern Details
  if (verbose) {
    console.log(chalk.bold("Pattern Details:\n"))
    report.patterns.forEach((pattern) => {
      const statusColor =
        pattern.overallStatus === "compliant"
          ? chalk.green
          : pattern.overallStatus === "partial"
          ? chalk.yellow
          : pattern.overallStatus === "needs-improvement"
          ? chalk.orange
          : chalk.red

      console.log(chalk.bold(`  ${pattern.pattern}:`))
      console.log(`    Overall: ${statusColor(pattern.overallStatus.toUpperCase())} (${pattern.overallCompliance}%)`)

      if (pattern.standards["rams-ai"]) {
        const rams = pattern.standards["rams-ai"]
        console.log(
          `    ${chalk.cyan("rams.ai")}: ${getComplianceColor(rams.compliance)(rams.status)} (${rams.compliance}%)`
        )
      }

      if (pattern.standards["ui-skills"]) {
        const uiSkills = pattern.standards["ui-skills"]
        console.log(
          `    ${chalk.cyan("ui-skills.com")}: ${getComplianceColor(uiSkills.compliance)(
            uiSkills.status
          )} (${uiSkills.compliance}%)`
        )
      }

      if (pattern.standards["vercel-guidelines"]) {
        const vercel = pattern.standards["vercel-guidelines"]
        console.log(
          `    ${chalk.cyan("Vercel Guidelines")}: ${getComplianceColor(vercel.compliance)(
            vercel.status
          )} (${vercel.compliance}%)`
        )
      }

      if (pattern.notes) {
        console.log(`    ${chalk.gray("Note:")} ${chalk.gray(pattern.notes)}`)
      }

      console.log()
    })
  } else {
    console.log(chalk.bold("Patterns Summary:\n"))
    report.patterns.forEach((pattern) => {
      const statusColor =
        pattern.overallStatus === "compliant"
          ? chalk.green
          : pattern.overallStatus === "partial"
          ? chalk.yellow
          : pattern.overallStatus === "needs-improvement"
          ? chalk.orange
          : chalk.red

      const statusIcon =
        pattern.overallStatus === "compliant"
          ? "✓"
          : pattern.overallStatus === "partial"
          ? "⚠"
          : pattern.overallStatus === "needs-improvement"
          ? "⚠"
          : "✗"

      console.log(
        `  ${statusIcon} ${chalk.bold(pattern.pattern)}: ${statusColor(pattern.overallStatus)} (${pattern.overallCompliance}%)`
      )
    })
    console.log()
  }

  // Recommendations
  if (report.overall.compliance < 90) {
    console.log(chalk.yellow.bold("💡 Recommendations:"))
    console.log(
      "  Run with --verbose flag to see detailed compliance information for each pattern"
    )
    console.log("  Review compliance.json files in each pattern directory for specific issues")
    console.log("  See docs/COMPLIANCE_AUDIT.md for detailed audit findings")
    console.log()
  }
}

function getComplianceColor(compliance: number): (text: string) => string {
  if (compliance >= 90) return chalk.green
  if (compliance >= 70) return chalk.yellow
  if (compliance >= 50) return chalk.orange
  return chalk.red
}

