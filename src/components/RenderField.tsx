import React from "react";
import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import InputField from "./fields/InputField";

type Field = {
  name: string;
  label: string;
  type: string;
  key?: string;
  disabled?: boolean;
  placeholderAddon?: boolean;
  fields?: Field[];
  required?: boolean;
};

type RenderFieldProps<TFormValues extends FieldValues> = {
  field: Field;
  control: Control<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  getValues: UseFormGetValues<TFormValues>;
  reset: UseFormReset<TFormValues>;
};

type FieldRenderer<TFormValues extends FieldValues> = {
  [key: string]: (
    field: Field,
    control: Control<TFormValues>,
    setValue: UseFormSetValue<TFormValues>,
    getValues: UseFormGetValues<TFormValues>,
    reset: UseFormReset<TFormValues>
  ) => React.ReactNode;
};

const fieldRenderer: FieldRenderer<FieldValues> = {
  input: (field, control) => (
    <InputField
      field={field}
      control={control as Control<FieldValues>}
      key={field.label}
      disabled={field.disabled}
      placeholderAddon={field.placeholderAddon}
    />
  ),
};

const RenderField = <TFormValues extends FieldValues>({
  field,
  control,
  setValue,
  getValues,
  reset,
}: RenderFieldProps<TFormValues>) => {
  return fieldRenderer[field.type]
    ? fieldRenderer[field.type](
        field,
        control as Control<FieldValues>,
        setValue as UseFormSetValue<FieldValues>,
        getValues as UseFormGetValues<FieldValues>,
        reset as UseFormReset<FieldValues>
      )
    : null;
};

export default RenderField;
