import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Manually create missing tables for Lead and SiteConfig
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Lead" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "concept" TEXT NOT NULL,
        "industry" TEXT NOT NULL,
        "description" TEXT,
        "features" TEXT NOT NULL DEFAULT '[]',
        "timeline" TEXT,
        "stack" TEXT,
        "status" TEXT NOT NULL DEFAULT 'NEW',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SiteConfig" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "key" TEXT NOT NULL,
        "value" TEXT NOT NULL,
        "updatedAt" DATETIME NOT NULL
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "SiteConfig_key_key" ON "SiteConfig"("key");
    `);

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Lead_email_idx" ON "Lead"("email");
    `);

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Lead_status_idx" ON "Lead"("status");
    `);

    return NextResponse.json({ 
      message: "Database patched successfully",
      tablesCreated: ["Lead", "SiteConfig"]
    });
  } catch (error: any) {
    console.error("Database patch failed:", error);
    return NextResponse.json({ 
      error: "Patch failed", 
      details: error.message 
    }, { status: 500 });
  }
}
