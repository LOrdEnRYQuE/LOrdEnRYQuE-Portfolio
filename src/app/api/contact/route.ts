import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/content/site";
import { prisma } from "@/lib/db";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_builds");

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Persist to Database (Lead)
    let leadId = null;
    try {
      const lead = await prisma.lead.create({
        data: {
          name,
          email,
          concept: "Contact Form Message", // Required field in schema
          industry: "General Inquiry",    // Required field in schema
          description: message,
          status: "NEW",
        }
      });
      leadId = lead.id;
      console.log("Lead persisted successfully:", leadId);
    } catch (dbError) {
      console.error("Failed to persist lead to database:", dbError);
      // We continue with email sending even if DB fails, but log the error
    }

    // 2. Attempt to send email using Resend
    if (!process.env.RESEND_API_KEY) {
      console.log("No RESEND_API_KEY found. Simulation mode: Email not sent, but lead persisted if DB was up.");
      return NextResponse.json({ 
        success: true, 
        message: "Lead recorded. Email simulation active (no API key).",
        leadId 
      }, { status: 200 });
    }

    const { data, error } = await resend.emails.send({
      from: `${siteConfig.name} Portfolio <onboarding@resend.dev>`,
      to: [process.env.CONTACT_EMAIL || "delivered@resend.dev"],
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ 
        success: true, 
        message: "Lead recorded, but email notification failed.",
        leadId,
        emailError: error 
      }, { status: 200 });
    }

    return NextResponse.json({ success: true, message: "Lead recorded and email sent.", leadId, data }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Contact API Route Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
