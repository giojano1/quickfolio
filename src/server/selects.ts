import { Prisma } from "@/generated/prisma/client";

export const userSelect = {
  id: true,
  email: true,
  name: true,
  fullName: true,
  firstName: true,
  lastName: true,
  image: true,
  profileImage: true,
  slug: true,
  title: true,
  bio: true,
  location: true,
  website: true,
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.UserSelect;
