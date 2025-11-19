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
      config.headers.Authorization = `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE1LCJ1c2VybmFtZSI6InRlc3QiLCJmbmFtZSI6InRlc3QiLCJtbmFtZSI6InRlc3QiLCJsbmFtZSI6InRlc3QiLCJzdWZmaXgiOiJ0ZXN0Iiwicm9sZUFjY2VzcyI6IlBBWVJPTExfTUFTVEVSLEhSX0FTU09DSUFURSIsImFwcGxpY2F0aW9uQWNjZXNzIjoiTU9EVUxFX1BBWVJPTEwsTU9EVUxFX1NBTEFSWSxNT0RVTEVfMjAxRklMRSxNT0RVTEVfMjAxRklMRV9SRVBPUlQsTU9EVUxFX0dPVl9DT05UUklCVVRJT04sTU9EVUxFX0dPVl9DT05UUklCVVRJT05fUkVQT1JULE1PRFVMRV9MRUFWRSxNT0RVTEVfTEVBVkVfTU9ORVRJWkFUSU9OX1JFUE9SVCIsImJyYW5jaCI6ImhlYWQgb2ZmaWNlIiwiaWF0IjoxNzYzNTI3NTU0LCJleHAiOjE3NjM1NTYzNTR9.IRfN2MVop-QeU_JeLSmmGENNjdHb8YyMtIDG4kN-f2U"}`;
      // Add authentication token if available
      // You can customize this based on your auth implementation
      // const token =
      //   typeof window !== "undefined"
      //     ? localStorage.getItem("auth_token")
      //     : null;

      // if (token && config.headers) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }

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
