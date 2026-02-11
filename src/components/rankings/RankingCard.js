/**
 * Ranking Card Component
 * Card view for rankings
 */

'use client';

import { formatNumber, parseFormString, getOrdinalSuffix } from '@/lib/utils';
import { Medal, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RankingCard({ country, rank }) {
  const router = useRouter();
  const formResults = parseFormString(country.last_10_matches || '');

  const getMedalColor = () => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-primary';
  };

  const handleClick = () => {
    router.push(`/countries/${country.id}`);
  };

  return (
    <div 
      className="card-dark-hover p-6 cursor-pointer"
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {country.flag_url ? (
            <img 
              src={country.flag_url} 
              alt={country.name}
              className="w-16 h-11 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-16 h-11 bg-dark-hover rounded-lg flex items-center justify-center">
              <span className="text-xl">🏴</span>
            </div>
          )}
          <div>
            <h3 className="font-bold text-lg">{country.name}</h3>
            <p className="text-sm text-dark-muted">{country.confederation}</p>
          </div>
        </div>
        
        {/* Rank Badge */}
        <div className="text-center">
          {rank <= 3 ? (
            <Medal className={`w-8 h-8 ${getMedalColor()} mx-auto mb-1`} />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-1">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          )}
          <p className="text-2xl font-bold">{rank}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-dark-border">
        <div>
          <p className="text-sm text-dark-muted mb-1">FIFA Points</p>
          <p className="text-xl font-bold text-primary">
            {formatNumber(country.fifa_points)}
          </p>
        </div>
        <div>
          <p className="text-sm text-dark-muted mb-1">Win Rate</p>
          <p className="text-xl font-bold text-success">
            {country.win_percentage ? formatNumber(country.win_percentage, 1) : 0}%
          </p>
        </div>
      </div>

      {/* Recent Form */}
      {formResults.length > 0 && (
        <div>
          <p className="text-sm text-dark-muted mb-2">Recent Form</p>
          <div className="flex space-x-1">
            {formResults.slice(0, 5).map((form, index) => (
              <div
                key={index}
                className={`
                  flex-1 h-8 rounded flex items-center justify-center text-sm font-bold
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