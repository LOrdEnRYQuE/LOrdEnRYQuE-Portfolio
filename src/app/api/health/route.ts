import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: "UP",
      timestamp: new Date().toISOString(),
      database: "CONNECTED",
      uptime: process.uptime()
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json({
      status: "DOWN",
      timestamp: new Date().toISOString(),
      database: "DISCONNECTED",
      error: error instanceof Error ? error.message : "Internal Server Error"
    }, { status: 503 });
  }
}
