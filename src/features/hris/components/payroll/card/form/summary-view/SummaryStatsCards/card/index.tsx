import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import { formatCurrency } from "../../utils";

interface Props {
  title: string;
  amount: number;
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  calculationLabel?: string;
}

export const CCard: React.FC<Props> = ({
  title,
  amount,
  Icon,
  calculationLabel,
}) => {
  return (
    <Card className="flex min-w-[250px] flex-col gap-1 rounded-xl border border-slate-200/60 bg-linear-to-b from-white to-slate-50/60 p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-3 p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold tracking-wide text-slate-700">
            {title}
          </CardTitle>
          <span className="rounded-full bg-slate-100 p-2">
            <Icon className="h-4 w-4 text-slate-500" />
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <p className="font-bold text-slate-900">{formatCurrency(amount)}</p>
        {calculationLabel && (
          <p className="text-xs text-muted-foreground mt-1">
            {calculationLabel}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
