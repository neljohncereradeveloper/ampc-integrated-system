export interface PayrollBranchEntriesDto {
  payPeriod: string;
  payrollYear: string;
}

export interface PayrollBranchEntries {
  data: {
    payrollId: number;
    department: string;
    fullName: string;
    branch: string;
    jobtitle: string;
    employeestatus: string;
    payPeriodStart: string;
    payPeriodEnd: string;
    payrollYear: string;
    payPeriod: string;
    totalDeductions: string;
    totalAdditions: string;
    totalOvertimePay: string;
    totalAttendanceExceptions: string;
    totalHolidayPay: string;
    totalRenderedHours: string;
    additionEntries: {
      payrollId: number;
      code: string;
      amount: string;
      sortOrder: number;
    }[];
    deductionEntries: {
      payrollId: number;
      amount: string;
      category: string;
      code: string;
      sortOrder: number;
    }[];
    attendanceExceptionEntries: {
      payrollId: number;
      code: string;
      amount: string;
      hours: string;
      sortOrder: number;
    }[];
    overtimeEntries: {
      payrollId: number;
      hours: string;
      amount: string;
      code: string;
      sortOrder: number;
    }[];
    holidayEntries: {
      payrollId: number;
      hours: string;
      amount: string;
      code: string;
      sortOrder: number;
    }[];
  }[];
}
