/**
 * Generate Payroll Branch Entries Hooks
 * React Query hooks for generate payroll branch entries data fetching
 */

import { generateBranchEntries } from "../../lib/payroll/payroll-api";
import { useAppMutation } from "@/hooks/use-app-mutation";
import type { PayrollBranchEntriesDto } from "../../types/payroll.types";

/**
 * Hook to generate payroll branch entries
 */
export function useGeneratePayrollBranchEntries() {
  return useAppMutation({
    mutationFn: (data: PayrollBranchEntriesDto) => generateBranchEntries(data),
    invalidateQueries: ["payroll-branch-entries"],
  });
}
