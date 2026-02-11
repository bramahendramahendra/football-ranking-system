/**
 * API Client
 * Axios instance untuk komunikasi dengan backend
 */

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle error responses
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

// ============================================
// COUNTRIES API
// ============================================

export const countriesAPI = {
  // Get all countries
  getAll: (params = {}) => {
    return api.get('/countries', { params });
  },

  // Get country by ID
  getById: (id) => {
    return api.get(`/countries/${id}`);
  },

  // Create country
  create: (data) => {
    return api.post('/countries', data);
  },

  // Update country
  update: (id, data) => {
    return api.put(`/countries/${id}`, data);
  },

  // Delete country
  delete: (id) => {
    return api.delete(`/countries/${id}`);
  },

  // Get world rankings
  getWorldRankings: (params = {}) => {
    return api.get('/countries/rankings/world', { params });
  },

  // Get confederation rankings
  getConfederationRankings: (confederation, params = {}) => {
    return api.get(`/countries/rankings/confederation/${confederation}`, { params });
  },

  // Get ranking history
  getRankingHistory: (id, limit = 10) => {
    return api.get(`/countries/${id}/ranking-history`, { params: { limit } });
  },

  // Compare countries
  compare: (id1, id2) => {
    return api.get(`/countries/compare/${id1}/${id2}`);
  },
};

// ============================================
// COMPETITIONS API
// ============================================

export const competitionsAPI = {
  // Get all competitions
  getAll: (params = {}) => {
    return api.get('/competitions', { params });
  },

  // Get competition by ID
  getById: (id) => {
    return api.get(`/competitions/${id}`);
  },

  // Create competition
  create: (data) => {
    return api.post('/competitions', data);
  },

  // Update competition
  update: (id, data) => {
    return api.put(`/competitions/${id}`, data);
  },

  // Delete competition
  delete: (id) => {
    return api.delete(`/competitions/${id}`);
  },

  // Add participants
  addParticipants: (id, data) => {
    return api.post(`/competitions/${id}/participants`, data);
  },

  // Remove participant
  removeParticipant: (competitionId, countryId) => {
    return api.delete(`/competitions/${competitionId}/participants/${countryId}`);
  },

  // Get standings
  getStandings: (id) => {
    return api.get(`/competitions/${id}/standings`);
  },

  // Get statistics
  getStatistics: (id) => {
    return api.get(`/competitions/${id}/statistics`);
  },

  // Get matches
  getMatches: (id, params = {}) => {
    return api.get(`/competitions/${id}/matches`, { params });
  },
};

// ============================================
// MATCHES API
// ============================================

export const matchesAPI = {
  // Get all matches
  getAll: (params = {}) => {
    return api.get('/matches', { params });
  },

  // Get match by ID
  getById: (id) => {
    return api.get(`/matches/${id}`);
  },

  // Create match
  create: (data) => {
    return api.post('/matches', data);
  },

  // Delete match
  delete: (id) => {
    return api.delete(`/matches/${id}`);
  },

  // Simulate match
  simulate: (id) => {
    return api.post(`/matches/${id}/simulate`);
  },

  // Update match result
  updateResult: (id, data) => {
    return api.put(`/matches/${id}/result`, data);
  },

  // Get head to head
  getHeadToHead: (id1, id2, limit = 10) => {
    return api.get(`/matches/head-to-head/${id1}/${id2}`, { params: { limit } });
  },

  // Get upcoming matches
  getUpcoming: (limit = 10) => {
    return api.get('/matches/upcoming', { params: { limit } });
  },

  // Get recent matches
  getRecent: (limit = 10) => {
    return api.get('/matches/recent', { params: { limit } });
  },

  // Get match events
  getEvents: (id) => {
    return api.get(`/matches/${id}/events`);
  },

  // Add match event
  addEvent: (id, data) => {
    return api.post(`/matches/${id}/events`, data);
  },
};

// ============================================
// HEALTH CHECK
// ============================================

export const healthCheck = () => {
  return api.get('/health');
};

export default api;