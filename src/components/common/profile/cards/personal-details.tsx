"use client";
import FormInput from "@/components/ui/form-input";
import FormTextarea from "@/components/ui/form-textarea";
import ProfileCard from "../profile-card";
import FormWrapper from "@/components/ui/form-wrapper";
import { useTypedForm } from "@/hooks/query/use-typed-form";
import { defaultProfileValues, profileSchema } from "@/schemas/profile.schema";

export default function PersonalDetailsCard() {
  const formMethods = useTypedForm(profileSchema, {
    defaultValues: defaultProfileValues,
  });
  const { register, formState } = formMethods;

  const handleSubmit = (data: any) => {
    console.log(handleSubmit);
  };
  const isPending = false;
  return (
    <ProfileCard title="Personal Details">
      <FormWrapper
        onSubmit={handleSubmit}
        formMethods={formMethods}
        ariaLabel="Personal Details Form"
        submitButtonLabel="Save"
        submitButtonLoadingLabel="Saving..."
        isPending={false}
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
            placeholder=""
            label="Location"
            name="location"
            register={register}
            errors={formState.errors}
            disabled={isPending}
          />
          <FormInput
            placeholder=""
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
