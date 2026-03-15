import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[PUBLIC_POSTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
