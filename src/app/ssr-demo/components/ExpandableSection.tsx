'use client';

import { useState } from 'react';

interface ExpandableSectionProps {
  items: React.ReactNode[];
  initialCount: number;
  totalCount: number;
  buttonText: string;
  expandedButtonText: string;
  stepSize?: number;
  gridClass?: string;
}

export function ExpandableSection({
  items,
  initialCount,
  totalCount,
  buttonText,
  expandedButtonText,
  stepSize = 10,
  gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
}: ExpandableSectionProps) {
  const [currentCount, setCurrentCount] = useState(initialCount);
  
  const hasMoreItems = totalCount > currentCount;
  const isFullyExpanded = currentCount >= totalCount;

  const loadMore = () => {
    const nextCount = Math.min(currentCount + stepSize, totalCount);
    setCurrentCount(nextCount);
  };

  const collapse = () => {
    setCurrentCount(initialCount);
  };

  const displayedItems = items.slice(0, currentCount);

  return (
    <div>
      <div className={gridClass}>
        {displayedItems}
      </div>
      
      {hasMoreItems && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            {buttonText}
            <span className="ml-2">↓</span>
          </button>
          
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Mostrando {currentCount.toLocaleString()} de {totalCount.toLocaleString()} itens
          </div>
        </div>
      )}

      {isFullyExpanded && (
        <div className="mt-6 text-center">
          <button
            onClick={collapse}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            {expandedButtonText}
            <span className="ml-2">↑</span>
          </button>
          
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Mostrando todos os {totalCount.toLocaleString()} itens
          </div>
        </div>
      )}
    </div>
  );
} 