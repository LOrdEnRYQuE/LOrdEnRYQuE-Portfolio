import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const [agents, projects, assets, leads] = await Promise.all([
      prisma.agent.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
          ],
        },
        take: 5,
        select: { id: true, name: true, description: true },
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
          ],
        },
        take: 5,
        select: { id: true, title: true },
      }),
      prisma.asset.findMany({
        where: {
          title: { contains: query },
        },
        take: 5,
        select: { id: true, title: true, type: true },
      }),
      prisma.lead.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { email: { contains: query } },
            { industry: { contains: query } },
          ],
        },
        take: 5,
        select: { id: true, name: true, industry: true },
      }),
    ]);

    const results = [
      ...agents.map((a: { id: string; name: string; description: string | null }) => ({
        id: `agent-${a.id}`,
        title: a.name,
        subtitle: a.description || "Active Agent",
        type: "Agent",
        href: `/admin/agents/${a.id}/edit`,
        category: "Command",
      })),
      ...projects.map((p: { id: string; title: string }) => ({
        id: `project-${p.id}`,
        title: p.title,
        subtitle: "Project Command",
        type: "Project",
        href: `/admin/projects/${p.id}`,
        category: "Content",
      })),
      ...assets.map((as: { id: string; title: string; type: string }) => ({
        id: `asset-${as.id}`,
        title: as.title,
        subtitle: `${as.type} Asset`,
        type: "Asset",
        href: `/admin/media`,
        category: "Content",
      })),
      ...leads.map((l: { id: string; name: string; industry: string }) => ({
        id: `lead-${l.id}`,
        title: l.name,
        subtitle: l.industry || "Individual Lead",
        type: "Lead",
        href: `/admin/leads`,
        category: "Oversight",
      })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
