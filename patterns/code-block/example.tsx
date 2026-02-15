import { CodeBlock } from "./component"

export default function CodeBlockExample() {
  const typescriptCode = `import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}`

  const pythonCode = `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Generate first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`

  const jsonCode = `{
  "name": "@agent-patterns/code-block",
  "version": "0.1.0",
  "dependencies": {
    "react": "^18.2.0",
    "zod": "^3.22.4"
  }
}`

  return (
    <div className="space-y-8 rounded-lg border border-border bg-background p-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">TypeScript with Filename</h3>
        <CodeBlock
          code={typescriptCode}
          language="typescript"
          filename="Counter.tsx"
          highlightLines={[3, 4, 5]}
        />
      </div>

      <div className="border-t border-border pt-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Python with Line Numbers</h3>
        <CodeBlock
          code={pythonCode}
          language="python"
          filename="fibonacci.py"
          highlightLines={[2, 3, 4]}
        />
      </div>

      <div className="border-t border-border pt-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">JSON (Collapsible)</h3>
        <CodeBlock
          code={jsonCode}
          language="json"
          filename="package.json"
          collapsible
          showLineNumbers={false}
        />
      </div>

      <div className="border-t border-border pt-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">No Line Numbers</h3>
        <CodeBlock
          code="npm install @agent-patterns/code-block"
          language="bash"
          showLineNumbers={false}
        />
      </div>
    </div>
  )
}

