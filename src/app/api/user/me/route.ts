import { NextResponse } from "next/server";
import { getUserServer } from "@/server/user/get-user";

export async function GET() {
  try {
    const user = await getUserServer();
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message.includes("Unauthorized") ? 401 : 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
