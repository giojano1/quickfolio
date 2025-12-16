"use client";

import { useEffect, useRef } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { useDebounce } from "./use-debounce";
import { z } from "zod";

interface UseFormPreviewOptions<TFormData extends FieldValues> {
  formMethods: UseFormReturn<TFormData>;
  onPreview: (data: TFormData) => void;
  debounceMs?: number;
  schema: z.ZodType<TFormData>;
}

export function useFormPreview<TFormData extends FieldValues>({
  formMethods,
  onPreview,
  debounceMs = 300,
  schema,
}: UseFormPreviewOptions<TFormData>) {
  const { watch, trigger } = formMethods;

  const formData = watch();

  const debouncedFormData = useDebounce(formData, debounceMs);

  // Track if this is the first render (skip validation on mount)
  const isFirstRender = useRef(true);

  const previousDataRef = useRef<TFormData | undefined>(undefined);

  useEffect(() => {
    // Skip on first render to avoid triggering preview when form initializes
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousDataRef.current = debouncedFormData;
      return;
    }

    // Skip if data hasn't actually changed
    if (
      JSON.stringify(previousDataRef.current) ===
      JSON.stringify(debouncedFormData)
    ) {
      return;
    }

    previousDataRef.current = debouncedFormData;

    // Validate with Zod schema
    const result = schema.safeParse(debouncedFormData);

    if (result.success) {
      // Valid data - trigger react-hook-form validation to update UI errors
      trigger().then((isValid) => {
        if (isValid) {
          // Call preview callback with validated data
          onPreview(result.data);
        }
      });
    } else {
      // Invalid data - still trigger RHF validation to show errors in UI
      trigger();
    }
  }, [debouncedFormData, onPreview, trigger, schema]);
}
