import { useState, useMemo } from 'react';

export function usePagination(items, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const activePage = currentPage > totalPages ? totalPages : currentPage;

  const paginatedItems = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, activePage, itemsPerPage]);

  return { 
    currentPage: activePage,
    totalPages, 
    paginatedItems, 
    setCurrentPage 
  };
}
