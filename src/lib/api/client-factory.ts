/**
 * API Client Factory
 * Creates Axios instances for each feature with custom configuration
 */

import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import type { ApiClientOptions, ApiError } from "./types";

/**
 * Create a custom Axios instance for a specific feature
 */
export const createApiClient = (options: ApiClientOptions): AxiosInstance => {
  const client = axios.create({
    baseURL: options.baseURL,
    timeout: options.timeout || 30000,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Add authentication token if available
      // You can customize this based on your auth implementation
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      // Transform Axios errors into our custom ApiError format
      const apiError: ApiError = {
        message: error.message || "An error occurred",
        status: error.response?.status,
        code: error.code,
        data: error.response?.data,
      };

      // Handle specific error cases
      if (error.response?.status === 401) {
        // Unauthorized - handle logout or token refresh
        if (typeof window !== "undefined") {
          // You can add your logout logic here
          console.error("Unauthorized access - please login again");
        }
      }

      return Promise.reject(apiError);
    }
  );

  return client;
};

/**
 * Create API client with request/response type safety
 */
export const createTypedApiClient = <TRequest = unknown, TResponse = unknown>(
  options: ApiClientOptions
) => {
  const client = createApiClient(options);

  return {
    get: async <T = TResponse>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await client.get<T>(url, config);
      return response.data;
    },
    post: async <T = TResponse>(
      url: string,
      data?: TRequest,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await client.post<T>(url, data, config);
      return response.data;
    },
    put: async <T = TResponse>(
      url: string,
      data?: TRequest,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await client.put<T>(url, data, config);
      return response.data;
    },
    patch: async <T = TResponse>(
      url: string,
      data?: TRequest,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await client.patch<T>(url, data, config);
      return response.data;
    },
    delete: async <T = TResponse>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await client.delete<T>(url, config);
      return response.data;
    },
    // Expose the raw client if needed
    client,
  };
};
