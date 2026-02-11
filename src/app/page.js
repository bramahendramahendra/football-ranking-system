/**
 * Home Page with Layout
 */

'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { MainLayout, StatCard } from '@/components/layout';
import Link from 'next/link';
import { Trophy, Globe, Calendar, TrendingUp } from 'lucide-react';
import { Loading } from '@/components/common';
import { formatDate } from '@/lib/utils';

export default function HomePage() {
  const { initialLoading, countries, recentMatches, upcomingMatches } = useApp();
  const [stats, setStats] = useState({
    totalCountries: 0,
    totalMatches: 0,
    upcomingMatches: 0,
  });

  useEffect(() => {
    setStats({
      totalCountries: countries.length,
      totalMatches: recentMatches.length,
      upcomingMatches: upcomingMatches.length,
    });
  }, [countries, recentMatches, upcomingMatches]);

  if (initialLoading) {
    return (
      <MainLayout>
        <Loading message="Loading application data..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          ⚽ Football Ranking System
        </h1>
        <p className="text-xl text-dark-muted">
          International Football Ranking & Competition Management
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard
          title="Total Countries"
          value={stats.totalCountries}
          icon={Globe}
        />
        <StatCard
          title="Recent Matches"
          value={stats.totalMatches}
          icon={TrendingUp}
        />
        <StatCard
          title="Upcoming Matches"
          value={stats.upcomingMatches}
          icon={Calendar}
        />
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link href="/rankings/world" className="card-dark-hover p-6 block group">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              World Rankings
            </h3>
          </div>
          <p className="text-dark-muted">
            View global FIFA rankings and country statistics
          </p>
        </Link>

        <Link href="/rankings/confederation" className="card-dark-hover p-6 block group">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center mr-4">
              <Trophy className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold group-hover:text-success transition-colors">
              Confederation Rankings
            </h3>
          </div>
          <p className="text-dark-muted">
            Rankings by confederation (UEFA, AFC, CAF, etc.)
          </p>
        </Link>

        <Link href="/competitions/world" className="card-dark-hover p-6 block group">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center mr-4">
              <Trophy className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-xl font-semibold group-hover:text-warning transition-colors">
              World Competitions
            </h3>
          </div>
          <p className="text-dark-muted">
            World Cup, FIFA Confederations Cup, and more
          </p>
        </Link>

        <Link href="/competitions/continental" className="card-dark-hover p-6 block group">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-info/20 flex items-center justify-center mr-4">
              <Trophy className="w-6 h-6 text-info" />
            </div>
            <h3 className="text-xl font-semibold group-hover:text-info transition-colors">
              Continental Competitions
            </h3>
          </div>
          <p className="text-dark-muted">
            Euro, Copa America, Asian Cup, and more
          </p>
        </Link>

        <Link href="/matches" className="card-dark-hover p-6 block group">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-danger/20 flex items-center justify-center mr-4">
              <Calendar className="w-6 h-6 text-danger" />
            </div>
            <h3 className="text-xl font-semibold group-hover:text-danger transition-colors">
              Matches
            </h3>
          </div>
          <p className="text-dark-muted">
            View and manage international matches
          </p>
        </Link>

        <Link href="/countries" className="card-dark-hover p-6 block group">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mr-4">
              <Globe className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold group-hover:text-purple-500 transition-colors">
              Countries
            </h3>
          </div>
          <p className="text-dark-muted">
            Manage countries and national teams
          </p>
        </Link>
      </div>

      {/* Recent Matches Preview */}
      {recentMatches.length > 0 && (
        <div className="card-dark p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Matches</h2>
            <Link href="/matches" className="text-primary hover:text-primary-light transition-colors">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentMatches.slice(0, 5).map((match) => (
              <div key={match.id} className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-dark-border last:border-0">
                <div className="flex items-center space-x-4 flex-1 mb-2 md:mb-0">
                  <span className="text-sm text-dark-muted w-32 hidden md:block">
                    {match.competition_name || 'Friendly'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{match.home_name}</span>
                    <span className="text-dark-muted">vs</span>
                    <span className="font-medium">{match.away_name}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end space-x-4">
                  <span className="text-sm text-dark-muted">
                    {formatDate(match.match_date)}
                  </span>
                  <span className="text-xl font-bold">
                    {match.score_home} - {match.score_away}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
}