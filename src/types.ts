export interface FieldOption {
  label: string;
  value: string | number;
}

export interface BaseField {
  name: string;
  label: string;
  disabled?: boolean;
  placeholderAddon?: boolean;
  required?: boolean;
}

export interface InputFieldProps extends BaseField {
  type: "input";
  key?: string;
}

export interface SelectFieldProps extends BaseField {
  type: "select";
  options: FieldOption[]; // Required for select fields
}

export type Field = InputFieldProps | SelectFieldProps;
