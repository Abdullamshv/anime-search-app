import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      // Calculate left and right boundaries around currentPage
      let left = Math.max(currentPage - 1, 2);
      let right = Math.min(currentPage + 1, totalPages - 1);

      // Add left ellipsis if needed
      if (left > 2) pages.push('...');

      // Add middle pages
      for (let i = left; i <= right; i++) pages.push(i);

      // Add right ellipsis if needed
      if (right < totalPages - 1) pages.push('...');

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex gap-2 justify-center items-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-black rounded-lg transition-colors bg-white disabled:cursor-not-allowed hover:scale-105 "
      >
        Previous
      </button>

      <div className="flex gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-4 py-2 text-white hover:cursor-pointer">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === pageNum
                  ? 'bg-white text-black hover:scale-105 '
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-scale-105 '
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-black rounded-lg transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-scale-105 "
      >
        Next
      </button>
    </div>
  );
}
