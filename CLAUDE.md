# Kairos Website — Kairos Performance Sub-Project

This is the marketing website for Kairos Performance (kairosperformance.ai).

## Parent Context
- This repo lives at `C:\dev\kairos-website`, outside the Kairos workspace (kept out of the Google Drive mirror). The workspace is at `C:\Users\BryanMoynihan\Documents\Kairos`.
- Read `C:\Users\BryanMoynihan\Documents\Kairos\CLAUDE.md` for the WAT framework and operating instructions
- Read `C:\Users\BryanMoynihan\Documents\Kairos\memories\work-preferences.md` for preferences and lessons learned
- Skim recent `C:\Users\BryanMoynihan\Documents\Kairos\memories\daily-changelog\` for session context

## Tech Stack
- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, Framer Motion
- **Deployment:** Vercel

## Design System
- Dark theme: bg `#0a0a0a`, text `#f0ede8`, muted `#c0bdb8`, border `#1f1f1f`
- Font: Geist Sans
- Accent colors: teal/cyan for CTAs
- Visual style: neural mesh hero, clean/modern, anti-"AI slop"

## Key Directories
- `app/` — Next.js App Router pages and API routes
- `components/` — Reusable React components
- `public/` — Static assets

## Verification
- Use Puppeteer to screenshot pages after visual changes
- Run `npm run build` to verify no build errors before presenting work
