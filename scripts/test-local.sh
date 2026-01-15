#!/bin/bash

# Agent Patterns - Local Testing Script
# Run this from the root directory

set -e

echo "🚀 Agent Patterns - Local Testing"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm is not installed. Install it with: npm install -g pnpm${NC}"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    pnpm install
fi

# Build core package first
echo -e "${BLUE}🏗️  Building core package...${NC}"
cd packages/core
pnpm build
cd ../..

# Type check
echo -e "${BLUE}🔍 Type checking...${NC}"
pnpm typecheck || {
    echo -e "${RED}❌ Type check failed${NC}"
    exit 1
}

# Lint
echo -e "${BLUE}✅ Linting...${NC}"
pnpm lint || {
    echo -e "${RED}❌ Linting failed${NC}"
    exit 1
}

# Test
echo -e "${BLUE}🧪 Running tests...${NC}"
pnpm test || {
    echo -e "${RED}❌ Tests failed${NC}"
    exit 1
}

# Build all
echo -e "${BLUE}🏗️  Building all packages...${NC}"
pnpm build || {
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
}

echo ""
echo -e "${GREEN}✅ All checks passed!${NC}"
echo ""
echo "Next steps:"
echo "  • Playground:  cd apps/playground && pnpm dev"
echo "  • Docs:         cd apps/docs && pnpm dev"
echo "  • Sales Demo:   cd apps/examples/sales-dashboard && pnpm dev"
echo "  • Support Demo: cd apps/examples/customer-support && pnpm dev"
echo ""

