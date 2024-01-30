import {
  Control,
  FieldValues,
  Path,
  FieldErrors,
  FormState,
} from "react-hook-form";


export type FormInputProps<T extends FieldValues> = {
  icon?: React.ElementType;
  label?: string;
  type?: "text" | "email" | "password";
  name: Path<T>;
  control: Control<T>;
  inputClasses?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  formState: FormState<FieldValues>;
};

export type FormDateInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  dateClass?: string;
  id?: string;
  formState: FormState<FieldValues>;
};