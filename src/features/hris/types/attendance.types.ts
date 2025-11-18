/**
 * Attendance Types
 * Types specific to the attendance feature
 */

import type { Employee } from './shared/hris.types';

export interface Attendance {
  id: string;
  employeeId: string;
  employee?: Employee;
  date: Date | string;
  checkIn: Date | string;
  checkOut?: Date | string;
  breakDuration?: number; // in minutes
  totalHours?: number; // calculated total working hours
  status: AttendanceStatus;
  notes?: string;
  location?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';

export interface AttendanceCreateDto {
  employeeId: string;
  date: Date | string;
  checkIn: Date | string;
  checkOut?: Date | string;
  breakDuration?: number;
  notes?: string;
  location?: string;
}

export interface AttendanceUpdateDto {
  checkOut?: Date | string;
  breakDuration?: number;
  notes?: string;
  status?: AttendanceStatus;
}

export interface AttendanceFilters {
  employeeId?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  status?: AttendanceStatus;
  departmentId?: string;
}

export interface AttendanceStats {
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  averageHours: number;
  period: {
    start: Date | string;
    end: Date | string;
  };
}

