/**
 * Ranking Table Component
 * Display rankings with detailed information
 */

'use client';

import { formatNumber, parseFormString, getOrdinalSuffix } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Medal } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RankingTable({ rankings, showConfederationRank = false }) {
  const router = useRouter();

  const getRankBadge = (rank) => {
    if (rank === 1) return <Medal className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return null;
  };

  const handleRowClick = (country) => {
    router.push(`/countries/${country.id}`);
  };

  return (
    <div className="table-container">
      <table className="table-dark">
        <thead>
          <tr>
            <th className="w-20">Rank</th>
            <th>Country</th>
            <th>Confederation</th>
            {showConfederationRank && <th>Conf. Rank</th>}
            <th>FIFA Points</th>
            <th>Recent Form</th>
            <th>Win %</th>
            <th className="w-24">Change</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((country, index) => {
            const formResults = parseFormString(country.last_10_matches || '');
            
            return (
              <tr 
                key={country.id}
                onClick={() => handleRowClick(country)}
                className="cursor-pointer"
              >
                {/* Rank */}
                <td>
                  <div className="flex items-center space-x-2">
                    {getRankBadge(country.world_ranking)}
                    <span className={`text-xl font-bold ${
                      country.world_ranking <= 3 ? 'text-primary' : ''
                    }`}>
                      {country.world_ranking}
                    </span>
                  </div>
                </td>

                {/* Country */}
                <td>
                  <div className="flex items-center space-x-3">
                    {country.flag_url ? (
                      <img 
                        src={country.flag_url} 
                        alt={country.name}
                        className="w-10 h-7 object-cover rounded shadow-sm"
                      />
                    ) : (
                      <div className="w-10 h-7 bg-dark-hover rounded flex items-center justify-center">
                        <span className="text-xs">🏴</span>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-base">{country.name}</div>
                      <div className="text-xs text-dark-muted">{country.code}</div>
                    </div>
                  </div>
                </td>

                {/* Confederation */}
                <td>
                  <span className="badge badge-info">{country.confederation}</span>
                </td>

                {/* Confederation Rank */}
                {showConfederationRank && (
                  <td>
                    <span className="font-semibold">
                      {getOrdinalSuffix(country.confederation_ranking)}
                    </span>
                  </td>
                )}

                {/* FIFA Points */}
                <td>
                  <span className="text-lg font-bold text-primary">
                    {formatNumber(country.fifa_points)}
                  </span>
                </td>

                {/* Recent Form */}
                <td>
                  {formResults.length > 0 ? (
                    <div className="flex space-x-1">
                      {formResults.slice(0, 5).map((form, idx) => (
                        <div
                          key={idx}
                          className={`
                            w-7 h-7 rounded flex items-center justify-center text-xs font-bold
                            ${form.result === 'W' ? 'form-w' : 
                              form.result === 'D' ? 'form-d' : 'form-l'}
                          `}
                          title={form.label}
                        >
                          {form.result}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-dark-muted text-sm">No data</span>
                  )}
                </td>

                {/* Win Percentage */}
                <td>
                  <span className="font-semibold">
                    {country.win_percentage ? `${formatNumber(country.win_percentage, 1)}%` : '0%'}
                  </span>
                </td>

                {/* Change */}
                <td>
                  <div className="flex items-center justify-center space-x-1">
                    {/* Placeholder for ranking change - would come from history */}
                    <Minus className="w-4 h-4 text-dark-muted" />
                    <span className="text-dark-muted text-sm">-</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}