/**
 * Filter Bar Component
 * Reusable filter controls
 */

'use client';

export default function FilterBar({ filters, onChange, className = '' }) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {filters.map((filter) => {
        if (filter.type === 'select') {
          return (
            <div key={filter.key} className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-2">
                {filter.label}
              </label>
              <select
                value={filter.value || ''}
                onChange={(e) => handleChange(filter.key, e.target.value)}
                className="select-dark w-full"
              >
                <option value="">All {filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (filter.type === 'search') {
          return (
            <div key={filter.key} className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-2">
                {filter.label}
              </label>
              <input
                type="text"
                value={filter.value || ''}
                onChange={(e) => handleChange(filter.key, e.target.value)}
                placeholder={filter.placeholder || `Search ${filter.label.toLowerCase()}...`}
                className="input-dark w-full"
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}