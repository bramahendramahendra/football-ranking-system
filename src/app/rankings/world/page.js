/**
 * World Rankings Page
 * Display FIFA world rankings
 */

'use client';

import { useState, useEffect } from 'react';
import { MainLayout, PageHeader } from '@/components/layout';
import { RankingTable, RankingCard, TopMovers } from '@/components/rankings';
import { Loading, EmptyState, ErrorState, Pagination, SearchBar, Tabs } from '@/components/common';
import { useWorldRankings } from '@/hooks';
import { Globe, Grid, List } from 'lucide-react';

export default function WorldRankingsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const { rankings, loading, error, pagination, fetchRankings, refetch } = useWorldRankings({
    page,
    limit,
    search,
  });

  useEffect(() => {
    fetchRankings({ page, limit, search });
  }, [page, search]);

  const tabs = [
    {
      label: 'All Rankings',
      content: (
        <>
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <SearchBar 
              onSearch={setSearch}
              placeholder="Search countries..."
              className="max-w-md"
            />
            
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-card hover:bg-dark-hover'
                }`}
                title="Table view"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-card hover:bg-dark-hover'
                }`}
                title="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>

          {loading && <Loading message="Loading world rankings..." />}

          {error && !loading && (
            <ErrorState error={error} retry={refetch} />
          )}

          {!loading && !error && rankings.length === 0 && (
            <EmptyState
              title="No rankings found"
              description="No countries match your search criteria."
            />
          )}

          {!loading && !error && rankings.length > 0 && (
            <>
              {viewMode === 'table' ? (
                <RankingTable rankings={rankings} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rankings.map((country) => (
                    <RankingCard 
                      key={country.id}
                      country={country}
                      rank={country.world_ranking}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="mt-6">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={Math.ceil(pagination.total / pagination.limit)}
                  onPageChange={setPage}
                />
              </div>
            </>
          )}
        </>
      ),
    },
    {
      label: 'Top 10',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rankings.slice(0, 10).map((country) => (
            <RankingCard 
              key={country.id}
              country={country}
              rank={country.world_ranking}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="FIFA World Rankings"
        subtitle="Official FIFA world rankings based on performance and results"
        breadcrumb={[
          { label: 'Rankings', href: '/rankings/world' },
          { label: 'World Rankings' }
        ]}
      />

      {/* Stats Summary */}
      {!loading && rankings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-dark p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-dark-muted">Total Countries</p>
                <p className="text-3xl font-bold">{pagination.total}</p>
              </div>
            </div>
          </div>

          <div className="card-dark p-6">
            <div className="flex items-center space-x-4">
              <img 
                src={rankings[0]?.flag_url} 
                alt={rankings[0]?.name}
                className="w-12 h-9 object-cover rounded shadow-md"
              />
              <div>
                <p className="text-sm text-dark-muted">#1 Ranked</p>
                <p className="text-xl font-bold">{rankings[0]?.name}</p>
              </div>
            </div>
          </div>

          <div className="card-dark p-6">
            <div>
              <p className="text-sm text-dark-muted mb-2">Top 3 Teams</p>
              <div className="space-y-1">
                {rankings.slice(0, 3).map((country, index) => (
                  <div key={country.id} className="flex items-center space-x-2">
                    <span className="text-dark-muted">#{index + 1}</span>
                    <img 
                      src={country.flag_url} 
                      alt={country.name}
                      className="w-6 h-4 object-cover rounded"
                    />
                    <span className="font-semibold text-sm">{country.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Tabs tabs={tabs} />
    </MainLayout>
  );
}