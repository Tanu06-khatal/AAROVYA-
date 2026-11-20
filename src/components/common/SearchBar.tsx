import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
  showFilterButton?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search records, doctors, tests...',
  onFilterClick,
  showFilterButton = false,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy placeholder:text-textSecondary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-navy p-0.5 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showFilterButton && (
        <button
          onClick={onFilterClick}
          className="p-2 sm:p-2.5 bg-white border border-borderLight rounded-xl text-textSecondary hover:text-navy hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center flex-shrink-0"
          title="Filter"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

