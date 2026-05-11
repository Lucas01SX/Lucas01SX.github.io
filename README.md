# Lucas Santana — Portfolio

Angular 21 portfolio showcasing backend architecture depth across .NET, TypeScript/NestJS, and Java stacks.

**Live:** https://lucas01sx.github.io

---

## Tech Stack

- **Framework:** Angular 21 (standalone components, signals)
- **Language:** TypeScript (strict mode)
- **Styles:** SCSS + BEM + CSS custom properties design tokens
- **Tests:** Vitest via `@analogjs/vitest-angular`
- **CI/CD:** GitHub Actions → GitHub Pages

---

## Commands

```bash
# Development server (http://localhost:4200)
npm start

# Run unit tests (watch mode)
npm test

# Run unit tests once (CI)
npm test -- --run

# Lint
npm run lint

# Production build
npm run build
```

---

## Branching Strategy

This project follows **Gitflow Lite** to demonstrate a professional development workflow:

| Branch | Purpose |
|---|---|
| `main` | Production — triggers GitHub Pages deploy |
| `develop` | Integration — all features merge here first |
| `feature/*` | Individual feature work branched from `develop` |
| `hotfix/*` | Critical fixes branched from `main`, merged into both `main` and `develop` |

**Flow:** `feature/*` → PR → `develop` → PR → `main` → auto-deploy

---

## Project Structure

```
src/app/
├── core/
│   ├── models/        ← TypeScript interfaces (Project, etc.)
│   └── services/      ← ProjectService (HTTP), ThemeService (signals)
├── features/
│   ├── home/          ← Landing page with 6 sections
│   └── projects/      ← Project list + detail with Mermaid diagrams
├── layout/            ← Header (theme toggle, nav) and Footer
└── shared/
    └── components/    ← MermaidDiagramComponent
public/
└── assets/data/
    └── projects.json  ← Static project catalog
```

---

## Architecture Diagrams

Each project card includes a Mermaid.js architecture diagram rendered client-side via dynamic import — no SSR dependency.

---

## CI Pipeline

Every push to `main` or `develop` and every PR targeting those branches runs:

1. **Lint** — ESLint + Prettier
2. **Test** — Vitest (89 tests)
3. **Build** — Angular production build

Merges to `main` additionally trigger the **Deploy** workflow to GitHub Pages.
