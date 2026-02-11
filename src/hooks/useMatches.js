/**
 * useMatches Hook
 * Custom hook untuk operasi matches
 */

'use client';

import { useState, useEffect } from 'react';
import { matchesAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export function useMatches(initialParams = {}) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });

  const fetchMatches = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedParams = { ...initialParams, ...params };
      const response = await matchesAPI.getAll(mergedParams);
      
      setMatches(response.data || []);
      setPagination({
        page: response.pagination?.currentPage || 1,
        limit: response.pagination?.itemsPerPage || 20,
        total: response.pagination?.totalItems || 0,
      });
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError(err);
      toast.error('Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const refetch = () => {
    fetchMatches();
  };

  return {
    matches,
    loading,
    error,
    pagination,
    fetchMatches,
    refetch,
  };
}