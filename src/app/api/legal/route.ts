import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const configs = await prisma.siteConfig.findMany({
      where: {
        key: {
          startsWith: "legal_"
        }
      }
    });
    
    // Convert array to object
    const legalContent = configs.reduce((acc: Record<string, string>, curr: { key: string, value: string }) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    
    return NextResponse.json(legalContent);
  } catch (error) {
    console.error("Failed to fetch legal settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
