/**
 * API Configuration
 * Central configuration for feature-based API endpoints
 */

import type { FeatureApiConfig } from "./types";

/**
 * Get API base URL from environment variables
 * Each feature can have its own API endpoint
 */
const getApiBaseURL = (envKey: string, fallback?: string): string => {
  if (typeof window === "undefined") {
    // Server-side: use process.env directly
    return process.env[envKey] || fallback || "";
  }
  // Client-side: use NEXT_PUBLIC_ prefixed variables
  return process.env[`NEXT_PUBLIC_${envKey}`] || fallback || "";
};

/**
 * Default API timeout in milliseconds
 */
const DEFAULT_TIMEOUT = parseInt(
  process.env.NEXT_PUBLIC_API_TIMEOUT || "30000",
  10
);

/**
 * Feature-based API configuration
 * Each feature can connect to a different API endpoint
 */
export const apiConfig: FeatureApiConfig = {
  // HRIS Attendance API
  hrisAttendance: {
    baseURL: getApiBaseURL(
      "HRIS_ATTENDANCE_API_URL",
      "http://localhost:3001/api/attendance"
    ),
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  },
  // HRIS Payroll API
  hrisPayroll: {
    baseURL: getApiBaseURL(
      "HRIS_PAYROLL_API_URL",
      "http://localhost:3220/api/v1/payroll"
    ),
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  },
};

/**
 * Get API configuration for a specific feature
 */
export const getFeatureApiConfig = (featureName: string) => {
  const config = apiConfig[featureName];
  if (!config) {
    throw new Error(`API configuration not found for feature: ${featureName}`);
  }
  return config;
};

/**
 * Register a new feature API configuration
 */
export const registerFeatureApi = (
  featureName: string,
  config: {
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
  }
) => {
  apiConfig[featureName] = {
    ...config,
    timeout: config.timeout || DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  };
};
