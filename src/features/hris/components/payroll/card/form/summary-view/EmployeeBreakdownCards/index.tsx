import React from "react";
import { formatCurrency } from "../utils";

interface EmployeeBreakdownCardsProps {
  totalOvertimePay: string;
  totalHolidayPay: string;
  totalAttendanceExceptions: string;
  totalAdditions: string;
  totalDeductions: string;
}

export const EmployeeBreakdownCards: React.FC<
  EmployeeBreakdownCardsProps
> = ({
  totalOvertimePay,
  totalHolidayPay,
  totalAttendanceExceptions,
  totalAdditions,
  totalDeductions,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
      <div className="bg-blue-50 rounded p-2">
        <p className="text-xs text-muted-foreground">Overtime</p>
        <p className="font-medium text-blue-700">
          {formatCurrency(parseFloat(totalOvertimePay || "0"))}
        </p>
      </div>
      <div className="bg-purple-50 rounded p-2">
        <p className="text-xs text-muted-foreground">Holiday</p>
        <p className="font-medium text-purple-700">
          {formatCurrency(parseFloat(totalHolidayPay || "0"))}
        </p>
      </div>
      <div className="bg-orange-50 rounded p-2">
        <p className="text-xs text-muted-foreground">Attendance</p>
        <p className="font-medium text-orange-700">
          {formatCurrency(parseFloat(totalAttendanceExceptions || "0"))}
        </p>
      </div>
      <div className="bg-green-50 rounded p-2">
        <p className="text-xs text-muted-foreground">Additions</p>
        <p className="font-medium text-green-700">
          {formatCurrency(parseFloat(totalAdditions || "0"))}
        </p>
      </div>
      <div className="bg-red-50 rounded p-2">
        <p className="text-xs text-muted-foreground">Deductions</p>
        <p className="font-medium text-red-700">
          {formatCurrency(parseFloat(totalDeductions || "0"))}
        </p>
      </div>
    </div>
  );
};

