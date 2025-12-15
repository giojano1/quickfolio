import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma/prisma";
import { userSelect } from "../selects";
import { UserResponse } from "@/types/user.types";

export async function getUserServer(): Promise<UserResponse> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: No active session");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: userSelect,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
