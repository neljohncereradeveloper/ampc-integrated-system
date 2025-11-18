/**
 * Attendance Page
 * List page for attendance records
 */

import { AttendanceList } from "@/features/hris/components/attendance/AttendanceList";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance</h1>
        <p className="text-muted-foreground mt-2">
          View and manage employee attendance records
        </p>
      </div>

      <AttendanceList />
    </div>
  );
}

