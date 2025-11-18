export interface IComboboxProps {
  value: string;
  label: string;
}

export interface ISharedComboboxProps {
  value?: string;
  onSelect: (value: string) => void;
  required?: boolean;
  excludeValues?: string[];
  disabled?: boolean;
}
