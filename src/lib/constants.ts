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

// Route paths
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  HRIS: "/hris",
} as const;
