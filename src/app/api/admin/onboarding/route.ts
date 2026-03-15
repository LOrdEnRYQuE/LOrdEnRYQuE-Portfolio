import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { completed } = await req.json();
    
    await prisma.siteConfig.upsert({
      where: { key: "onboarding_completed" },
      update: { value: completed ? "true" : "false" },
      create: { key: "onboarding_completed", value: completed ? "true" : "false" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update onboarding status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
