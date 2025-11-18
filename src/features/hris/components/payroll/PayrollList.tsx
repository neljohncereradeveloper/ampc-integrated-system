"use client";

/**
 * Payroll List Component
 * Displays a list of payroll records
 */

import { usePayrollList } from "../../hooks/payroll/usePayrollList";

interface PayrollListProps {
  filters?: {
    employeeId?: string;
    period?: string;
    startDate?: Date | string;
    endDate?: Date | string;
    status?: "draft" | "pending" | "approved" | "paid" | "cancelled";
    departmentId?: string;
  };
}

export function PayrollList({ filters }: PayrollListProps) {
  const { data, isLoading, error } = usePayrollList(filters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading payroll records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-destructive">
          Error loading payroll records: {error.message}
        </p>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">No payroll records found.</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Payroll Records</h2>
        <p className="text-sm text-muted-foreground">
          Total: {data.total} records
        </p>
      </div>

      <div className="space-y-2">
        {data.data.map((payroll) => (
          <div
            key={payroll.id}
            className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {payroll.employee?.firstName} {payroll.employee?.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Period: {payroll.period}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(payroll.periodStart).toLocaleDateString()} -{" "}
                  {new Date(payroll.periodEnd).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  {formatCurrency(payroll.netSalary)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Gross: {formatCurrency(payroll.grossSalary)}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
                    payroll.status === "paid"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : payroll.status === "approved"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : payroll.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : payroll.status === "cancelled"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                  }`}
                >
                  {payroll.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

