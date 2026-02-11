/**
 * Confederation Rankings Page
 * Display rankings by confederation
 */

'use client';

import { useState, useEffect } from 'react';
import { MainLayout, PageHeader } from '@/components/layout';
import { RankingTable, ConfederationStats } from '@/components/rankings';
import { Loading, EmptyState, ErrorState, Pagination } from '@/components/common';
import { useConfederationRankings } from '@/hooks';
import { CONFEDERATIONS } from '@/lib/constants';

export default function ConfederationRankingsPage() {
  const [selectedConfederation, setSelectedConfederation] = useState('UEFA');
  const [page, setPage] = useState(1);
  const [limit] = useState(50);

  const { rankings, stats, loading, error, pagination, fetchRankings, refetch } = useConfederationRankings(
    selectedConfederation,
    { page, limit }
  );

  useEffect(() => {
    fetchRankings({ page, limit });
  }, [selectedConfederation, page]);

  const handleConfederationChange = (confederation) => {
    setSelectedConfederation(confederation);
    setPage(1); // Reset to first page
  };

  return (
    <MainLayout>
      <PageHeader
        title="Confederation Rankings"
        subtitle="Rankings by continental football confederation"
        breadcrumb={[
          { label: 'Rankings', href: '/rankings/world' },
          { label: 'Confederation Rankings' }
        ]}
      />

      {/* Confederation Selector */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {CONFEDERATIONS.map((conf) => (
            <button
              key={conf.value}
              onClick={() => handleConfederationChange(conf.value)}
              className={`
                px-6 py-3 rounded-lg font-semibold transition-all
                ${selectedConfederation === conf.value
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-dark-card hover:bg-dark-hover border border-dark-border'}
              `}
            >
              <div>
                <div className="text-lg">{conf.label}</div>
                <div className={`text-xs ${
                  selectedConfederation === conf.value ? 'text-white/80' : 'text-dark-muted'
                }`}>
                  {conf.name.split(' ').slice(0, 3).join(' ')}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Confederation Stats */}
      {!loading && stats && (
        <ConfederationStats stats={stats} />
      )}

      {/* Rankings Content */}
      {loading && <Loading message={`Loading ${selectedConfederation} rankings...`} />}

      {error && !loading && (
        <ErrorState error={error} retry={refetch} />
      )}

      {!loading && !error && rankings.length === 0 && (
        <EmptyState
          title="No rankings found"
          description={`No countries found in ${selectedConfederation} confederation.`}
        />
      )}

      {!loading && !error && rankings.length > 0 && (
        <>
          <div className="card-dark p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedConfederation} Rankings</h2>
              <span className="text-dark-muted">
                {pagination.total} {pagination.total === 1 ? 'country' : 'countries'}
              </span>
            </div>

            <RankingTable 
              rankings={rankings}
              showConfederationRank={true}
            />
          </div>

          {/* Pagination */}
          {pagination.total > limit && (
            <Pagination
              currentPage={pagination.page}
              totalPages={Math.ceil(pagination.total / pagination.limit)}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {/* Top 3 Highlight */}
      {!loading && rankings.length >= 3 && (
        <div className="card-dark p-6 mt-8">
          <h3 className="text-xl font-bold mb-6">Top 3 in {selectedConfederation}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rankings.slice(0, 3).map((country, index) => (
              <div 
                key={country.id}
                className={`
                  p-6 rounded-xl border-2 text-center
                  ${index === 0 ? 'border-yellow-500 bg-yellow-500/10' :
                    index === 1 ? 'border-gray-400 bg-gray-400/10' :
                    'border-orange-600 bg-orange-600/10'}
                `}
              >
                <div className="mb-4">
                  <div className={`
                    text-6xl font-bold mb-2
                    ${index === 0 ? 'text-yellow-500' :
                      index === 1 ? 'text-gray-400' :
                      'text-orange-600'}
                  `}>
                    #{index + 1}
                  </div>
                </div>
                
                {country.flag_url && (
                  <img 
                    src={country.flag_url} 
                    alt={country.name}
                    className="w-20 h-14 object-cover rounded-lg shadow-lg mx-auto mb-4"
                  />
                )}
                
                <h4 className="text-xl font-bold mb-2">{country.name}</h4>
                <p className="text-dark-muted text-sm mb-3">{country.code}</p>
                
                <div className="pt-4 border-t border-dark-border">
                  <div className="flex justify-around text-center">
                    <div>
                      <p className="text-xs text-dark-muted mb-1">FIFA Points</p>
                      <p className="text-lg font-bold text-primary">
                        {country.fifa_points.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-muted mb-1">World Rank</p>
                      <p className="text-lg font-bold">
                        #{country.world_ranking}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
}