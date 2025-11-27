import React from "react";
import { cn } from "@/lib/utils";
import { EMPLOYEE_STATUS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { User, Briefcase, Building2 } from "lucide-react";
import { EmployeeBreakdownCards } from "../EmployeeBreakdownCards";
import { OvertimeTable } from "../tables/OvertimeTable";
import { HolidayTable } from "../tables/HolidayTable";
import { AttendanceTable } from "../tables/AttendanceTable";
import { DeductionsTable } from "../tables/DeductionsTable";
import { AdditionsTable } from "../tables/AdditionsTable";

interface Employee {
  payrollId: number;
  fullName: string;
  employeestatus: string;
  jobtitle?: string;
  branch?: string;
  department?: string;
  totalOvertimePay?: string;
  totalHolidayPay?: string;
  totalAttendanceExceptions?: string;
  totalAdditions?: string;
  totalDeductions?: string;
  overtimeEntries?: Array<{ code: string; hours: string; amount: string }>;
  holidayEntries?: Array<{ code: string; amount: string }>;
  attendanceExceptionEntries?: Array<{
    code: string;
    hours: string;
    amount: string;
  }>;
  deductionEntries?: Array<{
    code: string;
    amount: string;
    category: string;
  }>;
  additionEntries?: Array<{ code: string; amount: string }>;
}

interface EmployeeCardProps {
  employee: Employee;
}

const getStatusBadgeVariant = (status: string) => {
  if (status === EMPLOYEE_STATUS.PROBATIONARY) {
    return "default" as const;
  }
  return "secondary" as const;
};

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <div
      className={cn(
        "border rounded-lg p-4 hover:bg-accent transition-colors",
        employee.employeestatus === EMPLOYEE_STATUS.PROBATIONARY &&
          "bg-blue-50 border-blue-200"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <User className="h-4 w-4 text-muted-foreground" />
            <h4 className="font-semibold">{employee.fullName}</h4>
            <Badge
              variant={getStatusBadgeVariant(employee.employeestatus)}
              className="text-xs"
            >
              {employee.employeestatus}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {employee.jobtitle || "N/A"}
            </div>
            <div className="flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              {employee.branch || "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Employee Breakdown */}
      {/* <EmployeeBreakdownCards
        totalOvertimePay={employee.totalOvertimePay || "0"}
        totalHolidayPay={employee.totalHolidayPay || "0"}
        totalAttendanceExceptions={employee.totalAttendanceExceptions || "0"}
        totalAdditions={employee.totalAdditions || "0"}
        totalDeductions={employee.totalDeductions || "0"}
      /> */}

      {/* Detailed Entries */}
      <div className="mt-3 space-y-3">
        <OvertimeTable entries={employee.overtimeEntries || []} />
        <HolidayTable entries={employee.holidayEntries || []} />
        <AttendanceTable entries={employee.attendanceExceptionEntries || []} />
        <DeductionsTable entries={employee.deductionEntries || []} />
        <AdditionsTable entries={employee.additionEntries || []} />
      </div>
    </div>
  );
};
