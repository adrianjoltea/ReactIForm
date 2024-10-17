import React from "react";
import { Control, Controller } from "react-hook-form";
import "./fields.css";
type Field = {
  name: string;
  label: string;
  required?: boolean;
  maxWidth?: string;
  placeholder?: string;
  errorMessage?: string;
  icon?: React.ReactNode;
};

type InputFieldProps = {
  field: Field;
  disabled?: boolean;
  control: Control;
  placeholderAddon?: boolean;
};
const InputField: React.FC<InputFieldProps> = ({
  field,
  disabled = false,
  control,
}) => (
  <Controller
    name={field.name}
    control={control}
    rules={
      field.required
        ? { required: field.errorMessage || "This field is required" }
        : {}
    }
    render={({ field: controllerField, fieldState: { error } }) => (
      <div
        style={{ maxWidth: field.maxWidth || "100%" }}
        className="input-container"
      >
        <label htmlFor={field.name} className="input-container-label">
          {field.icon && (
            <span style={{ marginRight: "0.5rem" }}>{field.icon}</span>
          )}
          {field.label}
        </label>
        <input
          id={field.name}
          value={controllerField.value || ""}
          onChange={controllerField.onChange}
          onBlur={controllerField.onBlur}
          disabled={disabled}
          placeholder={field.placeholder}
          className={`${error && "input-error"} input-style`}
        />
        {error && (
          <span style={{ color: "red", fontSize: "0.875rem" }}>
            {error.message}
          </span>
        )}
      </div>
    )}
  />
);

export default InputField;
