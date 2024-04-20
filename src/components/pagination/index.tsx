import { useState } from 'react';

interface PaginationProps {
  recipes: number;
  setActivePage: (page: number) => void;
}

export default function Pagination({ recipes, setActivePage }: PaginationProps) {
  const [active, setActive] = useState(1);

  const handleClick = (page: number) => {
    setActive(page);
    setActivePage(page);
  };

  const pageNumbers = Array.from({ length: recipes }, (_, i) => i + 1);
  const middlePage = Math.max(active - Math.floor(recipes / 2), 0);
  const displayPages = pageNumbers.slice(middlePage, middlePage + recipes);

  return (
    <div className="flex justify-center space-x-2 px-2">
      <button
        className="rounded border border-transparent px-2 py-1 text-sm hover:border-gray-300 disabled:border-transparent disabled:opacity-50 sm:px-4 sm:py-2 sm:text-base"
        disabled={active === 1}
        onClick={() => handleClick(active - 1)}
      >
        &lt; Prev
      </button>
      {displayPages.map((number) => (
        <button
          key={number}
          className={`rounded border px-2 py-1 text-sm hover:border-gray-300 sm:px-4 sm:py-2 sm:text-base ${active === number ? 'border-gray-300' : 'border-transparent'}`}
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="rounded border border-transparent px-2 py-1 text-sm hover:border-gray-300 disabled:border-transparent disabled:opacity-50 sm:px-4 sm:py-2 sm:text-base"
        disabled={active === recipes}
        onClick={() => handleClick(active + 1)}
      >
        Next &gt;
      </button>
    </div>
  );
}
