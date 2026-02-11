/**
 * Utility Functions
 * Helper functions untuk formatting dan manipulasi data
 */

import { format, parseISO } from 'date-fns';
import { DATE_FORMATS } from './constants';

/**
 * Format date
 */
export const formatDate = (date, formatString = DATE_FORMATS.SHORT) => {
  if (!date) return '-';
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatString);
  } catch (error) {
    return '-';
  }
};

/**
 * Format number dengan separator
 */
export const formatNumber = (num, decimals = 2) => {
  if (num === null || num === undefined) return '-';
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Get ranking change indicator
 */
export const getRankingChange = (current, previous) => {
  if (!previous || !current) return { icon: '−', color: 'text-dark-muted' };
  
  const diff = previous - current;
  if (diff > 0) return { icon: '↑', color: 'text-success', value: diff };
  if (diff < 0) return { icon: '↓', color: 'text-danger', value: Math.abs(diff) };
  return { icon: '−', color: 'text-dark-muted', value: 0 };
};

/**
 * Get status badge color
 */
export const getStatusColor = (status) => {
  const colors = {
    upcoming: 'badge-info',
    ongoing: 'badge-success',
    completed: 'badge',
    scheduled: 'badge-info',
    live: 'badge-danger',
    finished: 'badge-success',
    postponed: 'badge-warning',
    cancelled: 'badge',
  };
  return colors[status] || 'badge';
};

/**
 * Get confederation color
 */
export const getConfederationColor = (confederation) => {
  const colors = {
    UEFA: 'text-blue-500',
    AFC: 'text-red-500',
    CAF: 'text-yellow-500',
    CONCACAF: 'text-indigo-500',
    CONMEBOL: 'text-orange-500',
    OFC: 'text-cyan-500',
  };
  return colors[confederation] || 'text-dark-text';
};

/**
 * Calculate win percentage from form string
 */
export const calculateWinPercentage = (formString) => {
  if (!formString || formString.length === 0) return 0;
  const wins = (formString.match(/W/g) || []).length;
  return (wins / formString.length) * 100;
};

/**
 * Parse form string to array
 */
export const parseFormString = (formString) => {
  if (!formString) return [];
  return formString.split('').map(letter => ({
    result: letter,
    color: letter === 'W' ? 'success' : letter === 'D' ? 'warning' : 'danger',
    label: letter === 'W' ? 'Win' : letter === 'D' ? 'Draw' : 'Loss',
  }));
};

/**
 * Get match result for a team
 */
export const getMatchResult = (match, teamId) => {
  if (match.country_home_id === teamId) {
    if (match.score_home > match.score_away) return 'W';
    if (match.score_home < match.score_away) return 'L';
    return 'D';
  } else {
    if (match.score_away > match.score_home) return 'W';
    if (match.score_away < match.score_home) return 'L';
    return 'D';
  }
};

/**
 * Truncate text
 */
export const truncate = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Group array by key
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Sort array by multiple keys
 */
export const sortBy = (array, ...keys) => {
  return array.sort((a, b) => {
    for (const key of keys) {
      const [field, order = 'asc'] = key.split(':');
      const aVal = a[field];
      const bVal = b[field];
      
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

/**
 * Validate form data
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    
    if (fieldRules.required && (!value || value === '')) {
      errors[field] = `${field} is required`;
    }
    
    if (fieldRules.min && value && value.length < fieldRules.min) {
      errors[field] = `${field} must be at least ${fieldRules.min} characters`;
    }
    
    if (fieldRules.max && value && value.length > fieldRules.max) {
      errors[field] = `${field} must be at most ${fieldRules.max} characters`;
    }
    
    if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
      errors[field] = `${field} format is invalid`;
    }
  });
  
  return errors;
};

/**
 * Generate random color
 */
export const generateColor = (seed) => {
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
    '#06b6d4', '#8b5cf6', '#ec4899', '#14b8a6'
  ];
  const index = Math.abs(seed) % colors.length;
  return colors[index];
};

/**
 * Calculate goal difference
 */
export const calculateGoalDifference = (goalsFor, goalsAgainst) => {
  const diff = goalsFor - goalsAgainst;
  if (diff > 0) return `+${diff}`;
  return diff.toString();
};

/**
 * Get ordinal suffix for ranking
 */
export const getOrdinalSuffix = (num) => {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) return num + 'st';
  if (j === 2 && k !== 12) return num + 'nd';
  if (j === 3 && k !== 13) return num + 'rd';
  return num + 'th';
};

/**
 * Format confederation name
 */
export const formatConfederationName = (code) => {
  const names = {
    UEFA: 'UEFA (Europe)',
    AFC: 'AFC (Asia)',
    CAF: 'CAF (Africa)',
    CONCACAF: 'CONCACAF (North & Central America)',
    CONMEBOL: 'CONMEBOL (South America)',
    OFC: 'OFC (Oceania)',
  };
  return names[code] || code;
};