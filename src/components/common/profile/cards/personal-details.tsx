"use client";

import { useEffect } from "react";
import FormInput from "@/components/ui/form-input";
import FormTextarea from "@/components/ui/form-textarea";
import ProfileCard from "../profile-card";
import FormWrapper from "@/components/ui/form-wrapper";
import { useTypedForm } from "@/hooks/query/use-typed-form";
import {
  defaultProfileValues,
  profileSchema,
  ProfileFormData,
} from "@/schemas/profile.schema";
import { useUpdateProfile } from "@/hooks/query/use-update-profile";
import { useCurrentUser } from "@/hooks/query/use-current-user";
import { usePreviewProfile } from "@/hooks/query/use-preview-profile";
import { useFormPreview } from "@/hooks/use-form-preview";

export default function PersonalDetailsCard() {
  const { data: user } = useCurrentUser();

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const { updatePreview } = usePreviewProfile();

  const formMethods = useTypedForm(profileSchema, {
    defaultValues: defaultProfileValues,
  });

  const { register, formState, reset } = formMethods;

  // Populate form with user data when available
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        title: user.title || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
      });
    }
  }, [user, reset]);

  // Set up live preview with 300ms debounce
  useFormPreview({
    formMethods,
    onPreview: updatePreview,
    debounceMs: 300,
    schema: profileSchema,
  });

  const handleSubmit = (data: ProfileFormData) => {
    updateProfile(data);
  };

  return (
    <ProfileCard title="Personal Details">
      <FormWrapper
        onSubmit={handleSubmit}
        formMethods={formMethods}
        ariaLabel="Personal Details Form"
        submitButtonLabel="Save Changes"
        submitButtonLoadingLabel="Saving..."
        isPending={isPending}
      >
        <div className="flex items-center gap-4">
          <FormInput
            placeholder="John Doe"
            label="Full Name"
            name="fullName"
            register={register}
            errors={formState.errors}
            disabled={isPending}
            required
          />
          <FormInput
            placeholder="Software Engineer"
            label="Title"
            name="title"
            register={register}
            errors={formState.errors}
            disabled={isPending}
            required
          />
        </div>
        <div>
          <FormTextarea
            label="Bio"
            placeholder="A short bio about yourself"
            name="bio"
            className="resize-none h-25 bg-white"
            register={register}
            errors={formState.errors}
            disabled={isPending}
          />
        </div>
        <div className="flex items-center gap-4">
          <FormInput
            placeholder="San Francisco, CA"
            label="Location"
            name="location"
            register={register}
            errors={formState.errors}
            disabled={isPending}
          />
          <FormInput
            placeholder="https://yourwebsite.com"
            label="Website"
            name="website"
            register={register}
            errors={formState.errors}
            disabled={isPending}
          />
        </div>
      </FormWrapper>
    </ProfileCard>
  );
}
