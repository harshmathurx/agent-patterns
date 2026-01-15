import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.config.*",
        "**/example.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@agent-patterns/core": path.resolve(__dirname, "./packages/core/src"),
    },
  },
})

