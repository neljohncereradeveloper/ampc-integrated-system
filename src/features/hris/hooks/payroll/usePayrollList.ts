/**
 * Payroll List Hooks
 * React Query hooks for payroll list data fetching
 */

import { useQuery } from '@tanstack/react-query';
import { getPayrollList, getPayrollStats } from '../../lib/payroll/payroll-api';
import type {
  PayrollFilters,
  PayrollStats,
} from '../../types/payroll.types';
import type { PaginatedResponse, Payroll } from '../../types/shared/hris.types';

const PAYROLL_QUERY_KEYS = {
  all: ['payroll'] as const,
  lists: () => [...PAYROLL_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: PayrollFilters) => [...PAYROLL_QUERY_KEYS.lists(), filters] as const,
  stats: (filters?: PayrollFilters) => [...PAYROLL_QUERY_KEYS.all, 'stats', filters] as const,
};

/**
 * Hook to fetch payroll list with optional filters
 */
export function usePayrollList(filters?: PayrollFilters, enabled = true) {
  return useQuery<PaginatedResponse<Payroll>>({
    queryKey: PAYROLL_QUERY_KEYS.list(filters),
    queryFn: () => getPayrollList(filters),
    enabled,
  });
}

/**
 * Hook to fetch payroll statistics
 */
export function usePayrollStats(filters?: PayrollFilters, enabled = true) {
  return useQuery<PayrollStats>({
    queryKey: PAYROLL_QUERY_KEYS.stats(filters),
    queryFn: () => getPayrollStats(filters),
    enabled,
  });
}

