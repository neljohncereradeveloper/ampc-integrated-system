/**
 * Attendance List Hooks
 * React Query hooks for attendance list data fetching
 */

import { useQuery } from '@tanstack/react-query';
import { getAttendanceList, getAttendanceStats } from '../../lib/attendance/attendance-api';
import type {
  AttendanceFilters,
  AttendanceStats,
} from '../../types/attendance.types';
import type { PaginatedResponse, Attendance } from '../../types/shared/hris.types';

const ATTENDANCE_QUERY_KEYS = {
  all: ['attendance'] as const,
  lists: () => [...ATTENDANCE_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: AttendanceFilters) => [...ATTENDANCE_QUERY_KEYS.lists(), filters] as const,
  stats: (filters?: AttendanceFilters) => [...ATTENDANCE_QUERY_KEYS.all, 'stats', filters] as const,
};

/**
 * Hook to fetch attendance list with optional filters
 */
export function useAttendanceList(filters?: AttendanceFilters, enabled = true) {
  return useQuery<PaginatedResponse<Attendance>>({
    queryKey: ATTENDANCE_QUERY_KEYS.list(filters),
    queryFn: () => getAttendanceList(filters),
    enabled,
  });
}

/**
 * Hook to fetch attendance statistics
 */
export function useAttendanceStats(filters?: AttendanceFilters, enabled = true) {
  return useQuery<AttendanceStats>({
    queryKey: ATTENDANCE_QUERY_KEYS.stats(filters),
    queryFn: () => getAttendanceStats(filters),
    enabled,
  });
}

