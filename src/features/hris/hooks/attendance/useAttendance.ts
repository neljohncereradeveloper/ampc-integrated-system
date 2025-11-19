/**
 * Attendance Hooks
 * React Query hooks for attendance data fetching
 */

import { useQuery } from '@tanstack/react-query';
import {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from '../../lib/attendance/attendance-api';
import { useAppMutation } from '@/hooks/use-app-mutation';
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
  return useAppMutation({
    mutationFn: (data: AttendanceCreateDto) => createAttendance(data),
    invalidateQueries: ATTENDANCE_QUERY_KEYS.lists(),
  });
}

/**
 * Hook to update an attendance record
 */
export function useUpdateAttendance() {
  return useAppMutation({
    mutationFn: ({ id, data }: { id: string; data: AttendanceUpdateDto }) =>
      updateAttendance(id, data),
    invalidateQueries: [
      ({ variables }) => ATTENDANCE_QUERY_KEYS.detail(variables.id),
      ATTENDANCE_QUERY_KEYS.lists(),
    ],
  });
}

/**
 * Hook to delete an attendance record
 */
export function useDeleteAttendance() {
  return useAppMutation({
    mutationFn: (id: string) => deleteAttendance(id),
    invalidateQueries: [
      ({ variables }) => ATTENDANCE_QUERY_KEYS.detail(variables),
      ATTENDANCE_QUERY_KEYS.lists(),
    ],
  });
}

