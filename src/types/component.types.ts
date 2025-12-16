import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type InputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  placeholder?: string;
  register?: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  value?: string;
  errors?: FieldErrors<T>;
  type?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
