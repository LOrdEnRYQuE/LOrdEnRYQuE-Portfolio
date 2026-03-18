import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || process.env.CONVEX_URL || "https://jovial-ibex-866.eu-west-1.convex.cloud");

export async function GET(_req: NextRequest) {
  try {
    const projects = await convex.query(api.portfolio.listAll);
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
