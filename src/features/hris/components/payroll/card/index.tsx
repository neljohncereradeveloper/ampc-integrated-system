"use client";

import { CCustomCard } from "@/components/shared/card";
import CForm from "./form";

/**
 * Payroll Components
 */
export const CCard = () => {
  return (
    <>
      <CCustomCard
        content={
          <div className="flex flex-col gap-4">
            <CForm />
          </div>
        }
        title="Payroll"
        description="View and manage employee payroll records"
        action={<></>}
        footer={<></>}
      />
    </>
  );
};

export default CCard;
