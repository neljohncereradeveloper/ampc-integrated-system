import React from "react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../../utils";

interface OvertimeEntry {
  code: string;
  hours: string;
  amount: string;
}

interface OvertimeTableProps {
  entries: OvertimeEntry[];
}

export const OvertimeTable: React.FC<OvertimeTableProps> = ({ entries }) => {
  if (!entries || entries.length === 0) return null;

  return (
    <div>
      <p className="font-medium text-blue-700 mb-2 text-sm">Overtime:</p>
      <div className="bg-blue-50 border border-gray-300 rounded-md overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="text-left px-3 py-2 font-semibold text-blue-900">
                Code
              </th>
              <th className="text-right px-3 py-2 font-semibold text-blue-900">
                Hours
              </th>
              <th className="text-right px-3 py-2 font-semibold text-blue-900">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr
                key={entry.code}
                className={cn(
                  "bg-white border-b border-gray-200 last:border-b-0"
                )}
              >
                <td className="px-3 py-2 text-blue-900">{entry.code}</td>
                <td className="px-3 py-2 text-right text-blue-900">
                  {parseFloat(entry.hours || "0").toFixed(2)} h
                </td>
                <td className="px-3 py-2 text-right font-medium text-blue-700">
                  {formatCurrency(parseFloat(entry.amount || "0"))}
                </td>
              </tr>
            ))}
            <tr className="bg-white font-semibold">
              <td className="px-3 py-2 text-blue-900">Total</td>
              <td className="px-3 py-2 text-right text-blue-900">
                {entries
                  .reduce(
                    (sum, entry) => sum + parseFloat(entry.hours || "0"),
                    0
                  )
                  .toFixed(2)}{" "}
                h
              </td>
              <td className="px-3 py-2 text-right text-blue-900">
                {formatCurrency(
                  entries.reduce(
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
  );
};

