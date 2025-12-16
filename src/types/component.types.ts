import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";

export type InputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;

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

export type TextareaProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;

  placeholder?: string;
  register?: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  value?: string;
  errors?: FieldErrors<T>;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};
export type FormWrapperProps<T extends FieldValues> = {
  onSubmit: (data: T) => void;
  formMethods: UseFormReturn<T>;
  isPending?: boolean;
  ariaLabel: string;
  submitButtonLabel: string;
  submitButtonLoadingLabel: string;
  children: React.ReactNode;
};
