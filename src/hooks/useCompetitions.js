/**
 * useCompetitions Hook
 * Custom hook untuk operasi competitions
 */

'use client';

import { useState, useEffect } from 'react';
import { competitionsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export function useCompetitions(initialParams = {}) {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });

  const fetchCompetitions = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedParams = { ...initialParams, ...params };
      const response = await competitionsAPI.getAll(mergedParams);
      
      setCompetitions(response.data || []);
      setPagination({
        page: response.pagination?.currentPage || 1,
        limit: response.pagination?.itemsPerPage || 20,
        total: response.pagination?.totalItems || 0,
      });
    } catch (err) {
      console.error('Error fetching competitions:', err);
      setError(err);
      toast.error('Failed to fetch competitions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const refetch = () => {
    fetchCompetitions();
  };

  return {
    competitions,
    loading,
    error,
    pagination,
    fetchCompetitions,
    refetch,
  };
}