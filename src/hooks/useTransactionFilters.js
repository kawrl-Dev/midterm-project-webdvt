import {useState, useEffect, useCallback} from "react";

const STORAGE_KEY = "budget-tracker-filters";

function loadFilters() {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : { category: '', type: '' };
    } catch (err) {
        console.error('Failed to read filters from localStorage:', err);
        return { category: '', type: '' };
    }
}

export function useTransactionFilters() {
  const [filters, setFilters] = useState(loadFilters);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  const setCategory = useCallback((category) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const setType = useCallback((type) => {
    setFilters((prev) => ({ ...prev, type }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ category: '', type: '' });
  }, []);

  const hasActiveFilters = Boolean(filters.category || filters.type);

  return {
    filterCategory: filters.category,
    filterType: filters.type,
    setCategory,
    setType,
    resetFilters,
    hasActiveFilters,
  };
}