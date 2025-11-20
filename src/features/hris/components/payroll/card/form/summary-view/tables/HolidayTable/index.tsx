import React from "react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../../utils";

interface HolidayEntry {
  code: string;
  amount: string;
}

interface HolidayTableProps {
  entries: HolidayEntry[];
}

export const HolidayTable: React.FC<HolidayTableProps> = ({ entries }) => {
  if (!entries || entries.length === 0) return null;

  return (
    <div>
      <p className="font-medium text-purple-700 mb-2 text-sm">Holiday:</p>
      <div className="bg-purple-50 border border-gray-300 rounded-md overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="text-left px-3 py-2 font-semibold text-purple-900">
                Code
              </th>
              <th className="text-right px-3 py-2 font-semibold text-purple-900">
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
                <td className="px-3 py-2 text-purple-900">{entry.code}</td>
                <td className="px-3 py-2 text-right font-medium text-purple-700">
                  {formatCurrency(parseFloat(entry.amount || "0"))}
                </td>
              </tr>
            ))}
            <tr className="bg-white font-semibold">
              <td className="px-3 py-2 text-purple-900">Total</td>
              <td className="px-3 py-2 text-right text-purple-900">
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

