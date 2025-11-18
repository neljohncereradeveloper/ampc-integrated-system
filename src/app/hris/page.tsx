/**
 * HRIS Overview Page
 * Dashboard/overview page for HRIS module
 */

export default function HRISPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">HRIS Overview</h1>
        <p className="text-muted-foreground mt-2">
          Manage your human resources information system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-2">Attendance</h3>
          <p className="text-sm text-muted-foreground">
            Track employee attendance and time records
          </p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-2">Payroll</h3>
          <p className="text-sm text-muted-foreground">
            Manage employee payroll and compensation
          </p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-2">Employees</h3>
          <p className="text-sm text-muted-foreground">
            View and manage employee information
          </p>
        </div>
      </div>
    </div>
  );
}
