import React from "react";
import { Control, Controller } from "react-hook-form";

interface FieldOption {
  label: string;
  value: string | number;
}

interface Field {
  name: string;
  label: string;
  icon?: React.ReactNode;
  placeholder?: string;
  options: FieldOption[];
  maxWidth?: string;
}

interface SelectFieldProps {
  field: Field;
  disabled?: boolean;
  control: Control;
}

const SelectField: React.FC<SelectFieldProps> = ({
  field,
  disabled,
  control,
}) => {
  return (
    <Controller
      control={control}
      name={field.name}
      key={field.name}
      render={({ field: controllerField, fieldState: { error } }) => (
        <div
          className="input-container"
          style={{ maxWidth: field.maxWidth || "100%" }}
        >
          <label htmlFor={field.name} className="input-container-label">
            {field.icon && (
              <span style={{ marginRight: "0.5rem" }}>{field.icon}</span>
            )}
            {field.label}
          </label>
          <select
            value={controllerField.value || ""}
            onChange={controllerField.onChange}
            disabled={disabled}
            className={`${error && "input-error"} input-style`}
          >
            <option value="" disabled>
              {field.placeholder}
            </option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && (
            <span style={{ color: "red", fontSize: "0.875rem" }}>
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default SelectField;
