/**
 * Application Constants
 * Konstanta yang digunakan di seluruh aplikasi
 */

// Confederations
export const CONFEDERATIONS = [
  { value: 'UEFA', label: 'UEFA', name: 'Union of European Football Associations' },
  { value: 'AFC', label: 'AFC', name: 'Asian Football Confederation' },
  { value: 'CAF', label: 'CAF', name: 'Confederation of African Football' },
  { value: 'CONCACAF', label: 'CONCACAF', name: 'Confederation of North, Central America and Caribbean Association Football' },
  { value: 'CONMEBOL', label: 'CONMEBOL', name: 'South American Football Confederation' },
  { value: 'OFC', label: 'OFC', name: 'Oceania Football Confederation' },
];

// Competition Types
export const COMPETITION_TYPES = [
  { value: 'world', label: 'World Competition' },
  { value: 'continental', label: 'Continental Competition' },
];

// Competition Formats
export const COMPETITION_FORMATS = [
  { value: 'group', label: 'Group Stage', description: 'Teams divided into groups with standings' },
  { value: 'knockout', label: 'Knockout', description: 'Direct elimination tournament' },
  { value: 'league', label: 'League', description: 'Round-robin, all teams play each other' },
  { value: 'group_knockout', label: 'Group + Knockout', description: 'Group stage followed by knockout' },
];

// Competition Status
export const COMPETITION_STATUS = [
  { value: 'upcoming', label: 'Upcoming', color: 'info' },
  { value: 'ongoing', label: 'Ongoing', color: 'success' },
  { value: 'completed', label: 'Completed', color: 'muted' },
];

// Match Status
export const MATCH_STATUS = [
  { value: 'scheduled', label: 'Scheduled', color: 'info' },
  { value: 'live', label: 'Live', color: 'danger' },
  { value: 'finished', label: 'Finished', color: 'success' },
  { value: 'postponed', label: 'Postponed', color: 'warning' },
  { value: 'cancelled', label: 'Cancelled', color: 'muted' },
];

// Match Importance Factors
export const MATCH_IMPORTANCE = [
  { value: 1.0, label: 'Friendly Match' },
  { value: 2.5, label: 'Qualification Match' },
  { value: 3.0, label: 'Continental Competition' },
  { value: 4.0, label: 'World Cup' },
];

// Match Event Types
export const EVENT_TYPES = [
  { value: 'goal', label: 'Goal', icon: '⚽' },
  { value: 'own_goal', label: 'Own Goal', icon: '🥅' },
  { value: 'penalty_goal', label: 'Penalty Goal', icon: '🎯' },
  { value: 'yellow_card', label: 'Yellow Card', icon: '🟨' },
  { value: 'red_card', label: 'Red Card', icon: '🟥' },
  { value: 'substitution', label: 'Substitution', icon: '🔄' },
];

// Recent Form Letters
export const FORM_LETTERS = {
  W: { label: 'Win', color: 'success', bgColor: 'bg-success' },
  D: { label: 'Draw', color: 'warning', bgColor: 'bg-warning' },
  L: { label: 'Loss', color: 'danger', bgColor: 'bg-danger' },
};

// Ranking Change Indicators
export const RANKING_CHANGE = {
  UP: { icon: '↑', color: 'success' },
  DOWN: { icon: '↓', color: 'danger' },
  SAME: { icon: '−', color: 'muted' },
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  LIMITS: [10, 20, 50, 100],
};

// Date Formats
export const DATE_FORMATS = {
  FULL: 'EEEE, dd MMMM yyyy',
  SHORT: 'dd MMM yyyy',
  TIME: 'HH:mm',
  DATETIME: 'dd MMM yyyy HH:mm',
  ISO: "yyyy-MM-dd'T'HH:mm:ss",
  DATE_INPUT: 'yyyy-MM-dd',
  DATETIME_INPUT: "yyyy-MM-dd'T'HH:mm",
};

// Chart Colors (for Recharts)
export const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  purple: '#8b5cf6',
  pink: '#ec4899',
};

// Navigation Menu Items
export const MENU_ITEMS = [
  {
    name: 'World Rankings',
    href: '/rankings/world',
    icon: '🌍',
  },
  {
    name: 'Confederation Rankings',
    href: '/rankings/confederation',
    icon: '🏆',
  },
  {
    name: 'World Competitions',
    href: '/competitions/world',
    icon: '⚽',
  },
  {
    name: 'Continental Competitions',
    href: '/competitions/continental',
    icon: '🌎',
  },
  {
    name: 'Matches',
    href: '/matches',
    icon: '📊',
  },
  {
    name: 'Countries',
    href: '/countries',
    icon: '🏴',
  },
];

// Confederation Colors (for visual distinction)
export const CONFEDERATION_COLORS = {
  UEFA: '#0051ba',
  AFC: '#ff0000',
  CAF: '#ffd700',
  CONCACAF: '#003087',
  CONMEBOL: '#ff6b00',
  OFC: '#0066cc',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  COUNTRY_CREATED: 'Country created successfully',
  COUNTRY_UPDATED: 'Country updated successfully',
  COUNTRY_DELETED: 'Country deleted successfully',
  COMPETITION_CREATED: 'Competition created successfully',
  COMPETITION_UPDATED: 'Competition updated successfully',
  COMPETITION_DELETED: 'Competition deleted successfully',
  MATCH_CREATED: 'Match created successfully',
  MATCH_UPDATED: 'Match updated successfully',
  MATCH_DELETED: 'Match deleted successfully',
  MATCH_SIMULATED: 'Match simulated successfully',
  PARTICIPANTS_ADDED: 'Participants added successfully',
};

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'An error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  NOT_FOUND: 'Resource not found',
  VALIDATION: 'Please check your input and try again',
};