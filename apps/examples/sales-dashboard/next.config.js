/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@agent-patterns/core",
    "@agent-patterns/metric-card",
    "@agent-patterns/chart",
    "@agent-patterns/data-table",
    "@agent-patterns/insights-list",
  ],
}

module.exports = nextConfig


