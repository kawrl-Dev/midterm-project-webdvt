# 💸 Personal Budget Tracker 💸

A multi-page **Personal Budget Tracker** built with **React**, **React Router**, and **React-Bootstrap**. Users can log income and expense transactions, categorize them, view spending summaries, and switch between light and dark themes — with the theme choice persisted and applied consistently across the entire app via Context.

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
|-----------------------|----------------------|
| Dashboard (Home)      | `/dashboard`         |  
|Add Transaction        | `/add-transaction`   | 
| Transaction Detail    | `/transaction/:id`   | 
| Summary               | `/summary`           | 
### Dashboard Flow

1. Lists all logged transactions.
2. Supports filtering by category and by type (Income / Expense).
3. Displays the current balance (total income minus total expenses).
4. Each entry links to its own Transaction Detail page.

### Add Transaction Flow

1. A form collects **Description**, **Amount**, and **Date**.
2. Required fields are validated via Bootstrap's `Form` validation before submission.
3. On success, a dismissible confirmation alert appears; closing it returns the user to the Dashboard.

### Transaction Detail Flow

1. Accessed via its own URL (`/transaction/:id`), showing the full details of a single transaction.
2. Allows editing the transaction's details.
3. Allows deleting the transaction.

### Summary Flow

1. Shows a breakdown of spending by category.
2. Includes the light/dark theme toggle — the choice applies app-wide, not just on this page.

---

## Architecture

- **Routing** — `react-router` defines each page above as its own real route with a distinct URL (no conditionally-rendered "fake" pages).
- **Theme (Context API)** — `ThemeContext.jsx` manages light/dark mode app-wide via React Context, avoiding prop drilling through every component. The active theme is persisted to `localStorage` and applied via the `data-bs-theme` attribute, with an inline script in `index.html` setting it before first paint to prevent a flash of the wrong theme.
- **Custom Hook** — a reusable hook handles reading/writing transactions to persistent storage, rather than duplicating that logic in every component that needs it.
- **Performance Optimization** — at least one component that would otherwise re-render unnecessarily (e.g. the themed wave footer) is optimized to avoid it.
- **Styling** — `react-bootstrap` for layout/components, with custom CSS (`global.css`, `NavigationBar.css`) layered on top for theme-aware accents.

---

## Project Structure

```
midterm-project-webdevt/
│
├── index.html                     Vite entry HTML; sets initial theme before paint to avoid flash.
├── package.json
│
└── src/
    │
    ├── main.jsx                   React app entry point; mounts <App /> in StrictMode.
    ├── App.jsx                    Route definitions and top-level layout (nav, footer, routed content).
    │
    ├── components/
    │   ├── NavigationBar.jsx      Top navigation with links to Dashboard and Add Transaction.
    │   ├── WebsiteFooter.jsx      Animated multilayer wave footer; hosts the theme toggle.
    │   └── ThemeToggle.jsx        Sun/moon button that flips light/dark mode via ThemeContext.
    │
    ├── context/
    │   └── ThemeContext.jsx       Theme Context provider; persists theme to localStorage and
    │                              derives wave accent colors per theme.
    │
    ├── pages/
    │   ├── Dashboard.jsx          Transaction list, filtering, and current balance.
    │   ├── AddTransaction.jsx     Form to log a new transaction with validation.
    │   ├── TransactionDetail.jsx  (planned) Full detail view with edit/delete.
    │   └── Summary.jsx            (planned) Spending breakdown by category + theme toggle.
    │
    └── css/
        ├── global.css             App-wide base styles.
        └── NavigationBar.css      Theme-aware nav bar styling.
```

---

## Planned Features

- [ ] `Transaction Detail` page (`/transaction/:id`) — view, edit, and delete a single transaction
- [ ] `Summary` page — spending breakdown by category
- [ ] Custom hook for reading/writing transactions to persistent storage
- [ ] Category and type (Income/Expense) filtering on the Dashboard
- [ ] Running balance calculation on the Dashboard