import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const email = "hello@lordenryque.com";
    const password = "admin_password_2026";
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: "Attila Lazar",
        role: "ADMIN"
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Admin user created successfully!",
      credentials: {
        email,
        password
      }
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ 
      success: false, 
      error: message 
    }, { status: 500 });
  }
}
