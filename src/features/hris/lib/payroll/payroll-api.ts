/**
 * Payroll API Client
 * API methods for payroll feature with its own Axios instance
 */

import { createTypedApiClient } from "@/lib/api/client-factory";
import { getFeatureApiConfig } from "@/lib/api/config";
import { HRIS_FEATURES } from "../shared/hris-api-config";
import type {
  PayrollBranchEntries,
  PayrollBranchEntriesDto,
} from "../../types/payroll.types";

// Create API client for payroll feature
const payrollConfig = getFeatureApiConfig(HRIS_FEATURES.PAYROLL);
const payrollApi = createTypedApiClient(payrollConfig);

/**
 * Generate branch entries
 */
export const generateBranchEntries = async (
  data: PayrollBranchEntriesDto
): Promise<PayrollBranchEntries> => {
  return payrollApi.post<PayrollBranchEntries>(
    "/generate-branch-entries",
    data
  );
};
