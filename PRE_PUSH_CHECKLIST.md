# Pre-Push Checklist

Before pushing to GitHub, verify the following:

## ✅ Files to Commit

- [ ] Source code (all `.ts`, `.tsx`, `.js`, `.jsx` files)
- [ ] Configuration files (`package.json`, `tsconfig.json`, etc.)
- [ ] Documentation (`README.md`, `CONTRIBUTING.md`, etc.)
- [ ] License file (`LICENSE`)
- [ ] `.gitignore` and `.gitattributes`
- [ ] GitHub templates (`.github/` folder)
- [ ] `pnpm-lock.yaml` (should be committed)

## ❌ Files to NOT Commit

- [ ] `node_modules/` (anywhere in the repo)
- [ ] `.next/` directories (Next.js build outputs)
- [ ] `dist/` directories (build outputs)
- [ ] `.env` files
- [ ] `*.tsbuildinfo` files
- [ ] `.DS_Store` or other OS files
- [ ] IDE configuration (`.vscode/`, `.idea/`)
- [ ] Log files (`*.log`)
- [ ] Cache directories (`.cache/`, `.turbo/`)

## 🔍 Verification Commands

Run these before pushing:

```bash
# Check what will be committed
git status

# Verify no node_modules are tracked
git ls-files | grep node_modules

# Verify no .next directories are tracked
git ls-files | grep "\.next"

# Verify no build outputs are tracked
git ls-files | grep -E "(dist|build|\.tsbuildinfo)"

# Verify no env files are tracked
git ls-files | grep "\.env"

# Check file sizes (shouldn't have huge files)
git ls-files -z | xargs -0 du -h | sort -h | tail -20
```

## 📦 Expected Repository Structure

```
agent-patterns/
├── .github/              ✅ Commit
├── apps/                 ✅ Commit (source only, no .next/)
├── packages/             ✅ Commit (source only, no dist/)
├── patterns/             ✅ Commit (all files)
├── scripts/              ✅ Commit
├── instructions/         ✅ Commit
├── *.md                  ✅ Commit
├── package.json          ✅ Commit
├── pnpm-lock.yaml        ✅ Commit
├── tsconfig*.json        ✅ Commit
├── .gitignore            ✅ Commit
├── .gitattributes        ✅ Commit
└── LICENSE               ✅ Commit
```

## 🚀 Ready to Push?

Once all checks pass:

```bash
# Add all files (respects .gitignore)
git add .

# Review what's staged
git status

# Commit
git commit -m "feat: initial commit - Agent Patterns MVP"

# Push to GitHub
git push origin main
```

