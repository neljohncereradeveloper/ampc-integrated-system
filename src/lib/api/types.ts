/**
 * API Configuration Types
 * Defines types for feature-based API configuration
 */

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface FeatureApiConfig {
  [featureName: string]: ApiConfig;
}

export interface ApiClientOptions {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  data?: unknown;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}
