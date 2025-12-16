import React from "react";
import PersonalDetailsCard from "./cards/personal-details";

export default function Profile() {
  return (
    <div className="p-4 w-full flex-1 ">
      <div>
        <h1 className="text-2xl font-medium">Edit Profile</h1>
        <p className="text-sm text-muted-foreground">
          Update your details to reflect your current information.
        </p>
      </div>
      {/* content */}
      <div className="w-full mt-8">
        <PersonalDetailsCard />
      </div>
    </div>
  );
}
