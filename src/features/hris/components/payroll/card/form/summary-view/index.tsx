"use client";

import React, { useMemo, useState } from "react";
import { PayrollBranchEntries } from "@/features/hris/types/payroll.types";
import { calculateSummaryStats } from "./utils";
import { PayrollSummaryHeader } from "./PayrollSummaryHeader";
import { SummaryStatsCards } from "./SummaryStatsCards";
import { EmployeesByBranch } from "./EmployeesByBranch";
import { EmployeeSearchForm } from "./EmployeeSearchForm";

interface CSummaryViewProps {
  data: PayrollBranchEntries;
}

const CSummaryView: React.FC<CSummaryViewProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const allData = useMemo(() => {
    if (!data.data) return [];
    return data.data;
  }, [data.data]);

  // Filter employees by search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return allData;
    }

    const query = searchQuery.toLowerCase().trim();
    return allData.filter((employee) =>
      employee.fullName.toLowerCase().includes(query)
    );
  }, [allData, searchQuery]);

  // Calculate summary statistics based on filtered data
  const summaryStats = useMemo(() => {
    return calculateSummaryStats(filteredData);
  }, [filteredData]);

  // Group employees by branch
  const employeesByBranch = useMemo(() => {
    const grouped: Record<string, typeof filteredData> = {};
    filteredData.forEach((employee) => {
      const branch = employee.branch || employee.department || "Unassigned";
      if (!grouped[branch]) {
        grouped[branch] = [];
      }
      grouped[branch].push(employee);
    });
    return grouped;
  }, [filteredData]);

  if (!allData.length) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        No payroll data available
      </div>
    );
  }

  const payPeriod = allData[0]?.payPeriod || "";
  const payrollYear = allData[0]?.payrollYear || "";

  return (
    <div className="space-y-6">
      <PayrollSummaryHeader
        payPeriod={payPeriod}
        payrollYear={payrollYear}
        totalEmployees={summaryStats.totalEmployees}
      />

      <SummaryStatsCards stats={summaryStats} />

      <div className="space-y-4">
        <EmployeeSearchForm
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center p-8 text-muted-foreground border rounded-lg">
            No employees found matching "{searchQuery}"
          </div>
        ) : (
          <EmployeesByBranch employeesByBranch={employeesByBranch} />
        )}
      </div>
    </div>
  );
};

export default CSummaryView;
