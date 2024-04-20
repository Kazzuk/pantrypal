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

  return (
    <div className="join">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`btn join-item ${active === number ? 'btn-active' : ''}`}
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
