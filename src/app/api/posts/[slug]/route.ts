import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug }
    });

    if (!post || !post.published) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("[PUBLIC_POST_SLUG_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
