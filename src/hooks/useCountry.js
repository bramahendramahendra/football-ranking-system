/**
 * useCountry Hook
 * Custom hook untuk single country operations
 */

'use client';

import { useState, useEffect } from 'react';
import { countriesAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export function useCountry(id) {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountry = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await countriesAPI.getById(id);
      setCountry(response.data);
    } catch (err) {
      console.error('Error fetching country:', err);
      setError(err);
      toast.error('Failed to fetch country details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [id]);

  const refetch = () => {
    fetchCountry();
  };

  return {
    country,
    loading,
    error,
    refetch,
  };
}