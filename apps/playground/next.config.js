/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@agent-patterns/core",
    "@agent-patterns/metric-card",
    "@agent-patterns/data-table",
    "@agent-patterns/chart",
    "@agent-patterns/agent-form",
    "@agent-patterns/thinking-indicator",
    "@agent-patterns/insights-list",
    "@agent-patterns/detail-card",
  ],
}

module.exports = nextConfig


