export type UserResponse = {
  id: string;
  email: string | null;
  name: string | null;
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  profileImage: string | null;
  slug: string | null;
  title: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDisplayData = Pick<
  UserResponse,
  "id" | "name" | "email" | "image"
>;

export type UserProfile = Pick<
  UserResponse,
  | "id"
  | "name"
  | "fullName"
  | "firstName"
  | "lastName"
  | "email"
  | "image"
  | "profileImage"
  | "slug"
  | "title"
  | "bio"
  | "location"
  | "website"
>;

export type AuthUser = Pick<UserResponse, "id" | "name" | "email" | "image">;

export type UpdateProfilePayload = {
  fullName: string;
  title: string;
  bio?: string;
  location?: string;
  website?: string;
};
