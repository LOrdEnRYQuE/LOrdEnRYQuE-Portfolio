import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || process.env.CONVEX_URL || "https://jovial-ibex-866.eu-west-1.convex.cloud");

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const post = await convex.query(api.posts.getPostBySlug, { slug });

    if (!post || !post.published) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("[PUBLIC_POST_SLUG_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
