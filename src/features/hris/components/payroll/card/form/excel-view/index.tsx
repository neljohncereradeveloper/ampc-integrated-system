"use client";

import React, { useMemo } from "react";
import { EMPLOYEE_STATUS } from "@/lib/constants";
import { PayrollBranchEntries } from "@/features/hris/types/payroll.types";
import { cn } from "@/lib/utils";

interface CExcelViewProps {
  data: PayrollBranchEntries;
}

const CExcelView: React.FC<CExcelViewProps> = ({ data }) => {
  // Filter data based on selected department
  const filteredData = useMemo(() => {
    if (!data.data) return [];
    return data.data;
  }, [data.data]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Helper function to get unique codes while preserving global sort order
  const getUniqueCodesInGlobalOrder = (
    allEntries: { code: string; sortOrder: number }[]
  ) => {
    // Sort all entries globally by sortOrder
    const sortedEntries = allEntries.sort((a, b) => a.sortOrder - b.sortOrder);

    // Get unique codes while preserving order
    const seen = new Set<string>();
    const uniqueCodes: string[] = [];

    for (const entry of sortedEntries) {
      if (!seen.has(entry.code)) {
        seen.add(entry.code);
        uniqueCodes.push(entry.code);
      }
    }

    return uniqueCodes;
  };

  // Separate deductions by category - sorted by global sortOrder
  const allGovernmentDeductionEntries = filteredData.flatMap(
    (employee) =>
      employee.deductionEntries
        ?.filter((entry) => entry.category === "Government")
        ?.map((entry) => ({
          code: entry.code,
          sortOrder: entry.sortOrder,
        })) || []
  );
  const governmentDeductions = getUniqueCodesInGlobalOrder(
    allGovernmentDeductionEntries
  );

  const allInternalDeductionEntries = filteredData.flatMap(
    (employee) =>
      employee.deductionEntries
        ?.filter((entry) => entry.category === "Internal")
        ?.map((entry) => ({
          code: entry.code,
          sortOrder: entry.sortOrder,
        })) || []
  );
  const internalDeductions = getUniqueCodesInGlobalOrder(
    allInternalDeductionEntries
  );

  // Get unique addition codes from filtered employees (sorted by global sortOrder)
  const allAdditionEntries = filteredData.flatMap(
    (employee) =>
      employee.additionEntries?.map((entry) => ({
        code: entry.code,
        sortOrder: entry.sortOrder,
      })) || []
  );
  const additionCodes = getUniqueCodesInGlobalOrder(allAdditionEntries);

  // Get unique attendance exception codes from filtered employees (sorted by global sortOrder)
  const allAttendanceExceptionEntries = filteredData.flatMap(
    (employee) =>
      employee.attendanceExceptionEntries?.map((entry) => ({
        code: entry.code,
        sortOrder: entry.sortOrder,
      })) || []
  );
  const attendanceExceptionCodes = getUniqueCodesInGlobalOrder(
    allAttendanceExceptionEntries
  );

  // Get unique overtime codes from filtered employees (sorted by global sortOrder)
  const allOvertimeEntries = filteredData.flatMap(
    (employee) =>
      employee.overtimeEntries?.map((entry) => ({
        code: entry.code,
        sortOrder: entry.sortOrder,
      })) || []
  );
  const overtimeCodes = getUniqueCodesInGlobalOrder(allOvertimeEntries);

  // Get unique holiday codes from filtered employees (sorted by global sortOrder)
  const allHolidayEntries = filteredData.flatMap(
    (employee) =>
      employee.holidayEntries?.map((entry) => ({
        code: entry.code,
        sortOrder: entry.sortOrder,
      })) || []
  );
  const holidayCodes = getUniqueCodesInGlobalOrder(allHolidayEntries);

  return (
    <div className="w-full bg-white border border-gray-300">
      {/*  Header - Company and Payroll Period */}
      <div className="z-20 bg-white border-b border-gray-300">
        {/* Payroll Period Header */}
        <div className="py-2">
          <div className="text-center font-semibold text-sm">
            Final Gross {data.data[0]?.payPeriod || ""}{" "}
            {data.data[0]?.payrollYear || ""}
          </div>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="flex h-full">
          {/* Fixed Employee Information - Left Side */}
          <div className="w-2/5 border-r overflow-y-auto">
            <table className="min-w-full border-collapse">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b h-[98px]">
                  <th className="text-xs border-r px-3 py-2 bg-gray-50 min-w-[60px]">
                    #
                  </th>
                  <th className="text-xs border-r px-3 py-2 bg-gray-50 min-w-[200px]">
                    FullName
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((employee, index) => (
                  <tr
                    key={employee.payrollId}
                    className={cn(
                      "border-b border-gray-200 hover:bg-gray-50",
                      employee.employeestatus ===
                        EMPLOYEE_STATUS.PROBATIONARY &&
                        "bg-blue-200 hover:bg-blue-300",
                      index === filteredData.length - 1 ? "border-b-0" : ""
                    )}
                  >
                    <td className="text-xs border-r px-3 py-2 text-center min-w-[60px]">
                      {index + 1}
                    </td>
                    <td className="text-xs border-r px-3 py-2 min-w-[200px]">
                      {employee.fullName.toUpperCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Scrollable Financial Data - Right Side */}
          <div className="flex-1 overflow-auto">
            <table className="min-w-full border-collapse">
              <thead className="sticky top-0 bg-white z-10">
                {/* Section Headers Row 1st */}
                <tr className="w-full border-b h-8">
                  <th
                    colSpan={12}
                    className="text-xs border-r px-3 py-2 font-bold bg-blue-50 text-blue-700 text-center"
                  ></th>

                  {overtimeCodes.length > 0 && (
                    <th
                      colSpan={overtimeCodes.length * 2 + 2}
                      className="text-xs border-r px-3 py-2 font-bold bg-blue-50 text-blue-700 text-center"
                    >
                      OVERTIME
                    </th>
                  )}
                  {holidayCodes.length > 0 && (
                    <th
                      colSpan={holidayCodes.length + 2}
                      className="text-xs border-r px-3 py-2 font-bold bg-purple-50 text-purple-700 text-center"
                    >
                      HOLIDAY
                    </th>
                  )}
                  {attendanceExceptionCodes.length > 0 && (
                    <th
                      colSpan={attendanceExceptionCodes.length * 2 + 2}
                      className="text-xs border-r px-3 py-2 font-bold bg-orange-50 text-orange-700 text-center"
                    >
                      ATTENDANCE
                    </th>
                  )}
                  {additionCodes.length > 0 && (
                    <th
                      colSpan={additionCodes.length + 2}
                      className="text-xs border-r px-3 py-2 font-bold bg-green-50 text-green-700 text-center"
                    ></th>
                  )}

                  {(governmentDeductions.length > 0 ||
                    internalDeductions.length > 0) && (
                    <th
                      colSpan={
                        governmentDeductions.length +
                        internalDeductions.length +
                        1
                      }
                      className="text-xs border-r px-3 py-2 font-bold bg-red-50 text-red-700 text-center"
                    >
                      DEDUCTIONS
                    </th>
                  )}
                </tr>
                {/* Section Headers Row 2nd */}
                <tr className="w-full border-b h-8">
                  <th
                    colSpan={12}
                    className="text-xs border-r px-3 py-2 font-bold bg-blue-50 text-blue-700 text-center"
                  >
                    EMPLOYEE INFO
                  </th>

                  {overtimeCodes.map((code, index) => (
                    <th
                      key={`${code}-section-${index}`}
                      colSpan={2}
                      className="text-xs border-r px-3 py-2 font-bold bg-blue-50 text-blue-700 text-center"
                    >
                      {code}
                    </th>
                  ))}
                  {overtimeCodes.length > 0 && (
                    <th
                      colSpan={2}
                      className="text-xs border-r px-3 py-2 font-bold bg-blue-50 text-blue-700 text-center"
                    >
                      TOTAL
                    </th>
                  )}
                  {holidayCodes.length > 0 && (
                    <th
                      colSpan={holidayCodes.length + 2}
                      className="text-xs border-r px-3 py-2 font-bold bg-purple-50 text-purple-700 text-center"
                    >
                      HOLIDAY
                    </th>
                  )}
                  {attendanceExceptionCodes.map((code, index) => (
                    <th
                      key={`${code}-section-${index}`}
                      colSpan={2}
                      className="text-xs border-r px-3 py-2 font-bold bg-orange-50 text-orange-700 text-center"
                    >
                      {code}
                    </th>
                  ))}
                  {attendanceExceptionCodes.length > 0 && (
                    <th
                      colSpan={2}
                      className="text-xs border-r px-3 py-2 font-bold bg-orange-50 text-orange-700 text-center"
                    ></th>
                  )}
                  {additionCodes.length > 0 && (
                    <th
                      colSpan={additionCodes.length + 2}
                      className="text-xs border-r px-3 py-2 font-bold bg-green-50 text-green-700 text-center"
                    >
                      OTHER BENEFITS ( ADDITIONS / ADJUSTMENTS )
                    </th>
                  )}
                  {governmentDeductions.length > 0 && (
                    <th
                      colSpan={governmentDeductions.length}
                      className="text-xs border-r px-3 py-2 font-bold bg-red-50 text-red-700 text-center"
                    >
                      GOVERNMENT
                    </th>
                  )}
                  {internalDeductions.length > 0 && (
                    <th
                      colSpan={internalDeductions.length}
                      className="text-xs border-r px-3 py-2 font-bold bg-red-50 text-red-700 text-center"
                    >
                      INTERNAL
                    </th>
                  )}
                  {(governmentDeductions.length > 0 ||
                    internalDeductions.length > 0) && (
                    <th
                      colSpan={1}
                      className="text-xs border-r px-3 py-2 font-bold bg-red-50 text-red-700 text-center"
                    ></th>
                  )}
                </tr>
                {/* Section Headers Row 3rd */}
                <tr className="border-b h-8">
                  <th className="text-xs border-r px-3 py-2 bg-blue-50 text-blue-700 whitespace-nowrap min-w-[120px]">
                    Pay Period
                  </th>
                  <th className="text-xs border-r px-3 py-2 bg-blue-50 text-blue-700 whitespace-nowrap min-w-[120px]">
                    Year
                  </th>
                  <th
                    colSpan={2}
                    className="text-xs border-r px-3 py-2 bg-blue-50 text-blue-700 whitespace-nowrap min-w-[240px]"
                  >
                    Branch
                  </th>
                  <th
                    colSpan={3}
                    className="text-xs border-r px-3 py-2 bg-blue-50 text-blue-700 whitespace-nowrap min-w-[360px]"
                  >
                    Department
                  </th>
                  <th
                    colSpan={4}
                    className="text-xs border-r px-3 py-2 bg-blue-50 text-blue-700 whitespace-nowrap min-w-[480px]"
                  >
                    Job Title
                  </th>
                  <th className="text-xs border-r px-3 py-2 bg-blue-50 text-blue-700 whitespace-nowrap min-w-[120px]">
                    Status
                  </th>
                  {overtimeCodes.map((code, index) => (
                    <React.Fragment key={`${code}-section-${index}`}>
                      <th className="text-xs border-r px-3 py-2 bg-blue-50 text-blue-700 whitespace-nowrap min-w-[100px]">
                        Hours
                      </th>
                      <th
                        key={`${code}-amount-${index}`}
                        className="text-xs border-r px-3 py-2 bg-blue-50 text-blue-700 whitespace-nowrap min-w-[100px]"
                      >
                        Amount
                      </th>
                    </React.Fragment>
                  ))}
                  {overtimeCodes.length > 0 && (
                    <th
                      colSpan={2}
                      className="text-xs border-r px-3 py-2 bg-blue-50 whitespace-nowrap text-blue-700 min-w-[200px]"
                    >
                      Total
                    </th>
                  )}
                  {holidayCodes.map((code, index) => (
                    <th
                      key={`${code}-${index}`}
                      className="text-xs border-r px-3 py-2 bg-purple-50 text-purple-700 whitespace-nowrap min-w-[100px]"
                    >
                      {code}
                    </th>
                  ))}
                  {holidayCodes.length > 0 && (
                    <th
                      colSpan={2}
                      className="text-xs border-r px-3 py-2 bg-purple-50 whitespace-nowrap text-purple-700 min-w-[200px]"
                    >
                      Total
                    </th>
                  )}
                  {attendanceExceptionCodes.map((code, index) => (
                    <React.Fragment key={`${code}-section-${index}`}>
                      <th
                        key={`${code}-hours-${index}`}
                        className="text-xs border-r px-3 py-2 bg-orange-50 text-orange-700 whitespace-nowrap min-w-[100px]"
                      >
                        Hours
                      </th>
                      <th
                        key={`${code}-amount-${index}`}
                        className="text-xs border-r px-3 py-2 bg-orange-50 text-orange-700 whitespace-nowrap min-w-[100px]"
                      >
                        Amount
                      </th>
                    </React.Fragment>
                  ))}
                  {attendanceExceptionCodes.length > 0 && (
                    <th
                      colSpan={2}
                      className="text-xs border-r px-3 py-2 bg-orange-50 whitespace-nowrap text-orange-700 min-w-[200px]"
                    >
                      Total
                    </th>
                  )}
                  {additionCodes.map((code, index) => (
                    <th
                      key={`${code}-section-${index}`}
                      className="text-xs border-r px-3 py-2 bg-green-50 text-green-700 whitespace-nowrap min-w-[100px]"
                    >
                      {code}
                    </th>
                  ))}
                  {additionCodes.length > 0 && (
                    <th
                      colSpan={2}
                      className="text-xs border-r px-3 py-2 bg-green-50 whitespace-nowrap text-green-700 min-w-[200px]"
                    >
                      Total
                    </th>
                  )}

                  {governmentDeductions.map((code, index) => (
                    <th
                      key={`${code}-section-${index}`}
                      className="text-xs border-r px-3 py-2 bg-red-50 text-red-700 whitespace-nowrap min-w-[100px]"
                    >
                      {code}
                    </th>
                  ))}
                  {internalDeductions.map((code, index) => (
                    <th
                      key={`${code}-section-${index}`}
                      className="text-xs border-r px-3 py-2 bg-red-50 text-red-700 whitespace-nowrap min-w-[100px]"
                    >
                      {code}
                    </th>
                  ))}
                  {(governmentDeductions.length > 0 ||
                    internalDeductions.length > 0) && (
                    <th
                      colSpan={1}
                      className="text-xs border-r px-3 py-2 bg-red-50 whitespace-nowrap text-red-700 min-w-[100px]"
                    >
                      Total
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((employee, index) => {
                  // Calculate total overtime for this employee
                  const employeeTotalOvertime =
                    employee.overtimeEntries?.reduce(
                      (sum, entry) => sum + parseFloat(entry.amount || "0"),
                      0
                    ) || 0;

                  // Calculate total holiday for this employee
                  const employeeTotalHoliday =
                    employee.holidayEntries?.reduce(
                      (sum, entry) => sum + parseFloat(entry.amount || "0"),
                      0
                    ) || 0;

                  // Calculate total attendance exception for this employee
                  const employeeTotalAttendanceException =
                    employee.attendanceExceptionEntries?.reduce(
                      (sum, entry) => sum + parseFloat(entry.amount || "0"),
                      0
                    ) || 0;

                  // Calculate total deduction for this employee
                  const employeeTotalDeduction =
                    employee.deductionEntries?.reduce(
                      (sum, entry) => sum + parseFloat(entry.amount || "0"),
                      0
                    ) || 0;

                  // Calculate total addition for this employee
                  const employeeTotalAddition =
                    employee.additionEntries?.reduce(
                      (sum, entry) => sum + parseFloat(entry.amount || "0"),
                      0
                    ) || 0;

                  return (
                    <tr
                      key={employee.payrollId}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      {/* Pay Period */}
                      <td className="text-xs border-r px-3 py-2 text-center bg-blue-50 min-w-[120px]">
                        {(employee.payPeriod || "-").toUpperCase()}
                      </td>
                      {/* Year */}
                      <td className="text-xs border-r px-3 py-2 text-center bg-blue-50 min-w-[120px]">
                        {(employee.payrollYear || "-").toUpperCase()}
                      </td>
                      {/* Branch */}
                      <td
                        colSpan={2}
                        className="text-xs border-r px-3 py-2 text-center bg-blue-50 min-w-[240px]"
                      >
                        {(employee.branch || "-").toUpperCase()}
                      </td>
                      {/* Department */}
                      <td
                        colSpan={3}
                        className="text-xs border-r px-3 py-2 text-center bg-blue-50 min-w-[360px]"
                      >
                        {(employee.department || "-").toUpperCase()}
                      </td>
                      {/* Job Title */}
                      <td
                        colSpan={4}
                        className="text-xs border-r px-3 py-2 text-center bg-blue-50 min-w-[480px]"
                      >
                        {(employee.jobtitle || "-").toUpperCase()}
                      </td>
                      {/* Status */}
                      <td className="text-xs border-r px-3 py-2 text-center bg-blue-50 min-w-[120px]">
                        {(employee.employeestatus || "-").toUpperCase()}
                      </td>

                      {/* Overtime Entries */}
                      {overtimeCodes.map((code, index) => {
                        const overtime = employee.overtimeEntries?.find(
                          (entry) => entry.code === code
                        );
                        return (
                          <React.Fragment key={`${code}-section-${index}`}>
                            <td className="text-xs border-r px-3 py-2 text-center bg-blue-50 min-w-[100px]">
                              {overtime
                                ? parseFloat(overtime.hours || "0").toFixed(2)
                                : "-"}
                            </td>
                            <td
                              key={`${code}-amount-${index}`}
                              className="text-xs border-r px-3 py-2 text-center bg-blue-50 min-w-[100px]"
                            >
                              {overtime
                                ? formatCurrency(
                                    parseFloat(overtime.amount || "0")
                                  )
                                : "-"}
                            </td>
                          </React.Fragment>
                        );
                      })}
                      {overtimeCodes.length > 0 && (
                        <td
                          colSpan={2}
                          className="text-xs border-r px-3 py-2 text-center bg-blue-50 text-blue-700 font-semibold min-w-[200px]"
                        >
                          {employeeTotalOvertime > 0
                            ? formatCurrency(employeeTotalOvertime)
                            : "-"}
                        </td>
                      )}

                      {/* Holiday Entries */}
                      {holidayCodes.map((code, index) => {
                        const holiday = employee.holidayEntries?.find(
                          (entry) => entry.code === code
                        );
                        return (
                          <td
                            key={`${code}-${index}`}
                            className="text-xs border-r px-3 py-2 text-center bg-purple-50 min-w-[100px]"
                          >
                            {holiday
                              ? formatCurrency(
                                  parseFloat(holiday.amount || "0")
                                )
                              : "-"}
                          </td>
                        );
                      })}
                      {holidayCodes.length > 0 && (
                        <td
                          colSpan={2}
                          className="text-xs border-r px-3 py-2 text-center bg-purple-50 text-purple-700 font-semibold min-w-[200px]"
                        >
                          {employeeTotalHoliday > 0
                            ? formatCurrency(employeeTotalHoliday)
                            : "-"}
                        </td>
                      )}

                      {/* Attendance Exception Entries */}
                      {attendanceExceptionCodes.map((code, index) => {
                        const attendanceException =
                          employee.attendanceExceptionEntries?.find(
                            (entry) => entry.code === code
                          );
                        return (
                          <React.Fragment key={`${code}-section-${index}`}>
                            <td className="text-xs border-r px-3 py-2 text-center bg-orange-50 min-w-[100px]">
                              {attendanceException
                                ? parseFloat(
                                    attendanceException.hours || "0"
                                  ).toFixed(2)
                                : "-"}
                            </td>
                            <td
                              key={`${code}-amount`}
                              className="text-xs border-r px-3 py-2 text-center bg-orange-50 min-w-[100px]"
                            >
                              {attendanceException
                                ? formatCurrency(
                                    parseFloat(
                                      attendanceException.amount || "0"
                                    )
                                  )
                                : "-"}
                            </td>
                          </React.Fragment>
                        );
                      })}
                      {attendanceExceptionCodes.length > 0 && (
                        <td
                          colSpan={2}
                          className="text-xs border-r px-3 py-2 text-center bg-orange-50 text-orange-700 font-semibold min-w-[200px]"
                        >
                          {employeeTotalAttendanceException > 0
                            ? formatCurrency(employeeTotalAttendanceException)
                            : "-"}
                        </td>
                      )}

                      {/* Addition Entries */}
                      {additionCodes.map((code) => {
                        const addition = employee.additionEntries?.find(
                          (entry) => entry.code === code
                        );
                        return (
                          <td
                            key={code}
                            className="text-xs border-r px-3 py-2 text-center bg-green-50 min-w-[100px]"
                          >
                            {addition
                              ? formatCurrency(
                                  parseFloat(addition.amount || "0")
                                )
                              : "-"}
                          </td>
                        );
                      })}
                      {additionCodes.length > 0 && (
                        <td
                          colSpan={2}
                          className="text-xs border-r px-3 py-2 text-center bg-green-50 text-green-700 font-semibold min-w-[200px]"
                        >
                          {employeeTotalAddition > 0
                            ? formatCurrency(employeeTotalAddition)
                            : "-"}
                        </td>
                      )}

                      {/* Deduction Entries - Government */}
                      {governmentDeductions.map((code) => {
                        const deduction = employee.deductionEntries?.find(
                          (entry) => entry.code === code
                        );
                        return (
                          <td
                            key={code}
                            className="text-xs border-r px-3 py-2 text-center bg-red-50 min-w-[100px]"
                          >
                            {deduction
                              ? formatCurrency(
                                  parseFloat(deduction.amount || "0")
                                )
                              : "-"}
                          </td>
                        );
                      })}
                      {/* Deduction Entries - Internal */}
                      {internalDeductions.map((code) => {
                        const deduction = employee.deductionEntries?.find(
                          (entry) => entry.code === code
                        );
                        return (
                          <td
                            key={code}
                            className="text-xs border-r px-3 py-2 text-center bg-red-50 min-w-[100px]"
                          >
                            {deduction
                              ? formatCurrency(
                                  parseFloat(deduction.amount || "0")
                                )
                              : "-"}
                          </td>
                        );
                      })}
                      {(governmentDeductions.length > 0 ||
                        internalDeductions.length > 0) && (
                        <td
                          colSpan={1}
                          className="text-xs border-r px-3 py-2 text-center bg-red-50 text-red-700 font-semibold min-w-[100px]"
                        >
                          {employeeTotalDeduction > 0
                            ? formatCurrency(employeeTotalDeduction)
                            : "-"}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CExcelView;
