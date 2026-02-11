/**
 * Country Detail Component
 * Detailed view of country information
 */

'use client';

import { formatNumber, parseFormString, getOrdinalSuffix } from '@/lib/utils';
import { Globe, TrendingUp, Award, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CountryDetail({ country, rankingHistory = [] }) {
  const formResults = parseFormString(country.last_10_matches || '');

  // Prepare chart data
  const chartData = rankingHistory.slice(0, 10).reverse().map((record, index) => ({
    date: new Date(record.recorded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    ranking: record.world_ranking,
    points: parseFloat(record.fifa_points),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {country.flag_url ? (
            <img 
              src={country.flag_url} 
              alt={country.name}
              className="w-24 h-16 object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-24 h-16 bg-dark-hover rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏴</span>
            </div>
          )}
          <div>
            <h2 className="text-3xl font-bold mb-1">{country.name}</h2>
            <div className="flex items-center space-x-4 text-dark-muted">
              <span>{country.code}</span>
              <span>•</span>
              <span>{country.confederation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-dark p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-sm text-dark-muted">World Ranking</span>
          </div>
          <p className="text-3xl font-bold">
            {getOrdinalSuffix(country.world_ranking)}
          </p>
        </div>

        <div className="card-dark p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-success" />
            <span className="text-sm text-dark-muted">FIFA Points</span>
          </div>
          <p className="text-3xl font-bold text-primary">
            {formatNumber(country.fifa_points)}
          </p>
        </div>

        <div className="card-dark p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-5 h-5 text-warning" />
            <span className="text-sm text-dark-muted">Conf. Ranking</span>
          </div>
          <p className="text-3xl font-bold">
            {getOrdinalSuffix(country.confederation_ranking)}
          </p>
        </div>

        <div className="card-dark p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-info" />
            <span className="text-sm text-dark-muted">Win Rate</span>
          </div>
          <p className="text-3xl font-bold">
            {country.win_percentage ? formatNumber(country.win_percentage, 1) : '0'}%
          </p>
        </div>
      </div>

      {/* Recent Form */}
      {formResults.length > 0 && (
        <div className="card-dark p-6">
          <h3 className="text-xl font-bold mb-4">Recent Form (Last 10 Matches)</h3>
          <div className="flex flex-wrap gap-2">
            {formResults.map((form, index) => (
              <div
                key={index}
                className={`
                  w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold
                  ${form.result === 'W' ? 'form-w' : 
                    form.result === 'D' ? 'form-d' : 'form-l'}
                `}
                title={`${form.label} (Match ${formResults.length - index})`}
              >
                {form.result}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{country.recent_wins || 0}</p>
              <p className="text-sm text-dark-muted">Wins</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{country.recent_draws || 0}</p>
              <p className="text-sm text-dark-muted">Draws</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-danger">{country.recent_losses || 0}</p>
              <p className="text-sm text-dark-muted">Losses</p>
            </div>
          </div>
        </div>
      )}

      {/* Ranking History Chart */}
      {chartData.length > 0 && (
        <div className="card-dark p-6">
          <h3 className="text-xl font-bold mb-4">Ranking History</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2f45" />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                reversed
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#151a2e',
                  border: '1px solid #2a2f45',
                  borderRadius: '8px',
                  color: '#e4e7eb'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="ranking" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="World Ranking"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}