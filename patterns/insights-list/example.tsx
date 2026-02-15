import { InsightsList } from "./component"

// Sample insights data
const sampleInsights = [
  {
    id: "1",
    title: "Revenue increased by 25%",
    description: "Your monthly recurring revenue has grown significantly compared to last month.",
    type: "success" as const,
    priority: "high" as const,
  },
  {
    id: "2",
    title: "High bounce rate on landing page",
    description: "Users are leaving your landing page quickly. Consider reviewing the content and call-to-action.",
    type: "warning" as const,
    priority: "high" as const,
  },
  {
    id: "3",
    title: "New users from organic search",
    description: "Your SEO efforts are paying off with 45% more organic traffic this week.",
    type: "info" as const,
    priority: "medium" as const,
  },
  {
    id: "4",
    title: "Payment gateway downtime detected",
    description: "There was a 15-minute outage in the payment processing system. Customer support has been notified.",
    type: "error" as const,
    priority: "high" as const,
  },
]

// Example 1: Basic insights list
export function BasicInsightsListExample() {
  return <InsightsList insights={sampleInsights} />
}

// Example 2: With filters
export function FilteredInsightsListExample() {
  return <InsightsList insights={sampleInsights} showFilters />
}

// Example 3: With priority sorting
export function SortedInsightsListExample() {
  return <InsightsList insights={sampleInsights} sortByPriority showFilters />
}

// Example 4: Collapsible insights
export function CollapsibleInsightsListExample() {
  const collapsibleInsights = [
    {
      id: "1",
      title: "Detailed Performance Analysis",
      description:
        "Your application has shown remarkable performance improvements over the past quarter. Key metrics include: 35% reduction in page load times, 50% decrease in error rates, 25% improvement in user engagement, and 40% increase in conversion rates. These improvements are primarily attributed to the recent infrastructure upgrades and code optimizations implemented by the engineering team.",
      type: "success" as const,
      collapsible: true,
    },
    {
      id: "2",
      title: "Security Recommendations",
      description:
        "Several security vulnerabilities have been identified in your current implementation. We recommend: updating all dependencies to their latest versions, implementing two-factor authentication for all admin accounts, reviewing and updating your API rate limiting policies, conducting a comprehensive security audit, and implementing automated security scanning in your CI/CD pipeline.",
      type: "warning" as const,
      collapsible: true,
      priority: "high" as const,
    },
  ]

  return <InsightsList insights={collapsibleInsights} />
}

// Example 5: With action buttons
export function InsightsWithActionsExample() {
  const insightsWithActions = [
    {
      id: "1",
      title: "Payment failed for subscription",
      description: "Customer ID #12345's payment failed. Their subscription is at risk of cancellation.",
      type: "error" as const,
      priority: "high" as const,
      actions: [
        {
          label: "View Customer",
          onClick: () => alert("Navigating to customer profile..."),
        },
        {
          label: "Retry Payment",
          onClick: () => alert("Retrying payment..."),
        },
        {
          label: "Contact Customer",
          onClick: () => alert("Opening email composer..."),
        },
      ],
    },
    {
      id: "2",
      title: "New feature opportunity identified",
      description: "Based on user feedback analysis, there's strong demand for dark mode support.",
      type: "info" as const,
      priority: "medium" as const,
      actions: [
        {
          label: "View Feedback",
          onClick: () => alert("Showing feedback details..."),
        },
        {
          label: "Create Task",
          onClick: () => alert("Creating development task..."),
        },
      ],
    },
  ]

  return <InsightsList insights={insightsWithActions} sortByPriority />
}

// Example 6: Mixed priority with filters
export function CompleteInsightsExample() {
  const allInsights = [
    {
      id: "1",
      title: "Critical: Database backup failed",
      description: "The automated database backup process failed last night. Immediate action required.",
      type: "error" as const,
      priority: "high" as const,
      actions: [
        { label: "Run Backup Now", onClick: () => console.log("Running backup...") },
        { label: "View Logs", onClick: () => console.log("Showing logs...") },
      ],
    },
    {
      id: "2",
      title: "API rate limit approaching",
      description: "Your current API usage is at 85% of the monthly limit. Consider upgrading your plan.",
      type: "warning" as const,
      priority: "high" as const,
      actions: [
        { label: "View Usage", onClick: () => console.log("Showing usage...") },
        { label: "Upgrade Plan", onClick: () => console.log("Upgrading...") },
      ],
    },
    {
      id: "3",
      title: "Successful deployment",
      description: "Version 2.1.0 has been deployed to production successfully with zero downtime.",
      type: "success" as const,
      priority: "medium" as const,
    },
    {
      id: "4",
      title: "Cache hit rate improved",
      description: "Redis cache hit rate has increased to 92%, resulting in faster response times.",
      type: "success" as const,
      priority: "low" as const,
    },
    {
      id: "5",
      title: "New integration available",
      description: "Slack integration is now available for real-time notifications. Enable it in settings.",
      type: "info" as const,
      priority: "low" as const,
      actions: [
        { label: "Enable Integration", onClick: () => console.log("Enabling Slack...") },
        { label: "Learn More", onClick: () => console.log("Showing docs...") },
      ],
    },
  ]

  return (
    <InsightsList
      insights={allInsights}
      showFilters
      sortByPriority
    />
  )
}

// Example 7: Empty state
export function EmptyInsightsListExample() {
  return (
    <InsightsList
      insights={[]}
      emptyMessage="No insights available yet. Check back later!"
    />
  )
}

export default BasicInsightsListExample
