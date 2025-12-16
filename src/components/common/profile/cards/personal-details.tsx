import React from "react";
import ProfileCard from "../profile-card";
import { Input } from "@/components/ui/input";
import FormInput from "@/components/ui/form-input";

export default function PersonalDetailsCard() {
  return (
    <ProfileCard title="Personal Details">
      <div className="flex items-center gap-4">
        <FormInput placeholder="John Doe" label="Full Name" name="fullName" />
        <FormInput placeholder="Software Engineer" label="Title" name="title" />
      </div>
    </ProfileCard>
  );
}
