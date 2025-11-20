/**
 * Utility functions for payroll summary view
 */

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(value);
};

export interface SummaryStats {
  totalOvertime: number;
  totalHoliday: number;
  totalAttendance: number;
  totalAdditions: number;
  totalDeductions: number;
  totalEmployees: number;
}

export const calculateSummaryStats = (
  employees: Array<{
    totalOvertimePay?: string;
    totalHolidayPay?: string;
    totalAttendanceExceptions?: string;
    totalAdditions?: string;
    totalDeductions?: string;
  }>
): SummaryStats => {
  return employees.reduce(
    (acc, employee) => {
      const overtime = parseFloat(employee.totalOvertimePay || "0");
      const holiday = parseFloat(employee.totalHolidayPay || "0");
      const attendance = parseFloat(
        employee.totalAttendanceExceptions || "0"
      );
      const additions = parseFloat(employee.totalAdditions || "0");
      const deductions = parseFloat(employee.totalDeductions || "0");

      return {
        totalOvertime: acc.totalOvertime + overtime,
        totalHoliday: acc.totalHoliday + holiday,
        totalAttendance: acc.totalAttendance + attendance,
        totalAdditions: acc.totalAdditions + additions,
        totalDeductions: acc.totalDeductions + deductions,
        totalEmployees: acc.totalEmployees + 1,
      };
    },
    {
      totalOvertime: 0,
      totalHoliday: 0,
      totalAttendance: 0,
      totalAdditions: 0,
      totalDeductions: 0,
      totalEmployees: 0,
    }
  );
};

