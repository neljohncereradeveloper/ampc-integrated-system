import React from "react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../../utils";

interface AdditionEntry {
  code: string;
  amount: string;
}

interface AdditionsTableProps {
  entries: AdditionEntry[];
}

export const AdditionsTable: React.FC<AdditionsTableProps> = ({ entries }) => {
  if (!entries || entries.length === 0) return null;

  return (
    <div className="mt-3">
      <p className="font-medium text-green-700 mb-2 text-sm">Additions:</p>
      <div className="bg-green-50 border border-gray-300 rounded-md overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-green-100">
            <tr>
              <th className="text-left px-3 py-2 font-semibold text-green-900">
                Code
              </th>
              <th className="text-right px-3 py-2 font-semibold text-green-900">
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
                <td className="px-3 py-2 text-green-900">{entry.code}</td>
                <td className="px-3 py-2 text-right font-medium text-green-700">
                  {formatCurrency(parseFloat(entry.amount || "0"))}
                </td>
              </tr>
            ))}
            <tr className="bg-white font-semibold">
              <td className="px-3 py-2 text-green-900">Total</td>
              <td className="px-3 py-2 text-right text-green-900">
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

