import React from "react";
import { Control, Controller } from "react-hook-form";

// Define types for the props
type Field = {
  name: string;
  label: string;
  required?: boolean;
  maxWidth?: string;
  placeholder?: string;
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
  placeholderAddon = true,
}) => (
  <Controller
    name={field.name}
    control={control}
    rules={field.required ? { required: "This field is required" } : {}}
    render={({ field: controllerField, fieldState: { error } }) => (
      <div style={{ maxWidth: field.maxWidth || "100%", marginBottom: "1rem" }}>
        <label
          htmlFor={field.name}
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
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
          placeholder={placeholderAddon ? undefined : field.placeholder}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderColor: error ? "red" : "#ccc",
          }}
        />
        {placeholderAddon && field.placeholder && (
          <span style={{ marginLeft: "0.5rem" }}>{field.placeholder}</span>
        )}
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
