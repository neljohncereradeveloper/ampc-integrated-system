/**
 * Payroll Types
 * Types specific to the payroll feature
 */

import type { Employee } from './shared/hris.types';

export interface Payroll {
  id: string;
  employeeId: string;
  employee?: Employee;
  period: string; // Format: "YYYY-MM" or "YYYY-MM-DD to YYYY-MM-DD"
  periodStart: Date | string;
  periodEnd: Date | string;
  baseSalary: number;
  allowances: Allowance[];
  deductions: Deduction[];
  bonuses: number;
  overtime: number;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  status: PayrollStatus;
  paymentDate?: Date | string;
  notes?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type PayrollStatus = 'draft' | 'pending' | 'approved' | 'paid' | 'cancelled';

export interface Allowance {
  id: string;
  type: string;
  amount: number;
  description?: string;
}

export interface Deduction {
  id: string;
  type: string;
  amount: number;
  description?: string;
}

export interface PayrollCreateDto {
  employeeId: string;
  period: string;
  periodStart: Date | string;
  periodEnd: Date | string;
  baseSalary: number;
  allowances?: Omit<Allowance, 'id'>[];
  deductions?: Omit<Deduction, 'id'>[];
  bonuses?: number;
  overtime?: number;
  notes?: string;
}

export interface PayrollUpdateDto {
  allowances?: Omit<Allowance, 'id'>[];
  deductions?: Omit<Deduction, 'id'>[];
  bonuses?: number;
  overtime?: number;
  status?: PayrollStatus;
  paymentDate?: Date | string;
  notes?: string;
}

export interface PayrollFilters {
  employeeId?: string;
  period?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  status?: PayrollStatus;
  departmentId?: string;
}

export interface PayrollStats {
  totalGross: number;
  totalNet: number;
  totalDeductions: number;
  employeeCount: number;
  period: {
    start: Date | string;
    end: Date | string;
  };
}

