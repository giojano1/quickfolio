export type UserResponse = {
  id: string;
  email: string | null;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  profileImage: string | null;
  slug: string | null;
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
  | "firstName"
  | "lastName"
  | "email"
  | "image"
  | "profileImage"
  | "slug"
>;

export type AuthUser = Pick<UserResponse, "id" | "name" | "email" | "image">;
