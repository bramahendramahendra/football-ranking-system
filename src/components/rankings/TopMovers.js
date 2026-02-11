/**
 * Top Movers Component
 * Display biggest ranking changes
 */

'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TopMovers({ movers = [] }) {
  if (movers.length === 0) {
    return (
      <div className="card-dark p-6">
        <h3 className="text-xl font-bold mb-4">Top Movers</h3>
        <p className="text-dark-muted text-center py-8">No data available</p>
      </div>
    );
  }

  return (
    <div className="card-dark p-6">
      <h3 className="text-xl font-bold mb-4">Top Movers This Month</h3>
      
      <div className="space-y-4">
        {movers.map((country, index) => {
          const change = country.ranking_change || 0;
          const isPositive = change > 0;
          
          return (
            <div 
              key={country.id}
              className="flex items-center justify-between py-3 border-b border-dark-border last:border-0"
            >
              <div className="flex items-center space-x-3">
                <span className="text-dark-muted w-6">{index + 1}</span>
                {country.flag_url && (
                  <img 
                    src={country.flag_url} 
                    alt={country.name}
                    className="w-8 h-6 object-cover rounded shadow-sm"
                  />
                )}
                <div>
                  <p className="font-semibold">{country.name}</p>
                  <p className="text-xs text-dark-muted">Rank #{country.current_ranking}</p>
                </div>
              </div>
              
              <div className={`flex items-center space-x-2 ${
                isPositive ? 'text-success' : 'text-danger'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                <span className="font-bold text-lg">
                  {Math.abs(change)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}