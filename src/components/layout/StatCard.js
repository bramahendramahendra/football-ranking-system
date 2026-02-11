/**
 * Stat Card Component
 * Display statistics with icon
 */

'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ 
  title, 
  value, 
  icon: Icon,
  trend = null,
  trendLabel = '',
  className = '' 
}) {
  return (
    <div className={`card-dark p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-dark-muted text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          
          {trend !== null && (
            <div className="flex items-center space-x-1 mt-2">
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : trend < 0 ? (
                <TrendingDown className="w-4 h-4 text-danger" />
              ) : null}
              <span className={`text-sm ${trend > 0 ? 'text-success' : trend < 0 ? 'text-danger' : 'text-dark-muted'}`}>
                {Math.abs(trend)}% {trendLabel}
              </span>
            </div>
          )}
        </div>

        {Icon && (
          <div className="ml-4">
            <Icon className="w-12 h-12 text-primary opacity-20" />
          </div>
        )}
      </div>
    </div>
  );
}