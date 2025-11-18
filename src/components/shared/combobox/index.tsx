/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CheckIcon, ChevronDown, RefreshCcw } from "lucide-react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { CRequriedSymbol } from "../required-symbol";
import { cn } from "@/lib/utils";
interface ComboboxItem {
  label: string;
  value: string;
}

interface StatelessComboboxProps {
  data: ComboboxItem[];
  label: string;
  placeholder?: string;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelect: (value: string) => void;
  value?: string;
  buttonWidth?: string; // Allows customizing button width
  required?: boolean;
  hasRefresh?: boolean;
  shortcut?: string; // Keyboard shortcut to display
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any[], unknown>>;
  disabled?: boolean;
}

export const CCombobox: React.FC<StatelessComboboxProps> = ({
  data,
  label,
  placeholder = "Select an option...",
  value,
  open,
  onOpenChange,
  onSelect,
  buttonWidth = "w-[200px]",
  required = false,
  hasRefresh,
  shortcut,
  refetch,
  disabled = false,
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-3">
        <Label className="text-xs">
          {`${label} ${" "}`}
          {required && <CRequriedSymbol />}
        </Label>
        <div className="flex gap-2">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(buttonWidth, "justify-between text-xs")}
              disabled={disabled}
            >
              <div className="flex items-center gap-2">
                {value
                  ? data.find((item) => item.value === value)?.label
                  : placeholder}
                {shortcut && (
                  <span className="text-xs font-bold text-muted-foreground">
                    {shortcut}
                  </span>
                )}
              </div>

              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          {hasRefresh && (
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                refetch!();
              }}
              tabIndex={-1}
            >
              <RefreshCcw />
            </Button>
          )}
        </div>
      </div>

      <PopoverContent className={cn(buttonWidth, "p-0")}>
        <Command>
          <CommandInput
            placeholder={`Search ${label.toLowerCase()}...`}
            className="h-9 text-xs"
          />
          <CommandList className="text-xs">
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => onSelect(item.value)}
                  className="uppercase text-xs"
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
