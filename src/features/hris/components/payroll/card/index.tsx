"use client";

import { CCustomCard } from "@/components/shared/card";
import CForm from "./form";

/**
 * Payroll Components
 */
export const CCard = () => {
  return (
    <CCustomCard
      content={
        <>
          <CForm />
        </>
      }
      title="Payroll"
      description="View and manage employee payroll records"
      action={<></>}
      footer={<></>}
    />
  );
};

export default CCard;
