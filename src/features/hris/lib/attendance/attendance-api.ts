/**
 * Attendance API Client
 * API methods for attendance feature with its own Axios instance
 */

import { createTypedApiClient } from "@/lib/api/client-factory";
import { getFeatureApiConfig } from "@/lib/api/config";
import { HRIS_FEATURES } from "../shared/hris-api-config";
import type {
  Attendance,
  AttendanceCreateDto,
  AttendanceUpdateDto,
  AttendanceFilters,
  AttendanceStats,
} from "../../types/attendance.types";
import type { PaginatedResponse } from "../../types/shared/hris.types";

// Create API client for attendance feature
const attendanceConfig = getFeatureApiConfig(HRIS_FEATURES.ATTENDANCE);
const attendanceApi = createTypedApiClient(attendanceConfig);

/**
 * Get all attendance records with optional filters
 */
export const getAttendanceList = async (
  filters?: AttendanceFilters
): Promise<PaginatedResponse<Attendance>> => {
  const params = new URLSearchParams();

  if (filters?.employeeId) params.append("employeeId", filters.employeeId);
  if (filters?.startDate) params.append("startDate", String(filters.startDate));
  if (filters?.endDate) params.append("endDate", String(filters.endDate));
  if (filters?.status) params.append("status", filters.status);
  if (filters?.departmentId)
    params.append("departmentId", filters.departmentId);

  const queryString = params.toString();
  const url = queryString ? `/attendance?${queryString}` : "/attendance";

  return attendanceApi.get<PaginatedResponse<Attendance>>(url);
};

/**
 * Get a single attendance record by ID
 */
export const getAttendance = async (id: string): Promise<Attendance> => {
  return attendanceApi.get<Attendance>(`/attendance/${id}`);
};

/**
 * Create a new attendance record
 */
export const createAttendance = async (
  data: AttendanceCreateDto
): Promise<Attendance> => {
  return attendanceApi.post<Attendance>("/attendance", data);
};

/**
 * Update an existing attendance record
 */
export const updateAttendance = async (
  id: string,
  data: AttendanceUpdateDto
): Promise<Attendance> => {
  return attendanceApi.patch<Attendance>(`/attendance/${id}`, data);
};

/**
 * Delete an attendance record
 */
export const deleteAttendance = async (id: string): Promise<void> => {
  return attendanceApi.delete<void>(`/attendance/${id}`);
};

/**
 * Get attendance statistics
 */
export const getAttendanceStats = async (
  filters?: AttendanceFilters
): Promise<AttendanceStats> => {
  const params = new URLSearchParams();

  if (filters?.startDate) params.append("startDate", String(filters.startDate));
  if (filters?.endDate) params.append("endDate", String(filters.endDate));
  if (filters?.employeeId) params.append("employeeId", filters.employeeId);
  if (filters?.departmentId)
    params.append("departmentId", filters.departmentId);

  const queryString = params.toString();
  const url = queryString
    ? `/attendance/stats?${queryString}`
    : "/attendance/stats";

  return attendanceApi.get<AttendanceStats>(url);
};
