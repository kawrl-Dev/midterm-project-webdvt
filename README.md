# 💸 Personal Budget Tracker 💸

A multi-page **Personal Budget Tracker** built with **React**, **React Router**, and **React-Bootstrap**. Users can log income and expense transactions, categorize them, filter and paginate their history, view spending summaries broken down by category, and switch between light and dark themes — with the theme choice persisted and applied consistently across the entire app via Context.

---

## Requirements

- Node.js 18+
- npm (or yarn/pnpm)

---

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/midterm-projectwebdvt.git
   cd midterm-projectwebdvt
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

1. Shows an overview of income vs. expenses as a percentage of total cash flow.
2. Breaks down expenses and income by category, each visualized as a fill-level "jar."
3. Includes the light/dark theme toggle in the site footer — the choice applies app-wide, not just on this page.

---

## Architecture

- **Routing** — `react-router` defines each page above as its own real route with a distinct URL (no conditionally-rendered "fake" pages), plus a redirect from `/` to `/dashboard`.
- **Theme (Context API)** — `ThemeContext.jsx` manages light/dark mode app-wide via React Context, avoiding prop drilling through every component. The active theme is persisted to `localStorage` and applied via the `data-bs-theme` attribute, with an inline script in `index.html` setting it before first paint to prevent a flash of the wrong theme. The context also derives themed wave accent colors for the animated footer.
- **Custom Hooks**:
  - `useTransactions` — single source of truth for reading/writing transactions to `localStorage`, exposing CRUD helpers (`addTransaction`, `updateTransaction`, `deleteTransaction`, `getTransactionById`) plus memoized `income`/`expense`/`balance` totals.
  - `useTransactionFilters` — manages category/type filter state, persists it to `localStorage`, and exposes a `hasActiveFilters` flag.
  - `usePagination` — generic pagination over any item list, clamping the current page down (never resetting to page 1) when the list shrinks.
  - `useResponsiveItemsPerPage` — adjusts items-per-page to match the Dashboard's responsive card grid breakpoints.
- **Performance Optimization** — `TransactionCard` and `FilterSidebar` are wrapped in `React.memo` to avoid unnecessary re-renders when unrelated Dashboard state changes; hook-exposed callbacks (`addTransaction`, `updateTransaction`, etc.) are wrapped in `useCallback` so they keep stable references across renders.
- **Styling** — `react-bootstrap` for layout/components, with custom CSS (`global.css`, `NavigationBar.css`, `Dashboard.css`, `TransactionCard.css`, `Summary.css`, `Jar.css`) layered on top for theme-aware accents, hover effects, and the category "jar" visualizations.
- **PWA-ready** — `vite-plugin-pwa` and `workbox-window` are included as dependencies to support installability and offline caching.

---

## Project Structure

```
midterm-project-webdevt/
│
├── index.html                      Vite entry HTML; sets initial theme before paint to avoid flash.
├── package.json
│
└── src/
    │
    ├── main.jsx                    React app entry point; mounts <App /> in StrictMode.
    ├── App.jsx                     Route definitions and top-level layout (nav, footer, routed content).
    │
    ├── components/
    │   ├── NavigationBar.jsx       Top navigation with links to Dashboard and Summary.
    │   ├── WebsiteFooter.jsx       Animated multilayer wave footer; hosts the theme toggle.
    │   ├── ThemeToggle.jsx         Sun/moon button that flips light/dark mode via ThemeContext.
    │   ├── TransactionForm.jsx     Shared form fields used by both Add and Edit flows.
    │   ├── TransactionCard.jsx     Memoized card summarizing a single transaction; links to its detail page.
    │   ├── FilterSidebar.jsx       Memoized category/type filter controls (desktop sidebar + mobile off-canvas).
    │   ├── PaginationControls.jsx  Bootstrap pagination bar driven by usePagination.
    │   ├── Jar.jsx                 Animated fill-level "jar" used on the Summary page.
    │   └── Separator.jsx           Simple themed horizontal rule.
    │
    ├── context/
    │   └── ThemeContext.jsx        Theme Context provider; persists theme to localStorage and
    │                               derives wave accent colors per theme.
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
        ├── Summary.css             Summary page title styling.
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