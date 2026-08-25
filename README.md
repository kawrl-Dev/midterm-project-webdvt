# 💸 Personal Budget Tracker 💸

A multi-page **Personal Budget Tracker** built with **React**, **React Router**, and **React-Bootstrap**. Users can log income and expense transactions, categorize them, filter and paginate their history, view spending summaries broken down by category, switch between light and dark themes, and personalize the app's brand name — all persisted via `localStorage` and applied consistently across the entire app via Context.

---

## Requirements

- Node.js 18+
- npm (or yarn/pnpm)

---

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kawrl-Dev/midterm-project-webdvt.git
   cd midterm-project-webdvt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the dev server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

---

## Pages

| Page                  | Route                |
|------------------------|----------------------|
| Dashboard (Home)       | `/dashboard`         |
| Add Transaction        | `/add-transaction`   |
| Transaction Detail     | `/transaction/:id`   |
| Summary                | `/summary`           |

### Dashboard Flow

1. Lists all logged transactions as cards, paginated and responsive (3/6/9 items per page depending on screen width).
2. Supports filtering by category and by type (Income / Expense) via a sidebar on desktop and an off-canvas panel on mobile; filter selections persist to `localStorage`.
3. Displays the current balance (total income minus total expenses), colored green/red depending on sign.
4. Each transaction card links to its own Transaction Detail page.
5. Distinguishes between "no transactions at all" and "no transactions match the current filters" with separate empty states.

### Add Transaction Flow

1. A shared `TransactionForm` collects **Description**, **Amount**, **Date**, **Type** (Income/Expense), and **Category**.
2. Required fields are validated via Bootstrap's `Form` validation before submission.
3. On success, a dismissible confirmation alert appears; closing it returns the user to the Dashboard.

### Transaction Detail Flow

1. Accessed via its own URL (`/transaction/:id`), showing the full details of a single transaction.
2. Allows editing the transaction's details in place, reusing `TransactionForm`.
3. Allows deleting the transaction, guarded by a confirmation modal.
4. Gracefully handles a missing/already-deleted transaction ID with a fallback message and a link back to the Dashboard.

### Summary Flow

1. Shows an overview of income vs. expenses as a percentage of total cash flow, visualized as fill-level "jars."
2. Breaks down expenses and income by category using a segmented (proportional) bar with a color-coded legend for each category.
3. Includes the light/dark theme toggle in the site footer — the choice applies app-wide, not just on this page.

### Brand Name Personalization

1. The app's name is shown in the navigation bar and browser tab title, defaulting to "My Budget Tracker."
2. Clicking the edit icon next to the brand name opens a modal where the user can type a custom name (max 25 characters, with a live character counter).
3. The custom name is persisted to `localStorage` and applied app-wide via `BrandContext`, and can be reset back to the default at any time.
4. An inline script in `index.html` reads the stored brand name and sets the document title before first paint, avoiding a flash of the default title.

---

## Architecture

- **Routing** — `react-router` defines each page above as its own real route with a distinct URL (no conditionally-rendered "fake" pages), plus a redirect from `/` to `/dashboard`.
- **Theme (Context API)** — Theme state lives in `context/theme-context.js` (the `createContext` + `useTheme` hook) and is provided by `ThemeContext.jsx`, which manages light/dark mode app-wide, persists the active theme to `localStorage`, applies it via the `data-bs-theme` attribute, and derives themed wave accent colors for the animated footer. An inline script in `index.html` sets the theme before first paint to prevent a flash of the wrong theme.
- **Brand Name (Context API)** — `context/brand-context.js` (the `createContext` + `useBrand` hook) is provided by `BrandContext.jsx`, which manages the custom app/brand name shown in the navbar and browser tab, persists it to `localStorage`, keeps `document.title` in sync, and enforces a max length with a reset-to-default option.
- **Custom Hooks**:
  - `useTransactions` — single source of truth for reading/writing transactions to `localStorage`, exposing CRUD helpers (`addTransaction`, `updateTransaction`, `deleteTransaction`, `getTransactionById`) plus memoized `income`/`expense`/`balance` totals.
  - `useTransactionFilters` — manages category/type filter state, persists it to `localStorage`, and exposes a `hasActiveFilters` flag.
  - `usePagination` — generic pagination over any item list, clamping the current page down (never resetting to page 1) when the list shrinks.
  - `useResponsiveItemsPerPage` — adjusts items-per-page to match the Dashboard's responsive card grid breakpoints.
- **Performance Optimization** — `TransactionCard` and `FilterSidebar` are wrapped in `React.memo` to avoid unnecessary re-renders when unrelated Dashboard state changes; hook-exposed callbacks (`addTransaction`, `updateTransaction`, etc.) are wrapped in `useCallback` so they keep stable references across renders.
- **Styling** — `react-bootstrap` for layout/components, with custom CSS (`global.css`, `NavigationBar.css`, `Dashboard.css`, `TransactionCard.css`, `TransactionDetails.css`, `Summary.css`, `SegmentedBar.css`, `Jar.css`) layered on top for theme-aware accents, hover effects, and the category "jar"/segmented-bar visualizations.
- **PWA-ready** — `vite-plugin-pwa` and `workbox-window` are included as dependencies to support installability and offline caching.

---

## Project Structure

```
midterm-project-webdevt/
│
├── index.html                      Vite entry HTML; sets initial theme and stored brand name before paint to avoid flashes.
├── package.json
│
└── src/
    │
    ├── main.jsx                    React app entry point; mounts <App /> in StrictMode.
    ├── App.jsx                     Route definitions and top-level layout (nav, footer, routed content).
    │
    ├── components/
    │   ├── NavigationBar.jsx       Top navigation with links to Dashboard and Summary; hosts the editable brand name modal.
    │   ├── WebsiteFooter.jsx       Animated multilayer wave footer; hosts the theme toggle.
    │   ├── ThemeToggle.jsx         Sun/moon button that flips light/dark mode via ThemeContext.
    │   ├── TransactionForm.jsx     Shared form fields used by both Add and Edit flows.
    │   ├── TransactionCard.jsx     Memoized card summarizing a single transaction; links to its detail page.
    │   ├── FilterSidebar.jsx       Memoized category/type filter controls (desktop sidebar + mobile off-canvas).
    │   ├── PaginationControls.jsx  Bootstrap pagination bar driven by usePagination.
    │   ├── Jar.jsx                 Animated fill-level "jar" used for the Summary overview (income vs. expense).
    │   ├── SegmentedBar.jsx        Proportional segmented bar + legend used for the Summary category breakdown.
    │   └── Separator.jsx           Simple themed horizontal rule.
    │
    ├── context/
    │   ├── ThemeContext.jsx        Theme Context provider; persists theme to localStorage and
    │   │                           derives wave accent colors per theme.
    │   ├── theme-context.js        Theme Context definition + `useTheme` hook (kept separate for Fast Refresh compatibility).
    │   ├── BrandContext.jsx        Brand name Context provider; persists custom brand name to localStorage and syncs document.title.
    │   └── brand-context.js        Brand Context definition + `useBrand` hook.
    │
    ├── hooks/
    │   ├── useTransactions.js          CRUD + localStorage persistence for transactions.
    │   ├── useTransactionFilters.js    Category/type filter state + persistence.
    │   ├── usePagination.js            Generic pagination logic.
    │   └── useResponsiveItemsPerPage.js  Responsive items-per-page for the Dashboard grid.
    │
    ├── constants/
    │   └── categories.js           Shared list of transaction categories.
    │
    ├── pages/
    │   ├── Dashboard.jsx           Transaction list, filtering, pagination, and current balance.
    │   ├── AddTransaction.jsx      Form to log a new transaction with validation.
    │   ├── TransactionDetails.jsx  Full detail view with edit/delete.
    │   └── Summary.jsx             Spending/income breakdown by category, plus theme toggle.
    │
    └── css/
        ├── global.css              App-wide base styles and theme CSS variables.
        ├── NavigationBar.css       Theme-aware nav bar styling.
        ├── Dashboard.css           Dashboard header, balance, and button styling.
        ├── TransactionCard.css     Hover/transition styling for transaction cards.
        ├── TransactionDetails.css  Responsive button-group styling for the detail view.
        ├── Summary.css             Summary page title styling.
        ├── SegmentedBar.css        Segmented bar and legend styling for category breakdowns.
        └── Jar.css                 Mason-jar visualization styling.
```

---

## Status

All originally planned features have been implemented:

- [x] `Transaction Detail` page (`/transaction/:id`) — view, edit, and delete a single transaction
- [x] `Summary` page — spending/income breakdown by category
- [x] Custom hook for reading/writing transactions to persistent storage
- [x] Category and type (Income/Expense) filtering on the Dashboard
- [x] Running balance calculation on the Dashboard
- [x] Pagination and responsive items-per-page on the Dashboard
- [x] Light/dark theme, persisted and applied app-wide
- [x] Editable, persisted brand/app name shown in the navbar and browser tab