/**
 * Global Constants
 * Shared constants used across the entire application
 */

// Application metadata
export const APP_NAME = "AMPC Integrated System";
export const APP_VERSION = "1.0.0";

// Common UI labels
export const UI_LABELS = {
  LOADING: "Loading...",
  ERROR: "Error",
  NOT_FOUND: "Not Found",
  RETRY: "Retry",
  CANCEL: "Cancel",
  SAVE: "Save",
  DELETE: "Delete",
  EDIT: "Edit",
} as const;

export const PAGE_URL = {
  hris: {
    attendance: "/hris/attendance",
    payroll: "/hris/payroll",
  },
};

export const EMPLOYEE_STATUS = {
  REGULAR: "regular",
  PROBATIONARY: "probationary",
  RESIGNED: "resigned",
  TERMINATED: "terminated",
  AWOL: "awol",
  END_OF_CONTRACT: "end of contract",
};

export const PAYROLL_PERIOD = {
  // January
  JANUARY_15TH: "January 15th",
  JANUARY_31ST: "January 30th",

  // February
  FEBRUARY_15TH: "February 15th",
  FEBRUARY_28TH: "February 28th", // Non-leap year
  FEBRUARY_29TH: "February 29th", // Leap year

  // March
  MARCH_15TH: "March 15th",
  MARCH_31ST: "March 30th",

  // April
  APRIL_15TH: "April 15th",
  APRIL_30TH: "April 30th",

  // May
  MAY_15TH: "May 15th",
  MAY_31ST: "May 30th",

  // June
  JUNE_15TH: "June 15th",
  JUNE_30TH: "June 30th",

  // July
  JULY_15TH: "July 15th",
  JULY_30TH: "July 30th",

  // August
  AUGUST_15TH: "August 15th",
  AUGUST_30TH: "August 30th",

  // September
  SEPTEMBER_15TH: "September 15th",
  SEPTEMBER_30TH: "September 30th",

  // October
  OCTOBER_15TH: "October 15th",
  OCTOBER_30TH: "October 30th",

  // November
  NOVEMBER_15TH: "November 15th",
  NOVEMBER_30TH: "November 30th",

  // December
  DECEMBER_15TH: "December 15th",
  DECEMBER_30TH: "December 30th",
} as const;
