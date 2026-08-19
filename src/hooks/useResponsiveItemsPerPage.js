import { useState, useEffect } from 'react';

// Matches the Row's xs/sm/lg column breakpoints in Dashboard.jsx.
// Keeps ~3 rows per page at every screen size.
const BREAKPOINTS = { lg: 992, sm: 576 };

function getItemsPerPage(width) {
  if (width >= BREAKPOINTS.lg) return 9; // 3 cols x 3 rows
  if (width >= BREAKPOINTS.sm) return 6; // 2 cols x 3 rows
  return 3;                              // 1 col x 3 rows
}

export function useResponsiveItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    typeof window !== 'undefined' ? getItemsPerPage(window.innerWidth) : 9
  );

  useEffect(() => {
    function handleResize() {
      setItemsPerPage(getItemsPerPage(window.innerWidth));
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return itemsPerPage;
}