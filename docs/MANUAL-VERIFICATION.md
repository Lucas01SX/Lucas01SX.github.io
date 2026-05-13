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

---

## M4 — Landing Sections

### Language toggle — active state and persistence

**Why it cannot be automated:** CSS active state rendering and localStorage integration require a browser.

**Expected behavior:** The active language button shows a blue background and white text. Inactive buttons show no highlight. After switching languages, the active style applies immediately without a page reload. Reloading the page restores the previously selected language. The full page content (nav, sections, form labels, error messages) re-renders in the selected language.

**How to verify:**
1. Open `http://localhost:4200` — confirm the default language button (EN or browser-detected) has a blue background
2. Click a different language button — confirm it immediately gets the blue background; the previous one loses it
3. Confirm page text changes to the selected language (check nav links, hero title, about heading)
4. Reload the page — confirm the selected language is restored and its button is still highlighted

**When to verify:** Before closing M4 and after any change to `LanguageService` or the header component.

---

### Contact form — validation, bot protection, and submission

**Why it cannot be automated:** Web3Forms submission hits a real third-party service; honeypot behavior and success/error UI states require browser interaction.

**Expected behavior:**
- Submitting an empty form shows required errors on all three fields immediately
- Short name (< 2 chars), invalid email format, and short message (< 10 chars) show specific inline errors
- Errors appear below the relevant field with a red border on the input
- The character counter next to the message field updates live (e.g., `42/2000`)
- A valid submission disables the button and shows "Sending…" while in flight
- On success, the form is replaced by a green success banner
- On network error, an error message appears next to the button without clearing the form

**How to verify:**
1. Open `http://localhost:4200` and scroll to Contact
2. Click "Send Message" without filling anything — confirm three error messages appear
3. Type a single character in Name — confirm "must be at least 2 characters" error
4. Type an invalid email (e.g., `abc`) — confirm "valid email" error
5. Type 5 characters in Message — confirm "at least 10 characters" error
6. Fill all fields correctly and submit — confirm the button disables during submission
7. On success: confirm the form is replaced by a green banner with the success message
8. Verify the same flow in each language (EN / PT-BR / ES)

**When to verify:** Before closing M4 and after any change to the contact component.

---

### All landing sections — visual rendering and responsive layout

**Why it cannot be automated:** Section layout, typography hierarchy, and visual hierarchy cannot be unit tested.

**Expected behavior:** All six sections (Hero, About, Engineering Approach, Tech Stack, Projects Preview, Contact) render without overflow or clipping. On mobile (375px), content stacks vertically and no horizontal scroll appears. CTA buttons in Hero link correctly to `#projects` and `#contact` anchors.

**How to verify:**
1. Open `http://localhost:4200`
2. Scroll through all sections — confirm no visual glitches, correct headings, readable text
3. Click "View Projects" and "Contact" CTAs — confirm smooth scroll to the correct section
4. Resize to 375px — confirm no horizontal scrollbar, content remains readable
5. Confirm the tech stack grid collapses to 2-column or 1-column on mobile
6. Confirm engineering approach pillars stack vertically on mobile

**When to verify:** Before closing M4.

---

## M5 — Projects Module

### Projects list page — rendering and navigation

**Why it cannot be automated:** Card grid layout and visual badge rendering require browser rendering.

**Expected behavior:** `/projects` renders a grid of project cards. Each card shows the project name, stack badges, and a status badge (In Progress / Planned / Complete). Clicking a card navigates to `/projects/:slug`.

**How to verify:**
1. Navigate to `http://localhost:4200/projects`
2. Confirm project cards are visible with name, stack badges, and status badge
3. Confirm status badge text is translated in the current language (EN / PT-BR / ES)
4. Click any card — confirm navigation to the detail page
5. Use the browser Back button — confirm return to `/projects`

**When to verify:** Before closing M5.

---

### Project detail page — Mermaid architecture diagram

**Why it cannot be automated:** Mermaid.js renders a diagram to SVG using browser APIs; the output cannot be asserted in unit tests.

**Expected behavior:** Each project detail page renders an architecture diagram. The diagram is visible (not a blank area), renders in the correct theme (dark/light), and no console errors appear related to Mermaid parsing.

**How to verify:**
1. Navigate to any `/projects/:slug` page
2. Confirm the architecture diagram is visible and readable
3. Open DevTools → Console — confirm no Mermaid parse errors
4. Toggle theme (dark ↔ light) — confirm the diagram re-renders with the correct color scheme
5. Resize to 375px — confirm the diagram scales or scrolls horizontally without breaking the layout

**When to verify:** Before closing M5 and after any change to `MermaidDiagramComponent`.

---

### Not Found page

**Why it cannot be automated:** Route resolution for unknown slugs requires browser navigation.

**Expected behavior:** Navigating to an unknown route (e.g., `/unknown-page`) renders a 404 page with a link back to home.

**How to verify:**
1. Navigate to `http://localhost:4200/unknown-route`
2. Confirm a "Not Found" page renders (not a blank page or error)
3. Confirm the link/button returns to the home page

**When to verify:** Before closing M5.

---

## M6 — Quality Pass

### Lighthouse scores

**Why it cannot be automated:** Lighthouse requires a real browser and network environment.

**Expected behavior:** On desktop, all four Lighthouse categories score ≥ 95. CLS ≤ 0.05 (currently 0.025 after SSR prerendering).

**How to verify:**
1. Open Chrome → Incognito mode → `https://lucas01sx.github.io`
2. Open DevTools → Lighthouse tab → select Desktop → Run audit
3. Confirm: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO ≥ 95, CLS ≤ 0.05

**When to verify:** Before each deploy to `main` and after any significant style or content change.

---

### OG tags and meta description

**Why it cannot be automated:** Meta tag content is not rendered in unit test DOM.

**Expected behavior:** The page has `og:title`, `og:description`, `og:image`, `og:url`, and `<meta name="description">` set with meaningful content.

**How to verify:**
1. Open `https://lucas01sx.github.io`
2. Open DevTools → Elements → search for `og:title` in `<head>`
3. Confirm all OG tags are present with non-empty content
4. Use https://opengraph.xyz or similar to preview the share card

**When to verify:** Before closing M6.

---

### SSR prerendering — HTML visible before JavaScript

**Why it cannot be automated:** Requires disabling JavaScript to observe prerendered HTML.

**Expected behavior:** With JavaScript disabled, the home page still shows readable content (hero title, nav links, section headings). This confirms the prerendered HTML is served, not a blank shell.

**How to verify:**
1. Open `https://lucas01sx.github.io` in Chrome
2. Open DevTools → Settings → Debugger → check "Disable JavaScript"
3. Reload the page
4. Confirm the hero section, navigation, and section headings are visible
5. Re-enable JavaScript

**When to verify:** After any change to `angular.json` outputMode or `app.routes.server.ts` render modes.
