import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HTMLInputAutoCompleteAttribute } from "react";
import { ControllerRenderProps } from "react-hook-form";

/**
 * @description This is a shared form input component that is used to create a text input field.
 * @param {ControllerRenderProps<any, any>} field - The field object from react-hook-form.
 * @param {string} className - The className of the input field.
 * @param {string} placeholder - The placeholder of the input field.
 * @param {HTMLInputAutoCompleteAttribute} autoComplete - The autoComplete attribute of the input field.
 * @param {string} type - The type of the input field.
 */
export const CSharedFormInput = ({
  field,
  className,
  placeholder = "type here...",
  autoComplete = "off",
  type = "text",
  disabled = false,
}: {
  field: ControllerRenderProps<any, any>;
  className?: string;
  placeholder?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
  type?: string;
  disabled?: boolean;
}) => {
  return (
    <Input
      {...field}
      type={type}
      className={cn("text-xs", className)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      disabled={disabled}
    />
  );
};

/**
 * @description This is a shared form input component that is used to create a number input field.
 * @param {ControllerRenderProps<any, any>} field - The field object from react-hook-form.
 * @param {string} className - The className of the input field.
 * @param {string} placeholder - The placeholder of the input field.
 * @param {HTMLInputAutoCompleteAttribute} autoComplete - The autoComplete attribute of the input field.
 */
export const CSharedFormInputNumber = ({
  field,
  className,
  placeholder = "type here...",
  autoComplete = "off",
  disabled = false,
}: {
  field: ControllerRenderProps<any, any>;
  className?: string;
  placeholder?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
  disabled?: boolean;
}) => {
  return (
    <Input
      {...field}
      type="number"
      step="any"
      className={cn("text-xs", className)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(e) => field.onChange(Number(e.target.value))}
      disabled={disabled}
    />
  );
};
