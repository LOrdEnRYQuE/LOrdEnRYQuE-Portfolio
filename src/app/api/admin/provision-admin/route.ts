import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const email = 'hello@lordenryque.com';
    const password = 'admin_password_2026';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'ADMIN',
        name: 'System Admin'
      },
      create: {
        email,
        password: hashedPassword,
        role: 'ADMIN',
        name: 'System Admin'
      }
    });

    // Self-test hash
    const isTestMatch = await bcrypt.compare(password, user.password!);

    return NextResponse.json({
      message: "Admin user provisioned successfully",
      email: user.email,
      role: user.role,
      diagnostics: {
        hashValid: !!user.password,
        testMatch: isTestMatch,
        userId: user.id
      }
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Provisioning error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
