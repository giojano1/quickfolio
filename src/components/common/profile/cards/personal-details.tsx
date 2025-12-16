"use client";
import FormInput from "@/components/ui/form-input";
import FormTextarea from "@/components/ui/form-textarea";
import ProfileCard from "../profile-card";
import FormWrapper from "@/components/ui/form-wrapper";

export default function PersonalDetailsCard() {
  const handleSubmit = (data: any) => {};
  return (
    <ProfileCard title="Personal Details">
      <FormWrapper
        onSubmit={handleSubmit}
        formMethods={{} as any}
        ariaLabel="Personal Details Form"
        submitButtonLabel="Save"
        submitButtonLoadingLabel="Saving..."
        isPending={false}
      >
        <div className="flex items-center gap-4">
          <FormInput placeholder="John Doe" label="Full Name" name="fullName" />
          <FormInput
            placeholder="Software Engineer"
            label="Title"
            name="title"
          />
        </div>
        <div>
          <FormTextarea
            label="Bio"
            placeholder="A short bio about yourself"
            name="bio"
            className="resize-none h-25 bg-white"
          />
        </div>
        <div className="flex items-center gap-4">
          <FormInput placeholder="" label="Location" name="location" />
          <FormInput placeholder="" label="Website" name="website" />
        </div>
      </FormWrapper>
    </ProfileCard>
  );
}
