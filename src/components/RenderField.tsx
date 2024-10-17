// src/components/RenderField.tsx
import React from "react";
import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { Field, InputFieldProps, SelectFieldProps } from "../types";
import InputField from "./fields/InputField";
import SelectField from "./fields/SelectField";

type RenderFieldProps<TFormValues extends FieldValues> = {
  field: Field;
  control: Control<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  getValues: UseFormGetValues<TFormValues>;
  reset: UseFormReset<TFormValues>;
};

type FieldRenderer<TFormValues extends FieldValues> = {
  [key in "input" | "select"]: (
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
      field={field as InputFieldProps}
      control={control as Control<FieldValues>}
      key={field.label}
      disabled={field.disabled}
      placeholderAddon={field.placeholderAddon}
    />
  ),
  select: (field, control) => (
    <SelectField
      key={field.name}
      field={field as SelectFieldProps}
      control={control}
      disabled={field.disabled}
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
