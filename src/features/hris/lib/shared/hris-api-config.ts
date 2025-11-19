/**
 * HRIS API Configuration
 * Feature endpoint mapping for HRIS sub-features
 */

export const HRIS_FEATURES = {
  ATTENDANCE: "hrisAttendance",
  PAYROLL: "hrisPayroll",
} as const;

export type HRISFeature = (typeof HRIS_FEATURES)[keyof typeof HRIS_FEATURES];
