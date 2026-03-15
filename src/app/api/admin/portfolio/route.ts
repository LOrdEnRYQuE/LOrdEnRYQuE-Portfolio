import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await prisma.portfolioProject.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch portfolio projects:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { 
      slug, 
      title, 
      summary, 
      description, 
      status, 
      stack, 
      cover, 
      featured, 
      liveUrl, 
      githubUrl,
      challenge,
      solution,
      brief
    } = body;

    if (!slug || !title || !summary || !description || !cover) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await prisma.portfolioProject.create({
      data: {
        slug,
        title,
        summary,
        description,
        status: status || "Live",
        stack: Array.isArray(stack) ? JSON.stringify(stack) : stack || "[]",
        cover,
        featured: !!featured,
        liveUrl,
        githubUrl,
        challenge,
        solution,
        brief
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to create portfolio project:", error);
    return NextResponse.json({ error: "Failed to create portfolio project" }, { status: 500 });
  }
}
