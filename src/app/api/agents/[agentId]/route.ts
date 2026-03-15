import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const agentSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  personality: z.string().optional(),
  config: z.record(z.string(), z.any()).optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]).optional(),
});

const DEFAULT_CONFIG = {
  branding: {
    primaryColor: "#3b82f6",
    icon: "Bot",
    theme: "dark"
  }
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { agentId } = await params;

    const agent = await prisma.agent.findUnique({
      where: {
        id: agentId,
        user: { email: session.user.email }
      }
    });

    if (!agent) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    // Parse config string into object
    let parsedConfig = DEFAULT_CONFIG;
    try {
      if (agent.config) {
        const dbConfig = JSON.parse(agent.config);
        parsedConfig = {
          ...DEFAULT_CONFIG,
          ...dbConfig,
          branding: {
            ...DEFAULT_CONFIG.branding,
            ...(dbConfig.branding || {})
          }
        };
      }
    } catch (e) {
      console.error("Failed to parse agent config", e);
    }

    return NextResponse.json({
      ...agent,
      config: parsedConfig
    });
  } catch (error) {
    console.error("[AGENT_GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { agentId } = await params;
    const body = await req.json();
    const validatedData = agentSchema.parse(body);

    // If config is provided as object, stringify it for DB
    const updateData: Record<string, any> = { ...validatedData };
    if (validatedData.config) {
      updateData.config = JSON.stringify(validatedData.config);
    }

    const agent = await prisma.agent.update({
      where: {
        id: agentId,
        user: { email: session.user.email }
      },
      data: updateData
    });

    return NextResponse.json(agent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("[AGENT_PATCH]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { agentId } = await params;

    await prisma.agent.delete({
      where: {
        id: agentId,
        user: { email: session.user.email }
      }
    });

    return NextResponse.json({ message: "Agent deleted" });
  } catch (error) {
    console.error("[AGENT_DELETE]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
