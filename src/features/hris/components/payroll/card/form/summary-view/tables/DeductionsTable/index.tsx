import React from "react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../../utils";

interface DeductionEntry {
  code: string;
  amount: string;
  category: string;
}

interface DeductionsTableProps {
  entries: DeductionEntry[];
}

export const DeductionsTable: React.FC<DeductionsTableProps> = ({
  entries,
}) => {
  if (!entries || entries.length === 0) return null;

  const governmentDeductions = entries.filter(
    (entry) => entry.category === "Government"
  );
  const internalDeductions = entries.filter(
    (entry) => entry.category === "Internal"
  );

  return (
    <div className="mt-3">
      <p className="font-medium text-red-700 mb-2 text-sm">Deductions:</p>

      {/* Government Deductions Table */}
      {governmentDeductions.length > 0 && (
        <div className="mb-3">
          <div className="bg-red-100 border border-gray-300 rounded-t-md px-3 py-2">
            <p className="text-xs font-semibold text-red-800">
              Government Deductions
            </p>
          </div>
          <div className="border border-t-0 border-gray-300 rounded-b-md overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-red-900">
                    Code
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-red-900">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {governmentDeductions.map((entry, idx) => (
                  <tr
                    key={entry.code}
                    className={cn(
                      "bg-white border-b border-gray-200 last:border-b-0"
                    )}
                  >
                    <td className="px-3 py-2 text-red-900">{entry.code}</td>
                    <td className="px-3 py-2 text-right font-medium text-red-700">
                      {formatCurrency(parseFloat(entry.amount || "0"))}
                    </td>
                  </tr>
                ))}
                <tr className="bg-white font-semibold">
                  <td className="px-3 py-2 text-red-900">Total</td>
                  <td className="px-3 py-2 text-right text-red-900">
                    {formatCurrency(
                      governmentDeductions.reduce(
                        (sum, entry) => sum + parseFloat(entry.amount || "0"),
                        0
                      )
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Internal Deductions Table */}
      {internalDeductions.length > 0 && (
        <div>
          <div className="bg-red-100 border border-gray-300 rounded-t-md px-3 py-2">
            <p className="text-xs font-semibold text-red-800">
              Internal Deductions
            </p>
          </div>
          <div className="border border-t-0 border-gray-300 rounded-b-md overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-red-900">
                    Code
                  </th>
                  <th className="text-right px-3 py-2 font-semibold text-red-900">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {internalDeductions.map((entry, idx) => (
                  <tr
                    key={entry.code}
                    className={cn(
                      "bg-white border-b border-gray-200 last:border-b-0"
                    )}
                  >
                    <td className="px-3 py-2 text-red-900">{entry.code}</td>
                    <td className="px-3 py-2 text-right font-medium text-red-700">
                      {formatCurrency(parseFloat(entry.amount || "0"))}
                    </td>
                  </tr>
                ))}
                <tr className="bg-white font-semibold">
                  <td className="px-3 py-2 text-red-900">Total</td>
                  <td className="px-3 py-2 text-right text-red-900">
                    {formatCurrency(
                      internalDeductions.reduce(
                        (sum, entry) => sum + parseFloat(entry.amount || "0"),
                        0
                      )
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

