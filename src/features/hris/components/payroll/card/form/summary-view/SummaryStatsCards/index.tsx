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
  {
    key: "salariesAndWages",
    label: "Salaries & Wages",
    Icon: Briefcase,
    calculationLabel: "Total Gross Pay - Total Net Pay",
  },
  {
    key: "internalDeductions",
    label: "Other Deductions",
    Icon: ReceiptText,
    calculationLabel: "Total of Other Deductions",
  },
  {
    key: "employeeBenefits",
    label: "Employee Benefits",
    Icon: Umbrella,
    calculationLabel:
      "Total of Allowances. Excluding Travel, Transportation, and Communication Allowances",
  },
  {
    key: "travelAndTransportation",
    label: "Travel & Transportation",
    Icon: Plane,
    calculationLabel: "Total of Travel & Transportation Allowances",
  },
  {
    key: "philhealth",
    label: "Philhealth",
    Icon: Shield,
    calculationLabel: "Total of Philhealth Contributions",
  },
  {
    key: "hdmf",
    label: "HDMF",
    Icon: Landmark,
    calculationLabel: "Total of HDMF Contributions",
  },
  {
    key: "hdmfLoan",
    label: "HDMF Loan",
    Icon: LandmarkIcon,
    calculationLabel: "Total of HDMF Loan",
  },
  {
    key: "hdmfMp2",
    label: "HDMF MP2",
    Icon: PiggyBank,
    calculationLabel: "Total of HDMF MP2",
  },
  {
    key: "communication",
    label: "Communication",
    Icon: MessageCircle,
    calculationLabel: "Total of Communication Allowances",
  },
  {
    key: "sss",
    label: "SSS",
    Icon: Wallet2,
    calculationLabel: "Total of SSS Contributions",
  },
  {
    key: "sssLoan",
    label: "SSS Loan",
    Icon: PiggyBankIcon,
    calculationLabel: "Total of SSS Loan",
  },
  {
    key: "sssWisp",
    label: "SSS WISP",
    Icon: Banknote,
    calculationLabel: "Total of SSS WISP",
  },
  {
    key: "wTax",
    label: "Withholding Tax",
    Icon: ReceiptText,
    calculationLabel: "Total of Withholding Tax",
  },
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
            calculationLabel={config.calculationLabel}
          />
        ))}
      </div>
    </div>
  );
};
