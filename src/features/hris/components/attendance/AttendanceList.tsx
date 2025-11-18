"use client";

/**
 * Attendance List Component
 * Displays a list of attendance records
 */

import { useAttendanceList } from "../../hooks/attendance/useAttendanceList";

interface AttendanceListProps {
  filters?: {
    employeeId?: string;
    startDate?: Date | string;
    endDate?: Date | string;
    status?: "present" | "absent" | "late" | "half-day" | "on-leave";
    departmentId?: string;
  };
}

export function AttendanceList({ filters }: AttendanceListProps) {
  const { data, isLoading, error } = useAttendanceList(filters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading attendance records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-destructive">
          Error loading attendance records: {error.message}
        </p>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">No attendance records found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Attendance Records</h2>
        <p className="text-sm text-muted-foreground">
          Total: {data.total} records
        </p>
      </div>

      <div className="space-y-2">
        {data.data.map((attendance) => (
          <div
            key={attendance.id}
            className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {attendance.employee?.firstName} {attendance.employee?.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(attendance.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {attendance.checkIn
                    ? new Date(attendance.checkIn).toLocaleTimeString()
                    : "N/A"}
                  {" - "}
                  {attendance.checkOut
                    ? new Date(attendance.checkOut).toLocaleTimeString()
                    : "Not checked out"}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs ${
                    attendance.status === "present"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : attendance.status === "late"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : attendance.status === "absent"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                  }`}
                >
                  {attendance.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

