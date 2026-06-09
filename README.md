# Lucas Santana — Portfolio

Angular 21 portfolio showcasing a full-stack helpdesk platform.

**Live:** https://lucas01sx.github.io

---

## Projects

| Project | Stack | Repo |
|---|---|---|
| **Helpdesk API** | C# .NET 10 · ASP.NET Core · EF Core · PostgreSQL | [helpdesk-platform-dotnet](https://github.com/Lucas01SX/helpdesk-platform-dotnet) |
| **Helpdesk Web** | Angular 21 · TypeScript · SCSS · Signals | [helpdesk-web-angular](https://github.com/Lucas01SX/helpdesk-web-angular) |

---

## Tech Stack

- **Framework:** Angular 21 (standalone components, signals)
- **Language:** TypeScript (strict mode)
- **Styles:** SCSS + CSS custom properties design tokens
- **Tests:** Vitest via `@angular/build:unit-test`
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

| Branch | Purpose |
|---|---|
| `main` | Production — triggers GitHub Pages deploy |
| `develop` | Integration — all features merge here first |
| `feature/*` | Individual feature work branched from `develop` |
| `hotfix/*` | Critical fixes branched from `main` |

**Flow:** `feature/*` → PR → `develop` → PR → `main` → auto-deploy

---

## CI Pipeline

Every push to `main` or `develop` and every PR targeting those branches runs:

1. **Lint** — ESLint + Prettier
2. **Test** — Vitest
3. **Build** — Angular production build

Merges to `main` additionally trigger the **Deploy** workflow to GitHub Pages.
