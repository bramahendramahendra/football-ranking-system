/**
 * useCountries Hook
 * Custom hook untuk operasi countries
 */

'use client';

import { useState, useEffect } from 'react';
import { countriesAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export function useCountries(initialParams = {}) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });

  const fetchCountries = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedParams = { ...initialParams, ...params };
      const response = await countriesAPI.getAll(mergedParams);
      
      setCountries(response.data || []);
      setPagination({
        page: response.pagination?.currentPage || 1,
        limit: response.pagination?.itemsPerPage || 20,
        total: response.pagination?.totalItems || 0,
      });
    } catch (err) {
      console.error('Error fetching countries:', err);
      setError(err);
      toast.error('Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const refetch = () => {
    fetchCountries();
  };

  return {
    countries,
    loading,
    error,
    pagination,
    fetchCountries,
    refetch,
  };
}