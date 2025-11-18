import { CCombobox } from "@/components/shared/combobox";
import { PAYROLL_PERIOD } from "@/lib/constants";
import { ISharedComboboxProps } from "@/lib/types";
import { useState } from "react";

const CComboboxPayPeriod: React.FC<ISharedComboboxProps> = ({
  value,
  onSelect,
  required = true,
}) => {
  const [open, setOpen] = useState(false);

  // Convert PAY_PERIOD constants to combobox data format
  const data = Object.entries(PAYROLL_PERIOD).map(([key, value]) => ({
    value: value as string,
    label: value as string,
  }));

  return (
    <CCombobox
      data={data || []} // Combobox options
      label="Pay Period"
      placeholder="Select pay period" // Ensure placeholder is shown for new rows
      value={value} // Current value for the combobox
      open={open} // Open state from context
      onOpenChange={setOpen} // Handle opening and closing
      onSelect={onSelect} // Update the pay period field
      buttonWidth="flex-1" // Full width for alignment
      required={required}
    />
  );
};

export default CComboboxPayPeriod;
