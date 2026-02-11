/**
 * usePagination Hook
 * Custom hook untuk pagination logic
 */

'use client';

import { useState, useMemo } from 'react';

export function usePagination(totalItems, itemsPerPage = 20) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const getPageNumbers = (maxVisible = 5) => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const reset = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    getPageNumbers,
    reset,
  };
}