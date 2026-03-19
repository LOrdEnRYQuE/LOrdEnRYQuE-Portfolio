import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { originalEmail, context, tone = "professional" } = await req.json();

    if (!originalEmail) {
      return new Response("Original email context is required", { status: 400 });
    }

    const systemPrompt = `You are a professional assistant for a high-end personal portfolio owner. 
    Your tone is ${tone}, concise, and sophisticated. 
    Draft a response to the following email. 
    Always include a professional greeting and sign-off as "Sync Admin". 
    Format the response as HTML (using <p>, <br/>, <strong> tags).`;

    const userPrompt = `ORIGINAL EMAIL:
    From: ${originalEmail.from}
    Subject: ${originalEmail.subject}
    Body: ${originalEmail.body}
    
    ADDITIONAL CONTEXT:
    ${context || "No specific instructions provided. Draft a standard polite response."}`;

    const { text } = await generateText({
      model: google("gemini-2.0-flash-001"),
      system: systemPrompt,
      prompt: userPrompt,
    });

    return Response.json({ text });
  } catch (error) {
    console.error("[EMAIL_GEN_API]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
