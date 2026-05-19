# COBOL Quest

A gamified, interactive platform for learning COBOL, styled with a high-fantasy **Technomancer** aesthetic.

[**Live demo on davidcole.cloud →**](https://davidcole.cloud/DEMO/cobol-quest/)

## Features

- **Interactive grimoire** — Monaco editor with COBOL rituals from Identification Division through DB2 and CICS
- **Progression** — level up your Technomancer class, logic, memory, and legacy XP
- **Story-driven quests** — 17+ artifact levels with lore, hints, and mainframe map
- **Validation** — client-side puzzle checks plus shared ritual rules
- **Static demo mode** — portfolio build saves progress in `localStorage` (no database required)

## Tech stack

- Next.js 14, React, Tailwind CSS, Framer Motion, Monaco Editor
- Prisma + SQLite for full local dev (API routes)
- Custom regex COBOL validators

## Getting started (full stack)

```bash
git clone https://github.com/davidthegnomad/COBOL_QUEST_Webapp.git
cd COBOL_QUEST_Webapp
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

Open http://localhost:3000

## Portfolio static demo

For davidcole.cloud (GitHub Pages — no server):

```bash
npm run build:site-demo    # → out/ with base /DEMO/cobol-quest/
npm run sync:site-demo     # copies into ../Website-Stuff/public/DEMO/cobol-quest/
```

## License

MIT © 2026 David the Gnomad Inc.
