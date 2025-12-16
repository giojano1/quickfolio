"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma/prisma";
import { logger } from "@/lib/logger";
import { userSelect } from "../selects";
import { UserResponse, UpdateProfilePayload } from "@/types/user.types";
import { profileSchema } from "@/schemas/profile.schema";

export async function updateProfileServer(
  data: UpdateProfilePayload
): Promise<UserResponse> {
  try {
    // 1. Authenticate user
    const session = await auth();

    if (!session?.user?.id) {
      logger.error("updateProfileServer: No active session", undefined, {
        timestamp: new Date().toISOString(),
        context: "authentication",
      });
      throw new Error("Unauthorized: No active session");
    }

    // 2. Validate input data
    const validatedData = profileSchema.parse(data);

    // 3. Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        fullName: validatedData.fullName,
        title: validatedData.title,
        bio: validatedData.bio || null,
        location: validatedData.location || null,
        website: validatedData.website || null,
        updatedAt: new Date(),
      },
      select: userSelect,
    });

    logger.info("updateProfileServer: Profile updated successfully", {
      userId: session.user.id,
      timestamp: new Date().toISOString(),
    });

    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      if (!error.message.includes("Unauthorized")) {
        logger.error("updateProfileServer: Unexpected error", error, {
          timestamp: new Date().toISOString(),
          context: "profile_update",
        });
      }
    }
    throw error;
  }
}
