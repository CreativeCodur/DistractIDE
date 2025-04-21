@echo off
git add package.json
git add src/components/ui/ModernIcon.tsx
git add VERCEL_DEPLOYMENT.md
git commit -m "Fix build for Vercel deployment without breaking website"
git push
