"use client";

import { useCurrentUser } from "@/hooks/query/use-current-user";

export default function Preview() {
  const { data: user } = useCurrentUser();

  return (
    <div className="bg-accent w-1/2 h-full">
      <div>
        <h1>full Name: {user?.fullName}</h1>
        <h2>Title: {user?.title}</h2>
        <p>Bio: {user?.bio}</p>
        <p>Location: {user?.location}</p>
        <p>Website: {user?.website}</p>
      </div>
    </div>
  );
}
