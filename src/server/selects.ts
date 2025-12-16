import { Prisma } from "@/generated/prisma/client";

export const userSelect = {
  id: true,
  email: true,
  name: true,
  firstName: true,
  lastName: true,
  image: true,
  profileImage: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.UserSelect;
