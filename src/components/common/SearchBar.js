/**
 * Search Bar Component
 * Reusable search input with debounce
 */

'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks';

export default function SearchBar({ 
  onSearch, 
  placeholder = 'Search...', 
  debounceDelay = 500,
  className = '' 
}) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, debounceDelay);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  const handleClear = () => {
    setValue('');
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="input-dark pl-10 pr-10 w-full"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-muted hover:text-dark-text"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}