/**
 * App Context
 * Global state management untuk aplikasi
 */

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { countriesAPI, competitionsAPI, matchesAPI } from '@/lib/api';
import toast from 'react-hot-toast';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Loading states
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Data states
  const [countries, setCountries] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  // Filters and pagination
  const [filters, setFilters] = useState({
    confederation: '',
    search: '',
  });

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setInitialLoading(true);
      
      // Load countries, recent matches, and upcoming matches in parallel
      const [countriesRes, recentRes, upcomingRes] = await Promise.all([
        countriesAPI.getAll({ limit: 50 }),
        matchesAPI.getRecent(5),
        matchesAPI.getUpcoming(5),
      ]);

      setCountries(countriesRes.data || []);
      setRecentMatches(recentRes.data || []);
      setUpcomingMatches(upcomingRes.data || []);
    } catch (error) {
      console.error('Error loading initial data:', error);
      toast.error('Failed to load initial data');
    } finally {
      setInitialLoading(false);
    }
  };

  // Refresh all data
  const refreshData = async () => {
    await loadInitialData();
  };

  // Countries methods
  const fetchCountries = async (params = {}) => {
    try {
      setLoading(true);
      const response = await countriesAPI.getAll(params);
      setCountries(response.data || []);
      return response;
    } catch (error) {
      console.error('Error fetching countries:', error);
      toast.error('Failed to fetch countries');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createCountry = async (data) => {
    try {
      setLoading(true);
      const response = await countriesAPI.create(data);
      toast.success('Country created successfully');
      await fetchCountries();
      return response;
    } catch (error) {
      console.error('Error creating country:', error);
      toast.error(error.response?.data?.message || 'Failed to create country');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCountry = async (id, data) => {
    try {
      setLoading(true);
      const response = await countriesAPI.update(id, data);
      toast.success('Country updated successfully');
      await fetchCountries();
      return response;
    } catch (error) {
      console.error('Error updating country:', error);
      toast.error(error.response?.data?.message || 'Failed to update country');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteCountry = async (id) => {
    try {
      setLoading(true);
      await countriesAPI.delete(id);
      toast.success('Country deleted successfully');
      await fetchCountries();
    } catch (error) {
      console.error('Error deleting country:', error);
      toast.error(error.response?.data?.message || 'Failed to delete country');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Competitions methods
  const fetchCompetitions = async (params = {}) => {
    try {
      setLoading(true);
      const response = await competitionsAPI.getAll(params);
      setCompetitions(response.data || []);
      return response;
    } catch (error) {
      console.error('Error fetching competitions:', error);
      toast.error('Failed to fetch competitions');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createCompetition = async (data) => {
    try {
      setLoading(true);
      const response = await competitionsAPI.create(data);
      toast.success('Competition created successfully');
      await fetchCompetitions();
      return response;
    } catch (error) {
      console.error('Error creating competition:', error);
      toast.error(error.response?.data?.message || 'Failed to create competition');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCompetition = async (id, data) => {
    try {
      setLoading(true);
      const response = await competitionsAPI.update(id, data);
      toast.success('Competition updated successfully');
      await fetchCompetitions();
      return response;
    } catch (error) {
      console.error('Error updating competition:', error);
      toast.error(error.response?.data?.message || 'Failed to update competition');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteCompetition = async (id) => {
    try {
      setLoading(true);
      await competitionsAPI.delete(id);
      toast.success('Competition deleted successfully');
      await fetchCompetitions();
    } catch (error) {
      console.error('Error deleting competition:', error);
      toast.error(error.response?.data?.message || 'Failed to delete competition');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Matches methods
  const createMatch = async (data) => {
    try {
      setLoading(true);
      const response = await matchesAPI.create(data);
      toast.success('Match created successfully');
      return response;
    } catch (error) {
      console.error('Error creating match:', error);
      toast.error(error.response?.data?.message || 'Failed to create match');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const simulateMatch = async (id) => {
    try {
      setLoading(true);
      const response = await matchesAPI.simulate(id);
      toast.success('Match simulated successfully');
      await refreshData();
      return response;
    } catch (error) {
      console.error('Error simulating match:', error);
      toast.error(error.response?.data?.message || 'Failed to simulate match');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateMatchResult = async (id, data) => {
    try {
      setLoading(true);
      const response = await matchesAPI.updateResult(id, data);
      toast.success('Match result updated successfully');
      await refreshData();
      return response;
    } catch (error) {
      console.error('Error updating match result:', error);
      toast.error(error.response?.data?.message || 'Failed to update match result');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteMatch = async (id) => {
    try {
      setLoading(true);
      await matchesAPI.delete(id);
      toast.success('Match deleted successfully');
      await refreshData();
    } catch (error) {
      console.error('Error deleting match:', error);
      toast.error(error.response?.data?.message || 'Failed to delete match');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    // State
    loading,
    initialLoading,
    countries,
    competitions,
    recentMatches,
    upcomingMatches,
    filters,
    
    // Methods
    setFilters,
    refreshData,
    
    // Countries
    fetchCountries,
    createCountry,
    updateCountry,
    deleteCountry,
    
    // Competitions
    fetchCompetitions,
    createCompetition,
    updateCompetition,
    deleteCompetition,
    
    // Matches
    createMatch,
    simulateMatch,
    updateMatchResult,
    deleteMatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}