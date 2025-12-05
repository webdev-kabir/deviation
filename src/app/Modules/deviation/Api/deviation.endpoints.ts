/**
 * Deviation API Endpoints
 * 
 * Centralized endpoint definitions for deviation-related API calls.
 */

export const DEVIATION_ENDPOINTS = {
  BASE: '/deviations',
  LIST: '/deviations',
  BY_ID: (id: string) => `/deviations/${id}`,
  CREATE: '/deviations',
  UPDATE: (id: string) => `/deviations/${id}`,
  DELETE: (id: string) => `/deviations/${id}`,
  STATS: '/deviations/stats',
} as const;

