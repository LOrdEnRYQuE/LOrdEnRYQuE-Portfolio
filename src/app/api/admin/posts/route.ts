import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[ADMIN_POSTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, excerpt, content, image, published, tags } = body;

    if (!title || !slug || !content) {
      return new NextResponse("Required fields are missing", { status: 400 });
    }

    // Check if slug is unique
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });

    if (existingPost) {
      return new NextResponse("Slug already exists", { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        published: published ?? false,
        tags: JSON.stringify(tags || []),
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("[ADMIN_POSTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
