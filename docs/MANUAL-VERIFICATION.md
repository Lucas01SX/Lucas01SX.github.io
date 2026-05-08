# Manual Verification Checklist

Behaviors that cannot be automated. Each must be verified before marking the milestone done.

---

## M1 — Bootstrap

### Dark mode visual rendering

**Why it cannot be automated:** CSS custom properties and visual color values cannot be meaningfully asserted in unit tests.

**Expected behavior:** Page renders with dark background (`#0a0a0f`), light text (`#e2e8f0`), and electric blue accent (`#3b82f6`). Toggle button switches to light theme (`#f8fafc` background, `#0f172a` text).

**How to verify:**
1. Run `npm start` and open `http://localhost:4200`
2. Confirm background is dark (near black)
3. Confirm text is readable (light gray/white)
4. Trigger `toggleTheme()` (via DevTools: `window.__theme?.toggle()` or add a temp button)
5. Confirm background switches to near white, text switches to near black
6. Reload page — confirm theme persists (restored from localStorage)

**When to verify:** Before closing M1.

---

### Font rendering — Inter and JetBrains Mono

**Why it cannot be automated:** Font loading and rendering depend on the browser environment.

**Expected behavior:** Body text renders in Inter (sans-serif). Code elements render in JetBrains Mono (monospace).

**How to verify:**
1. Open `http://localhost:4200`
2. Open DevTools → Elements → select `<body>`
3. Computed styles → `font-family` should show `Inter`
4. Select any `<code>` element → `font-family` should show `JetBrains Mono`

**When to verify:** Before closing M1.

---

### ESLint pre-commit hook

**Why it cannot be automated:** Husky hooks run in a shell context that Vitest cannot simulate.

**Expected behavior:** Committing a file with an ESLint violation is blocked. The error message is shown and the commit does not complete.

**How to verify:**
1. Introduce a deliberate ESLint error in any `.ts` file (e.g., declare an unused variable)
2. Stage the file: `git add <file>`
3. Attempt to commit: `git commit -m "test"`
4. Confirm the commit is rejected with an ESLint error message
5. Fix the error, re-stage, and confirm the commit succeeds

**When to verify:** Before closing M1.

---

### CI pipeline on GitHub

**Why it cannot be automated:** The pipeline requires a GitHub repository and Actions runner.

**Expected behavior:** Pushing to `main` triggers the CI workflow. All three steps (lint, test, build) pass and show green in the Actions tab.

**How to verify:**
1. Push the branch to `github.com/Lucas01SX/Lucas01SX.github.io`
2. Open the repository → Actions tab
3. Confirm the workflow runs and all steps pass

**When to verify:** After creating the GitHub repository.

---

## M2 — App Shell

### Header and footer visual rendering

**Why it cannot be automated:** CSS layout, spacing, colors, and visual hierarchy cannot be asserted in unit tests.

**Expected behavior:** Header shows logo "Lucas Santana" on the left, nav links (Home, Projects, Contact) in the center/right, and a theme toggle button. Footer shows copyright text and GitHub/LinkedIn links. Both use the surface color (`--color-surface`) with a border separator.

**How to verify:**
1. Run `npm start` and open `http://localhost:4200`
2. Confirm header is visible at the top with logo, nav, and toggle button
3. Confirm footer is visible at the bottom with copyright and social links
4. Confirm main content area fills the space between header and footer

**When to verify:** Before closing M2.

---

### Theme toggle button in header

**Why it cannot be automated:** Visual state change (button label, colors) requires a browser render.

**Expected behavior:** Clicking the toggle button in the header switches between dark and light themes. The button label changes between "Light" and "Dark" to reflect the next action. The full page background and text colors change accordingly.

**How to verify:**
1. Open `http://localhost:4200` — default is dark theme, button shows "Light"
2. Click the toggle — page switches to light theme, button shows "Dark"
3. Click again — page switches back to dark, button shows "Light"
4. Reload — theme is restored from localStorage

**When to verify:** Before closing M2.

---

### Responsive layout

**Why it cannot be automated:** CSS media queries and visual breakpoints cannot be asserted in unit tests.

**Expected behavior:** On mobile (< 640px), the header layout adapts. Nav links remain accessible. Footer stacks or adjusts gracefully. No horizontal overflow.

**How to verify:**
1. Open `http://localhost:4200`
2. Open DevTools → Toggle device toolbar → set width to 375px (iPhone)
3. Confirm no horizontal scrollbar
4. Confirm header logo and nav links are visible and readable
5. Confirm footer content is visible

**When to verify:** Before closing M2.

---

## M3 — Design Foundation

### Dark and light theme visual completeness

**Why it cannot be automated:** CSS custom property values and computed colors cannot be asserted in unit tests.

**Expected behavior:** Both themes render correctly across all current surfaces. Dark: near-black background (`#0a0a0f`), dark surface (`#111118`), light text (`#e2e8f0`), blue accent (`#3b82f6`). Light: off-white background (`#f8fafc`), white surface, dark text (`#0f172a`), darker blue accent (`#2563eb`). Header and footer borders are visible in both themes. No FOUC (flash of unstyled content) on load or theme switch.

**How to verify:**
1. Run `npm start` and open `http://localhost:4200`
2. Confirm dark theme defaults on first load — background, text, header, footer colors correct
3. Click theme toggle — confirm full page switches to light theme, all surfaces update
4. Open DevTools → Elements → `<html>` → confirm `data-theme` attribute changes on toggle
5. Inspect any text element → Computed styles → confirm correct `color` value for the active theme

**When to verify:** Before closing M3.

---

### Sticky header behavior

**Why it cannot be automated:** `position: sticky` scroll behavior requires a browser environment.

**Expected behavior:** The header stays fixed at the top of the viewport as the user scrolls down the page. Content scrolls behind it, not above it.

**How to verify:**
1. Open `http://localhost:4200`
2. Add enough content to the home component to allow scrolling (or reduce viewport height)
3. Scroll down — confirm header remains visible and pinned at the top
4. Confirm no content overlap or z-index issues

**When to verify:** Before closing M3.

---

### Container and section layout

**Why it cannot be automated:** Visual centering and max-width layout require browser rendering.

**Expected behavior:** Content sections are centered with a max-width of 1100px. On desktop they are centered with padding. On mobile (< 640px) the padding reduces to `--space-4`.

**How to verify:**
1. Open `http://localhost:4200` on a wide screen (> 1100px)
2. Apply `.container` and `.section` classes to a test element — confirm horizontal centering and max-width
3. Resize to 375px width — confirm padding shrinks, no horizontal scroll

**When to verify:** When first content section using `.container` is added in M4.
