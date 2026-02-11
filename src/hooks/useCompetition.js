/**
 * useCompetition Hook
 * Custom hook untuk single competition operations
 */

'use client';

import { useState, useEffect } from 'react';
import { competitionsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export function useCompetition(id) {
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompetition = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await competitionsAPI.getById(id);
      setCompetition(response.data);
    } catch (err) {
      console.error('Error fetching competition:', err);
      setError(err);
      toast.error('Failed to fetch competition details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetition();
  }, [id]);

  const refetch = () => {
    fetchCompetition();
  };

  return {
    competition,
    loading,
    error,
    refetch,
  };
}