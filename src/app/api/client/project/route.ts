import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Try to find an active project for this user
    let project = await prisma.project.findFirst({
      where: { userId: session.user.id },
      include: {
        stages: {
          orderBy: { order: "asc" },
        },
      },
    });

    // Seed a default project if none exists (for production readiness demo)
    if (!project) {
      project = await prisma.project.create({
        data: {
          title: "Premium Brand Platform",
          description: "End-to-end digital transformation and AI integration.",
          status: "ACTIVE",
          health: "STABLE",
          efficiency: 94,
          userId: session.user.id,
          stages: {
            create: [
              { title: "Discovery & Strategy", description: "Market research and technical roadmap.", status: "COMPLETED", order: 1 },
              { title: "Architecture Design", description: "Schema definition and cloud infrastructure.", status: "COMPLETED", order: 2 },
              { title: "Development Phase", description: "Core feature implementation and integration.", status: "IN_PROGRESS", order: 3 },
              { title: "Quality Assurance", description: "Security audit and performance testing.", status: "UPCOMING", order: 4 },
              { title: "Launch & Scale", description: "Deployment and global distribution.", status: "UPCOMING", order: 5 },
            ],
          },
        },
        include: {
          stages: {
            orderBy: { order: "asc" },
          },
        },
      });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
