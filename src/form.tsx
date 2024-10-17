// src/form.tsx
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import RenderField from "./components/RenderField";
import "./form.css";
import "./styles/_colors.css";
import "./styles/_reset.css";
import "./styles/_sizes.css";
import { Field } from "./types";

type CustomFormProps<T> = {
  fields: Field[];
  title: string;
  subTitle?: string;
  onSubmit: (data: FieldValues) => void;
  backButton?: boolean;
  backButtonLocation?: string;
  requiredFields?: boolean;
  buttonText?: string;
  forSettings?: boolean;
  GetFormData?: (data: T) => void | null;
  customButton?: React.ReactNode | null;
  marginTop?: string;
  marginTopForm?: string;
  fontSizeTitle?: string;
  fontSizeSubtitle?: string;
  hideButtons?: boolean;
  initialFormData?: DefaultValues<FieldValues>;
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
  initialFormData,
}: CustomFormProps<T>) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: initialFormData,
  });

  const handleBackClick = () => {
    console.log("Back");
  };

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <div style={{ marginTop }} className="form-container">
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
        className="form"
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

        <div className="buttons-container">
          <button
            className={`button-form ${
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
      </form>
    </div>
  );
};

export default CustomForm;
