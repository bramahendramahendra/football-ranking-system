/**
 * useMatch Hook
 * Custom hook untuk single match operations
 */

'use client';

import { useState, useEffect } from 'react';
import { matchesAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export function useMatch(id) {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatch = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await matchesAPI.getById(id);
      setMatch(response.data);
    } catch (err) {
      console.error('Error fetching match:', err);
      setError(err);
      toast.error('Failed to fetch match details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatch();
  }, [id]);

  const refetch = () => {
    fetchMatch();
  };

  return {
    match,
    loading,
    error,
    refetch,
  };
}