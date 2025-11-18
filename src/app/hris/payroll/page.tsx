/**
 * Payroll Page
 * List page for payroll records
 */

import { PayrollList } from "@/features/hris/components/payroll/PayrollList";

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payroll</h1>
        <p className="text-muted-foreground mt-2">
          View and manage employee payroll records
        </p>
      </div>

      <PayrollList />
    </div>
  );
}

