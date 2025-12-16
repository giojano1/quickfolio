import { z } from "zod";
export const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters")
    .trim(),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be at most 100 characters")
    .trim(),
  bio: z
    .string()
    .max(500, "Bio must be at most 500 characters")
    .trim()
    .optional(),
  location: z
    .string()
    .max(100, "Location must be at most 100 characters")
    .trim()
    .optional(),
  website: z.url("Invalid URL").optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export const defaultProfileValues: ProfileFormData = {
  fullName: "",
  title: "",
  bio: "",
  location: "",
  website: "",
};
