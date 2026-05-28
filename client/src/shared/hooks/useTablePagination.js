import { useEffect, useMemo, useState } from 'react';

const DEFAULT_PAGE_SIZES = [5, 10, 25, 50];

export function useTablePagination(items, { pageSize: initialPageSize = 10, pageSizes = DEFAULT_PAGE_SIZES } = {}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize) || 1);
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [totalItems, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedItems = useMemo(() => {
    const startIndex = (safePage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  }, [items, safePage, pageSize]);

  const startIndex = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endIndex = Math.min(safePage * pageSize, totalItems);

  const handlePageSizeChange = (nextPageSize) => {
    setPageSize(Number(nextPageSize));
    setPage(1);
  };

  return {
    paginatedItems,
    page: safePage,
    setPage,
    pageSize,
    setPageSize: handlePageSizeChange,
    pageSizes,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
  };
}
