import React from "react";

interface PayrollSummaryHeaderProps {
  payPeriod: string;
  payrollYear: string;
  totalEmployees: number;
}

export const PayrollSummaryHeader: React.FC<PayrollSummaryHeaderProps> = ({
  payPeriod,
  payrollYear,
  totalEmployees,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Payroll Summary Report</h2>
          <p className="text-blue-100">
            {payPeriod} {payrollYear}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-100">Total Employees</p>
          <p className="text-3xl font-bold">{totalEmployees}</p>
        </div>
      </div>
    </div>
  );
};

