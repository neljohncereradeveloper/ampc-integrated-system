/**
 * HRIS Constants
 * Feature-specific constants for HRIS module
 */

// HRIS UI labels
export const HRIS_LABELS = {
  MODULE_NAME: "HRIS",
  ATTENDANCE: "Attendance",
  PAYROLL: "Payroll",
  DATA_FETCHING: "Data Fetching",
} as const;

// HRIS routes
export const HRIS_ROUTES = {
  BASE: "/hris",
  ATTENDANCE: "/hris/attendance",
  PAYROLL: "/hris/payroll",
} as const;

