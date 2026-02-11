/**
 * useRankings Hook
 * Custom hook untuk rankings (world & confederation)
 */

'use client';

import { useState, useEffect } from 'react';
import { countriesAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export function useWorldRankings(params = {}) {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
  });

  const fetchRankings = async (newParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedParams = { ...params, ...newParams };
      const response = await countriesAPI.getWorldRankings(mergedParams);
      
      setRankings(response.data || []);
      setPagination({
        page: response.pagination?.currentPage || 1,
        limit: response.pagination?.itemsPerPage || 50,
        total: response.pagination?.totalItems || 0,
      });
    } catch (err) {
      console.error('Error fetching world rankings:', err);
      setError(err);
      toast.error('Failed to fetch world rankings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  const refetch = () => {
    fetchRankings();
  };

  return {
    rankings,
    loading,
    error,
    pagination,
    fetchRankings,
    refetch,
  };
}

export function useConfederationRankings(confederation, params = {}) {
  const [rankings, setRankings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
  });

  const fetchRankings = async (newParams = {}) => {
    if (!confederation) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const mergedParams = { ...params, ...newParams };
      const response = await countriesAPI.getConfederationRankings(confederation, mergedParams);
      
      setRankings(response.data || []);
      setStats(response.confederation_stats || null);
      setPagination({
        page: response.pagination?.currentPage || 1,
        limit: response.pagination?.itemsPerPage || 50,
        total: response.pagination?.totalItems || 0,
      });
    } catch (err) {
      console.error('Error fetching confederation rankings:', err);
      setError(err);
      toast.error('Failed to fetch confederation rankings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, [confederation]);

  const refetch = () => {
    fetchRankings();
  };

  return {
    rankings,
    stats,
    loading,
    error,
    pagination,
    fetchRankings,
    refetch,
  };
}