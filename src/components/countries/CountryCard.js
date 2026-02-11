/**
 * Country Card Component
 * Display country information in card format
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatNumber, parseFormString } from '@/lib/utils';

export default function CountryCard({ country, onClick = null }) {
  const getRankingIcon = () => {
    // Assuming we track previous ranking in ranking_history
    const change = 0; // Would come from ranking history
    
    if (change > 0) return <TrendingUp className="w-4 h-4 text-success" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-danger" />;
    return <Minus className="w-4 h-4 text-dark-muted" />;
  };

  const formResults = parseFormString(country.last_10_matches || '');

  const handleClick = () => {
    if (onClick) {
      onClick(country);
    }
  };

  return (
    <div 
      className="card-dark-hover p-6 cursor-pointer"
      onClick={handleClick}
    >
      {/* Header with Flag and Ranking */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {country.flag_url ? (
            <img 
              src={country.flag_url} 
              alt={country.name}
              className="w-12 h-8 object-cover rounded shadow-md"
            />
          ) : (
            <div className="w-12 h-8 bg-dark-hover rounded flex items-center justify-center">
              <span className="text-xs text-dark-muted">🏴</span>
            </div>
          )}
          <div>
            <h3 className="font-bold text-lg">{country.name}</h3>
            <p className="text-sm text-dark-muted">{country.code}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 justify-end mb-1">
            <span className="text-2xl font-bold">#{country.world_ranking}</span>
            {getRankingIcon()}
          </div>
          <p className="text-xs text-dark-muted">World Rank</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-dark-muted mb-1">FIFA Points</p>
          <p className="text-xl font-bold text-primary">
            {formatNumber(country.fifa_points)}
          </p>
        </div>
        <div>
          <p className="text-sm text-dark-muted mb-1">{country.confederation} Rank</p>
          <p className="text-xl font-bold text-success">
            #{country.confederation_ranking}
          </p>
        </div>
      </div>

      {/* Recent Form */}
      {formResults.length > 0 && (
        <div>
          <p className="text-sm text-dark-muted mb-2">Recent Form</p>
          <div className="flex space-x-1">
            {formResults.map((form, index) => (
              <div
                key={index}
                className={`
                  w-8 h-8 rounded flex items-center justify-center text-sm font-bold
                  ${form.result === 'W' ? 'form-w' : 
                    form.result === 'D' ? 'form-d' : 'form-l'}
                `}
                title={form.label}
              >
                {form.result}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}