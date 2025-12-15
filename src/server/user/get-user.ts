import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma/prisma";
import { logger } from "@/lib/logger";
import { userSelect } from "../selects";
import { UserResponse } from "@/types/user.types";

export async function getUserServer(): Promise<UserResponse> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      logger.error("getUserServer: No active session", undefined, {
        timestamp: new Date().toISOString(),
        context: "authentication",
      });
      throw new Error("Unauthorized: No active session");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: userSelect,
    });

    if (!user) {
      logger.error("getUserServer: User not found in database", undefined, {
        userId: session.user.id,
        timestamp: new Date().toISOString(),
        context: "user_fetch",
      });
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    if (error instanceof Error) {
      if (
        !error.message.includes("Unauthorized") &&
        !error.message.includes("User not found")
      ) {
        logger.error("getUserServer: Unexpected error", error, {
          timestamp: new Date().toISOString(),
          context: "user_fetch",
        });
      }
    }

    throw error;
  }
}
