import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import RenderField from "./components/RenderField";

// Define types for the props
type Field = {
  name: string;
  label: string;
  type: string;
};

// Define a type for the custom form props using generics
type CustomFormProps<T> = {
  fields: Field[];
  title: string;
  subTitle?: string;
  onSubmit: (data: FieldValues) => void; // Use the generic type T
  backButton?: boolean;
  backButtonLocation?: string;
  requiredFields?: boolean;
  buttonText?: string;
  forSettings?: boolean;
  GetFormData?: (data: T) => void | null; // Use the generic type T
  customButton?: React.ReactNode | null;
  marginTop?: string;
  marginTopForm?: string;
  fontSizeTitle?: string;
  fontSizeSubtitle?: string;
  hideButtons?: boolean;
  initialFormData?: T; // Use the generic type T
};

const CustomForm = <T,>({
  fields,
  title,
  onSubmit,
  subTitle,
  backButton = false,
  requiredFields = true,
  buttonText,
  forSettings,
  customButton = null,
  marginTop = "4rem",
  marginTopForm = "1.5rem",
  fontSizeTitle,
  fontSizeSubtitle,
  hideButtons = false,
}: //   initialFormData,
CustomFormProps<T>) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    // watch,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    // defaultValues: initialFormData,
  });

  const handleBackClick = () => {
    console.log("Back");
  };

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <div style={{ marginTop }} className="form">
      <h2 style={{ fontSize: fontSizeTitle, marginBottom: "0.25rem" }}>
        {title}
      </h2>
      <h5
        className="form-sub-title"
        style={{ marginTop: "0", fontSize: fontSizeSubtitle }}
      >
        {subTitle}
      </h5>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{ marginTop: marginTopForm }}
      >
        {fields.map((field, i) => (
          <RenderField
            key={i}
            field={field}
            control={control}
            setValue={setValue}
            getValues={getValues}
            reset={reset}
          />
        ))}
        {customButton ? (
          <div>
            <div className="flex justify-start align-middle gap-6">
              <button
                className={`button-settings ${
                  requiredFields
                    ? isValid
                      ? "button-primary"
                      : ""
                    : isDirty
                    ? "button-primary"
                    : ""
                }`}
                type="submit"
                disabled={requiredFields ? !isValid : !isDirty}
              >
                {buttonText}
              </button>
            </div>
          </div>
        ) : (
          !forSettings && (
            <div
              className={`${backButton ? "form-buttons-back" : "form-buttons"}`}
            >
              {backButton && (
                <div>
                  <button
                    className="button button-back"
                    type="button"
                    onClick={handleBackClick}
                  >
                    Back
                  </button>
                </div>
              )}

              {!hideButtons && (
                <div>
                  <button
                    type="submit"
                    className="button"
                    disabled={requiredFields ? !isValid : !isDirty}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )
        )}
        {forSettings && !customButton && (
          <div className="settings-button">
            <div>
              <button type="submit" className="button">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CustomForm;
