"use client";

import { FormWrapperProps } from "@/types/component.types";
import { FieldValues } from "react-hook-form";
import { Button } from "./button";

export default function FormWrapper<T extends FieldValues>({
  onSubmit,
  formMethods,
  isPending = false,
  ariaLabel,
  submitButtonLabel,
  submitButtonLoadingLabel,
  children,
}: FormWrapperProps<T>) {
  const { handleSubmit, formState } = formMethods;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={ariaLabel}
      suppressHydrationWarning
    >
      <fieldset disabled={isPending}>
        <div className="mb-8 flex flex-col gap-6">{children}</div>

        <Button
          className="w-full"
          disabled={!formState.isValid || isPending}
          type="submit"
        >
          {isPending ? submitButtonLoadingLabel : submitButtonLabel}
        </Button>
      </fieldset>
    </form>
  );
}
