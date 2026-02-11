/**
 * Confederation Stats Component
 * Display confederation statistics
 */

'use client';

import { formatNumber } from '@/lib/utils';
import { Users, TrendingUp, Award, Globe } from 'lucide-react';

export default function ConfederationStats({ stats }) {
  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="card-dark p-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-dark-muted">Total Countries</p>
            <p className="text-2xl font-bold">{stats.total_countries}</p>
          </div>
        </div>
      </div>

      <div className="card-dark p-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="text-sm text-dark-muted">Average Points</p>
            <p className="text-2xl font-bold">
              {formatNumber(stats.avg_points || 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="card-dark p-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="text-sm text-dark-muted">Highest Points</p>
            <p className="text-2xl font-bold">
              {formatNumber(stats.max_points || 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="card-dark p-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
            <Globe className="w-5 h-5 text-info" />
          </div>
          <div>
            <p className="text-sm text-dark-muted">Lowest Points</p>
            <p className="text-2xl font-bold">
              {formatNumber(stats.min_points || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}