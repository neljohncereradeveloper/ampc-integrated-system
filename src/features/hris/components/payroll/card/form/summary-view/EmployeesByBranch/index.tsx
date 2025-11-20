import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { EmployeeCard } from "../EmployeeCard";

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

interface EmployeesByBranchProps {
  employeesByBranch: Record<string, Employee[]>;
}

export const EmployeesByBranch: React.FC<EmployeesByBranchProps> = ({
  employeesByBranch,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Employees by Branch</h3>
      {Object.entries(employeesByBranch).map(([branch, employees]) => (
        <Card key={branch}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 uppercase">
              <Building2 className="h-5 w-5" />
              {branch}
              <Badge variant="outline" className="ml-auto">
                {employees.length} employee{employees.length !== 1 ? "s" : ""}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="uppercase">
            <div className="space-y-3">
              {employees.map((employee) => (
                <EmployeeCard key={employee.payrollId} employee={employee} />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

