/**
 * Country Table Component
 * Display countries in table format
 */

'use client';

import { Table } from '@/components/common';
import { formatNumber, parseFormString } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function CountryTable({ countries, onRowClick = null }) {
  const columns = [
    {
      key: 'world_ranking',
      label: 'Rank',
      render: (value) => (
        <span className="font-bold text-lg">#{value}</span>
      ),
    },
    {
      key: 'name',
      label: 'Country',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          {row.flag_url ? (
            <img 
              src={row.flag_url} 
              alt={value}
              className="w-8 h-6 object-cover rounded shadow-sm"
            />
          ) : (
            <div className="w-8 h-6 bg-dark-hover rounded flex items-center justify-center">
              <span className="text-xs">🏴</span>
            </div>
          )}
          <div>
            <div className="font-semibold">{value}</div>
            <div className="text-xs text-dark-muted">{row.code}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'confederation',
      label: 'Confederation',
      render: (value) => (
        <span className="badge badge-info">{value}</span>
      ),
    },
    {
      key: 'fifa_points',
      label: 'FIFA Points',
      render: (value) => (
        <span className="font-bold text-primary">
          {formatNumber(value)}
        </span>
      ),
    },
    {
      key: 'confederation_ranking',
      label: 'Conf. Rank',
      render: (value) => (
        <span className="font-semibold">#{value}</span>
      ),
    },
    {
      key: 'last_10_matches',
      label: 'Recent Form',
      sortable: false,
      render: (value, row) => {
        const formResults = parseFormString(value || '');
        if (formResults.length === 0) {
          return <span className="text-dark-muted text-sm">No data</span>;
        }
        
        return (
          <div className="flex space-x-1">
            {formResults.slice(0, 5).map((form, index) => (
              <div
                key={index}
                className={`
                  w-6 h-6 rounded flex items-center justify-center text-xs font-bold
                  ${form.result === 'W' ? 'form-w' : 
                    form.result === 'D' ? 'form-d' : 'form-l'}
                `}
                title={form.label}
              >
                {form.result}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      key: 'win_percentage',
      label: 'Win %',
      render: (value) => (
        <span className="font-semibold">
          {value ? `${formatNumber(value, 1)}%` : '0%'}
        </span>
      ),
    },
  ];

  return (
    <Table 
      columns={columns}
      data={countries}
      onRowClick={onRowClick}
    />
  );
}