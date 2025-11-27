import { CCombobox } from "@/components/shared/combobox";
import {
  CSharedFormButtonSubmit,
  CSharedFormInput,
  CSharedFormLabel,
} from "@/components/shared/form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useGeneratePayrollBranchEntries } from "@/features/hris/hooks/payroll/useGeneratePayrollBranchEntries";
import { PayrollBranchEntriesDto } from "@/features/hris/types/payroll.types";
import { PAYROLL_PERIOD } from "@/lib/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CSummaryView from "./summary-view";
import { Spinner } from "@/components/ui/spinner";

const CForm = () => {
  const {
    mutate: generateBranchEntries,
    isPending: isGeneratingBranchEntries,
    data: generateBranchEntriesData,
  } = useGeneratePayrollBranchEntries();

  const [payPeriodOpen, setPayPeriodOpen] = useState(false);

  const formGenerateExcelView = useForm({
    // resolver: zodResolver(ExcelViewSchema),
    defaultValues: {
      payPeriod: "",
      payrollYear: "",
    },
  });

  // Convert PAY_PERIOD constants to combobox options
  const payPeriodOptions = Object.values(PAYROLL_PERIOD).map((period) => ({
    label: period,
    value: period,
  }));

  const handleSubmit = (data: PayrollBranchEntriesDto) => {
    generateBranchEntries({
      payPeriod: data.payPeriod,
      payrollYear: data.payrollYear,
    });
  };

  return (
    <>
      <Form {...formGenerateExcelView}>
        <form onSubmit={formGenerateExcelView.handleSubmit(handleSubmit)}>
          <div className="flex gap-3 items-end">
            {/* Pay Period Combobox */}
            <FormField
              control={formGenerateExcelView.control}
              name="payPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CCombobox
                      data={payPeriodOptions}
                      label="Pay Period"
                      placeholder="Select pay period..."
                      value={field.value}
                      open={payPeriodOpen}
                      onOpenChange={setPayPeriodOpen}
                      onSelect={(value) => {
                        field.onChange(value);
                        setPayPeriodOpen(false);
                      }}
                      required={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payroll Year Input */}
            <FormField
              control={formGenerateExcelView.control}
              name="payrollYear"
              render={({ field }) => (
                <FormItem>
                  <CSharedFormLabel text="Payroll Year" />
                  <FormControl>
                    <CSharedFormInput
                      field={field}
                      placeholder="Enter year (e.g., 2024)"
                      className="h-9"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CSharedFormButtonSubmit isPending={false} className="h-9" />
          </div>
        </form>
      </Form>

      <>
        {isGeneratingBranchEntries ? (
          <div className="flex justify-center items-center h-full">
            <Spinner className="size-4 animate-spin" />
            <p>Generating branch entries...</p>
          </div>
        ) : (
          <div className="w-full">
            <CSummaryView
              data={generateBranchEntriesData?.data}
              accountEntries={generateBranchEntriesData?.accountEntries}
              grandTotal={generateBranchEntriesData?.grandTotal}
            />
          </div>
        )}
      </>
    </>
  );
};

export default CForm;
