/**
 * Attendance Hooks
 * React Query hooks for attendance data fetching
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from '../../lib/attendance/attendance-api';
import type {
  Attendance,
  AttendanceCreateDto,
  AttendanceUpdateDto,
} from '../../types/attendance.types';

const ATTENDANCE_QUERY_KEYS = {
  all: ['attendance'] as const,
  lists: () => [...ATTENDANCE_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: unknown) => [...ATTENDANCE_QUERY_KEYS.lists(), filters] as const,
  details: () => [...ATTENDANCE_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ATTENDANCE_QUERY_KEYS.details(), id] as const,
};

/**
 * Hook to fetch a single attendance record
 */
export function useAttendance(id: string, enabled = true) {
  return useQuery({
    queryKey: ATTENDANCE_QUERY_KEYS.detail(id),
    queryFn: () => getAttendance(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to create a new attendance record
 */
export function useCreateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AttendanceCreateDto) => createAttendance(data),
    onSuccess: () => {
      // Invalidate attendance list queries
      queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEYS.lists() });
    },
  });
}

/**
 * Hook to update an attendance record
 */
export function useUpdateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AttendanceUpdateDto }) =>
      updateAttendance(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific attendance detail and list queries
      queryClient.invalidateQueries({
        queryKey: ATTENDANCE_QUERY_KEYS.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEYS.lists() });
    },
  });
}

/**
 * Hook to delete an attendance record
 */
export function useDeleteAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAttendance(id),
    onSuccess: (_, id) => {
      // Invalidate attendance queries
      queryClient.invalidateQueries({
        queryKey: ATTENDANCE_QUERY_KEYS.detail(id),
      });
      queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEYS.lists() });
    },
  });
}

