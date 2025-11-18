/**
 * Shared HRIS Types
 * Common types used across HRIS features
 */

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: Department;
  position: string;
  hireDate: Date | string;
  status: EmployeeStatus;
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
}

export type EmployeeStatus = 'active' | 'inactive' | 'on-leave' | 'terminated';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

