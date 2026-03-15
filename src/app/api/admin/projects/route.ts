import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/admin/projects - Fetch all projects with stats
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      include: {
        _count: {
          select: { stages: true, documents: true }
        },
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { updatedAt: "desc" }
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("[PROJECTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// POST /api/admin/projects - Create new project
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, status } = body;
    let { userId } = body;

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    // Default to current user if not provided (using email to find user if ID not in session directly)
    if (!userId) {
      const dbUser = await prisma.user.findFirst({
        where: { email: session.user?.email || "" }
      });
      userId = dbUser?.id;
    }

    if (!userId) {
      return new NextResponse("Could not determine user scope", { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        status: status || "ACTIVE",
        userId,
        // Seed initial stages if provided or default ones
        stages: {
          create: [
            { title: "Blueprint", order: 0, status: "COMPLETED" },
            { title: "Development", order: 1, status: "IN_PROGRESS" },
            { title: "Production", order: 2, status: "UPCOMING" }
          ]
        }
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
