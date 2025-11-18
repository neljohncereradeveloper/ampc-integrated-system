/**
 * Payroll Hooks
 * React Query hooks for payroll data fetching
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPayroll,
  createPayroll,
  updatePayroll,
  deletePayroll,
} from '../../lib/payroll/payroll-api';
import type {
  Payroll,
  PayrollCreateDto,
  PayrollUpdateDto,
} from '../../types/payroll.types';

const PAYROLL_QUERY_KEYS = {
  all: ['payroll'] as const,
  lists: () => [...PAYROLL_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: unknown) => [...PAYROLL_QUERY_KEYS.lists(), filters] as const,
  details: () => [...PAYROLL_QUERY_KEYS.all, 'detail'] as const,
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PayrollCreateDto) => createPayroll(data),
    onSuccess: () => {
      // Invalidate payroll list queries
      queryClient.invalidateQueries({ queryKey: PAYROLL_QUERY_KEYS.lists() });
    },
  });
}

/**
 * Hook to update a payroll record
 */
export function useUpdatePayroll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PayrollUpdateDto }) =>
      updatePayroll(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific payroll detail and list queries
      queryClient.invalidateQueries({
        queryKey: PAYROLL_QUERY_KEYS.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: PAYROLL_QUERY_KEYS.lists() });
    },
  });
}

/**
 * Hook to delete a payroll record
 */
export function useDeletePayroll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePayroll(id),
    onSuccess: (_, id) => {
      // Invalidate payroll queries
      queryClient.invalidateQueries({
        queryKey: PAYROLL_QUERY_KEYS.detail(id),
      });
      queryClient.invalidateQueries({ queryKey: PAYROLL_QUERY_KEYS.lists() });
    },
  });
}

