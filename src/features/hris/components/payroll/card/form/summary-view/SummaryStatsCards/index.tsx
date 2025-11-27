import React from "react";
import { CCard } from "./card";
import {
  Briefcase,
  PiggyBank,
  Umbrella,
  Plane,
  Shield,
  Landmark,
  LandmarkIcon,
  Wallet2,
  Banknote,
  PiggyBankIcon,
  ReceiptText,
  MessageCircle,
} from "lucide-react";

interface Props {
  accountEntries: {
    salariesAndWages: number;
    internalDeductions: number;
    employeeBenefits: number;
    travelAndTransportation: number;
    philhealth: number;
    hdmf: number;
    hdmfLoan: number;
    hdmfMp2: number;
    sss: number;
    sssLoan: number;
    sssWisp: number;
    wTax: number;
  };
}

const cardConfig = [
  { key: "salariesAndWages", label: "Salaries & Wages", Icon: Briefcase },
  { key: "internalDeductions", label: "Other Deductions", Icon: ReceiptText },
  { key: "employeeBenefits", label: "Employee Benefits", Icon: Umbrella },
  {
    key: "travelAndTransportation",
    label: "Travel & Transportation",
    Icon: Plane,
  },
  { key: "philhealth", label: "Philhealth", Icon: Shield },
  { key: "hdmf", label: "HDMF", Icon: Landmark },
  { key: "hdmfLoan", label: "HDMF Loan", Icon: LandmarkIcon },
  { key: "hdmfMp2", label: "HDMF MP2", Icon: PiggyBank },
  { key: "communication", label: "Communication", Icon: MessageCircle },
  { key: "sss", label: "SSS", Icon: Wallet2 },
  { key: "sssLoan", label: "SSS Loan", Icon: PiggyBankIcon },
  { key: "sssWisp", label: "SSS WISP", Icon: Banknote },
  { key: "wTax", label: "Withholding Tax", Icon: ReceiptText },
] as const;

export const SummaryStatsCards: React.FC<Props> = ({ accountEntries }) => {
  return (
    <div className="rounded-2xl border bg-white/80 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Payroll Snapshot
          </p>
          <h3 className="text-xl font-semibold text-slate-900">
            Account Summary
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">
          All figures shown are in Philippine Peso (PHP)
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {cardConfig.map((config) => (
          <CCard
            key={config.key}
            title={config.label}
            amount={accountEntries[config.key as keyof typeof accountEntries]}
            Icon={config.Icon}
          />
        ))}
      </div>
    </div>
  );
};
