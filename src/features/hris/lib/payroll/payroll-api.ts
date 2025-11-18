/**
 * Payroll API Client
 * API methods for payroll feature with its own Axios instance
 */

import { createTypedApiClient } from "@/lib/api/client-factory";
import { getFeatureApiConfig } from "@/lib/api/config";
import { HRIS_FEATURES } from "../shared/hris-api-config";
import type {
  Payroll,
  PayrollCreateDto,
  PayrollUpdateDto,
  PayrollFilters,
  PayrollStats,
} from "../../types/payroll.types";
import type { PaginatedResponse } from "../../types/shared/hris.types";

// Create API client for payroll feature
const payrollConfig = getFeatureApiConfig(HRIS_FEATURES.PAYROLL);
const payrollApi = createTypedApiClient(payrollConfig);

/**
 * Get all payroll records with optional filters
 */
export const getPayrollList = async (
  filters?: PayrollFilters
): Promise<PaginatedResponse<Payroll>> => {
  const params = new URLSearchParams();

  if (filters?.employeeId) params.append("employeeId", filters.employeeId);
  if (filters?.period) params.append("period", filters.period);
  if (filters?.startDate) params.append("startDate", String(filters.startDate));
  if (filters?.endDate) params.append("endDate", String(filters.endDate));
  if (filters?.status) params.append("status", filters.status);
  if (filters?.departmentId)
    params.append("departmentId", filters.departmentId);

  const queryString = params.toString();
  const url = queryString ? `/payroll?${queryString}` : "/payroll";

  return payrollApi.get<PaginatedResponse<Payroll>>(url);
};

/**
 * Get a single payroll record by ID
 */
export const getPayroll = async (id: string): Promise<Payroll> => {
  return payrollApi.get<Payroll>(`/payroll/${id}`);
};

/**
 * Create a new payroll record
 */
export const createPayroll = async (
  data: PayrollCreateDto
): Promise<Payroll> => {
  return payrollApi.post<Payroll>("/payroll", data);
};

/**
 * Update an existing payroll record
 */
export const updatePayroll = async (
  id: string,
  data: PayrollUpdateDto
): Promise<Payroll> => {
  return payrollApi.patch<Payroll>(`/payroll/${id}`, data);
};

/**
 * Delete a payroll record
 */
export const deletePayroll = async (id: string): Promise<void> => {
  return payrollApi.delete<void>(`/payroll/${id}`);
};

/**
 * Get payroll statistics
 */
export const getPayrollStats = async (
  filters?: PayrollFilters
): Promise<PayrollStats> => {
  const params = new URLSearchParams();

  if (filters?.startDate) params.append("startDate", String(filters.startDate));
  if (filters?.endDate) params.append("endDate", String(filters.endDate));
  if (filters?.employeeId) params.append("employeeId", filters.employeeId);
  if (filters?.departmentId)
    params.append("departmentId", filters.departmentId);

  const queryString = params.toString();
  const url = queryString ? `/payroll/stats?${queryString}` : "/payroll/stats";

  return payrollApi.get<PayrollStats>(url);
};
