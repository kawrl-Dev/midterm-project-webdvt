import { useState, useEffect, useMemo } from 'react';

export function usePagination(items, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // Only clamps DOWN when the current page becomes invalid — never resets
  // to page 1 just because the list changed.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  return { currentPage, totalPages, paginatedItems, setCurrentPage };
}