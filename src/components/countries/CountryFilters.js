/**
 * Country Filters Component
 * Filter controls for country list
 */

'use client';

import { CONFEDERATIONS } from '@/lib/constants';
import { SearchBar } from '@/components/common';

export default function CountryFilters({ filters, onChange }) {
  const handleSearchChange = (search) => {
    onChange({ ...filters, search });
  };

  const handleConfederationChange = (e) => {
    onChange({ ...filters, confederation: e.target.value });
  };

  const handleSortChange = (e) => {
    onChange({ ...filters, sortBy: e.target.value });
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <SearchBar
        onSearch={handleSearchChange}
        placeholder="Search countries..."
      />

      {/* Confederation Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">Confederation</label>
        <select
          value={filters.confederation || ''}
          onChange={handleConfederationChange}
          className="select-dark w-full"
        >
          <option value="">All Confederations</option>
          {CONFEDERATIONS.map(conf => (
            <option key={conf.value} value={conf.value}>
              {conf.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium mb-2">Sort By</label>
        <select
          value={filters.sortBy || 'world_ranking'}
          onChange={handleSortChange}
          className="select-dark w-full"
        >
          <option value="world_ranking">World Ranking</option>
          <option value="fifa_points">FIFA Points</option>
          <option value="name">Name (A-Z)</option>
          <option value="confederation_ranking">Confederation Ranking</option>
        </select>
      </div>

      {/* Active Filters */}
      {(filters.confederation || filters.search) && (
        <div>
          <label className="block text-sm font-medium mb-2">Active Filters</label>
          <div className="flex flex-wrap gap-2">
            {filters.confederation && (
              <div className="badge badge-primary flex items-center space-x-2">
                <span>{filters.confederation}</span>
                <button
                  onClick={() => onChange({ ...filters, confederation: '' })}
                  className="hover:text-white"
                >
                  ×
                </button>
              </div>
            )}
            {filters.search && (
              <div className="badge badge-primary flex items-center space-x-2">
                <span>Search: {filters.search}</span>
                <button
                  onClick={() => onChange({ ...filters, search: '' })}
                  className="hover:text-white"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}