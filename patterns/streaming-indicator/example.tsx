import { StreamingIndicator } from "./component"
import * as React from "react"

// Example 1: Dots variant
export function DotsIndicatorExample() {
  return <StreamingIndicator variant="dots" message="Loading..." />
}

// Example 2: Pulse variant
export function PulseIndicatorExample() {
  return <StreamingIndicator variant="pulse" message="Processing data..." />
}

// Example 3: Spinner variant
export function SpinnerIndicatorExample() {
  return <StreamingIndicator variant="spinner" message="Generating report..." />
}

// Example 4: Typing indicator (for AI chat)
export function TypingIndicatorExample() {
  return <StreamingIndicator variant="typing" />
}

// Example 5: Progress indicator with steps
export function ProgressIndicatorExample() {
  const [steps, setSteps] = React.useState([
    { label: "Analyzing input...", status: "completed" as const },
    { label: "Generating response...", status: "active" as const },
    { label: "Formatting output...", status: "pending" as const },
  ])

  // Simulate progress
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSteps([
        { label: "Analyzing input...", status: "completed" },
        { label: "Generating response...", status: "completed" },
        { label: "Formatting output...", status: "active" },
      ])
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return <StreamingIndicator variant="progress" steps={steps} />
}

// Example 6: With token counter
export function TokenCounterIndicatorExample() {
  const [tokenCount, setTokenCount] = React.useState(0)

  // Simulate token counting
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTokenCount((prev) => prev + Math.floor(Math.random() * 10) + 5)
    }, 100)

    const timeout = setTimeout(() => {
      clearInterval(interval)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <StreamingIndicator
      variant="dots"
      message="Generating response..."
      tokenCount={tokenCount}
      showTokenCounter
    />
  )
}

// Example 7: Complete AI workflow with progress
export function CompleteAIWorkflowExample() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [tokenCount, setTokenCount] = React.useState(0)

  const stepLabels = [
    "Analyzing your request...",
    "Searching knowledge base...",
    "Generating response...",
    "Formatting output...",
  ]

  const steps = stepLabels.map((label, index) => ({
    label,
    status:
      index < currentStep
        ? ("completed" as const)
        : index === currentStep
        ? ("active" as const)
        : ("pending" as const),
  }))

  // Simulate workflow progress
  React.useEffect(() => {
    if (currentStep < stepLabels.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [currentStep, stepLabels.length])

  // Simulate token counting during generation step
  React.useEffect(() => {
    if (currentStep === 2) {
      const interval = setInterval(() => {
        setTokenCount((prev) => prev + Math.floor(Math.random() * 15) + 5)
      }, 100)

      const timeout = setTimeout(() => {
        clearInterval(interval)
      }, 2000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [currentStep])

  return (
    <StreamingIndicator
      variant="progress"
      steps={steps}
      tokenCount={tokenCount}
      showTokenCounter={currentStep === 2}
    />
  )
}

// Example 8: Multiple indicators in a dashboard
export function DashboardIndicatorsExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StreamingIndicator variant="dots" message="Loading analytics..." />
      <StreamingIndicator variant="pulse" message="Syncing data..." />
      <StreamingIndicator variant="spinner" message="Generating insights..." />
      <StreamingIndicator variant="typing" />
    </div>
  )
}

// Example 9: Conditional rendering based on state
export function ConditionalIndicatorExample() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4">
      {isLoading ? (
        <StreamingIndicator
          variant="dots"
          message="Loading data..."
        />
      ) : (
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-foreground">Data loaded successfully!</p>
        </div>
      )}
    </div>
  )
}

export default DotsIndicatorExample
