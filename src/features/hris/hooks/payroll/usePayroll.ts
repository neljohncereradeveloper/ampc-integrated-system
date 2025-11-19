/**
 * Payroll Hooks
 * React Query hooks for payroll data fetching
 */

import { useQuery } from "@tanstack/react-query";
import {
  getPayroll,
  createPayroll,
  updatePayroll,
  deletePayroll,
} from "../../lib/payroll/payroll-api";
import { useAppMutation } from "@/hooks/use-app-mutation";
import type {
  Payroll,
  PayrollCreateDto,
  PayrollUpdateDto,
} from "../../types/payroll.types";

const PAYROLL_QUERY_KEYS = {
  all: ["payroll"] as const,
  lists: () => [...PAYROLL_QUERY_KEYS.all, "list"] as const,
  list: (filters?: unknown) =>
    [...PAYROLL_QUERY_KEYS.lists(), filters] as const,
  details: () => [...PAYROLL_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...PAYROLL_QUERY_KEYS.details(), id] as const,
};

/**
 * Hook to fetch a single payroll record
 */
export function usePayroll(id: string, enabled = true) {
  return useQuery({
    queryKey: PAYROLL_QUERY_KEYS.detail(id),
    queryFn: () => getPayroll(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to create a new payroll record
 */
export function useCreatePayroll() {
  return useAppMutation({
    mutationFn: (data: PayrollCreateDto) => createPayroll(data),
    invalidateQueries: PAYROLL_QUERY_KEYS.lists(),
  });
}

/**
 * Hook to update a payroll record
 */
export function useUpdatePayroll() {
  return useAppMutation({
    mutationFn: ({ id, data }: { id: string; data: PayrollUpdateDto }) =>
      updatePayroll(id, data),
    invalidateQueries: [
      ({ variables }) => PAYROLL_QUERY_KEYS.detail(variables.id),
      PAYROLL_QUERY_KEYS.lists(),
    ],
  });
}

/**
 * Hook to delete a payroll record
 */
export function useDeletePayroll() {
  return useAppMutation({
    mutationFn: (id: string) => deletePayroll(id),
    invalidateQueries: [
      ({ variables }) => PAYROLL_QUERY_KEYS.detail(variables),
      PAYROLL_QUERY_KEYS.lists(),
    ],
  });
}
