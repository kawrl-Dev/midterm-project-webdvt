import { useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'budget-tracker-transactions';

// Kept OUTSIDE the hook on purpose — it's a pure helper, not stateful logic,
// so it doesn't need to be recreated every time the hook runs.
function loadTransactions() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Failed to read transactions from localStorage:', err);
    return [];
  }
}

export function useTransactions() {
  // Lazy initializer (the () => loadTransactions() form) means loadTransactions()
  // only runs on the FIRST render, not every render — same pattern your
  // ThemeContext already uses for reading the stored theme.
  const [transactions, setTransactions] = useState(loadTransactions);

  // Any time the array changes, persist it. This is the "write" half.
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // useCallback keeps these function references STABLE across re-renders.
  // Without it, a new addTransaction function is created every render,
  // which would break React.memo on any child component receiving it as
  // a prop — this is your "unnecessary re-render" talking point.
  const addTransaction = useCallback((transaction) => {
    const newTransaction = { id: uuidv4(), ...transaction };
    setTransactions((prev) => [...prev, newTransaction]);
    return newTransaction;
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTransactionById = useCallback(
    (id) => transactions.find((t) => t.id === id),
    [transactions]
  );

  // useMemo here avoids re-running these reduce() calls on every single
  // render — only when `transactions` actually changes. This is a second,
  // distinct performance-optimization point from the useCallback one above:
  // useMemo caches a VALUE, useCallback caches a FUNCTION.
  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    ...totals, // income, expense, balance
  };
}