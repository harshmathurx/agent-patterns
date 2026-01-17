#!/usr/bin/env node

/**
 * Compliance Validation Script
 * 
 * Validates all pattern compliance.json files against standards.
 * Can be used in CI/CD pipelines to ensure compliance.
 * 
 * Usage:
 *   tsx scripts/validate-compliance.ts
 *   tsx scripts/validate-compliance.ts --min-compliance 80
 */

import { readFileSync, readdirSync, statSync, existsSync } from "fs-extra"
import { join } from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
}

interface StandardCompliance {
  status: "compliant" | "partial" | "needs-improvement" | "non-compliant"
  compliance: number
}

function validateCompliance(minCompliance: number = 70): boolean {
  const patternsPath = join(__dirname, "../patterns")
  
  if (!existsSync(patternsPath)) {
    console.error(`✗ Patterns directory not found: ${patternsPath}`)
    process.exit(1)
  }

  const patterns = readdirSync(patternsPath).filter((item) => {
    const itemPath = join(patternsPath, item)
    return statSync(itemPath).isDirectory()
  })

  let allValid = true
  const failures: Array<{ pattern: string; reason: string }> = []

  for (const pattern of patterns) {
    const compliancePath = join(patternsPath, pattern, "compliance.json")
    
    if (!existsSync(compliancePath)) {
      console.warn(`⚠ No compliance.json found for pattern: ${pattern}`)
      failures.push({ pattern, reason: "Missing compliance.json" })
      allValid = false
      continue
    }

    try {
      const complianceContent = readFileSync(compliancePath, "utf-8")
      const compliance: ComplianceData = JSON.parse(complianceContent)

      // Validate overall compliance
      if (compliance.overallCompliance < minCompliance) {
        failures.push({
          pattern: compliance.pattern,
          reason: `Overall compliance ${compliance.overallCompliance}% is below minimum ${minCompliance}%`,
        })
        allValid = false
      }

      // Validate each standard
      if (compliance.standards["rams-ai"]) {
        const rams = compliance.standards["rams-ai"]
        if (rams.compliance < minCompliance) {
          failures.push({
            pattern: compliance.pattern,
            reason: `rams.ai compliance ${rams.compliance}% is below minimum ${minCompliance}%`,
          })
          allValid = false
        }
      }

      if (compliance.standards["ui-skills"]) {
        const uiSkills = compliance.standards["ui-skills"]
        if (uiSkills.compliance < minCompliance) {
          failures.push({
            pattern: compliance.pattern,
            reason: `ui-skills.com compliance ${uiSkills.compliance}% is below minimum ${minCompliance}%`,
          })
          allValid = false
        }
      }

      if (compliance.standards["vercel-guidelines"]) {
        const vercel = compliance.standards["vercel-guidelines"]
        if (vercel.compliance < minCompliance) {
          failures.push({
            pattern: compliance.pattern,
            reason: `Vercel Guidelines compliance ${vercel.compliance}% is below minimum ${minCompliance}%`,
          })
          allValid = false
        }
      }
    } catch (error) {
      console.error(`✗ Error reading compliance.json for ${pattern}: ${error}`)
      failures.push({ pattern, reason: `Error parsing compliance.json: ${error}` })
      allValid = false
    }
  }

  if (!allValid) {
    console.error("\n✗ Compliance validation failed:\n")
    failures.forEach((failure) => {
      console.error(`  ${failure.pattern}: ${failure.reason}`)
    })
    return false
  }

  console.log(`✓ All patterns meet minimum compliance threshold (${minCompliance}%)`)
  return true
}

// Parse command line arguments
const args = process.argv.slice(2)
const minComplianceArg = args.find((arg) => arg.startsWith("--min-compliance"))
const minCompliance = minComplianceArg
  ? parseInt(minComplianceArg.split("=")[1] || "70", 10)
  : 70

const isValid = validateCompliance(minCompliance)
process.exit(isValid ? 0 : 1)

