import { CCombobox } from "@/components/shared/combobox";
import { CSharedFormInput } from "@/components/shared/form/input";
import { CSharedFormLabel } from "@/components/shared/form/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PAYROLL_PERIOD } from "@/lib/constants";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CForm = () => {
  //   const { handleSubmit, formGenerateExcelView, isGeneratingExcelView } =
  //     useExcelViewContext();
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

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
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

          {/* <CSharedFormButtonNew
            isPending={isGeneratingExcelView}
            className="h-9"
          /> */}
        </div>
      </form>
    </Form>
  );
};

export default CForm;
