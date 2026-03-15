import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await props.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("[ADMIN_POST_ID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await props.params;

  try {
    const body = await req.json();
    const { title, slug, excerpt, content, image, published, tags } = body;

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        published,
        tags: tags ? JSON.stringify(tags) : undefined,
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("[ADMIN_POST_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await props.params;

  try {
    const post = await prisma.post.delete({
      where: { id }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("[ADMIN_POST_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
