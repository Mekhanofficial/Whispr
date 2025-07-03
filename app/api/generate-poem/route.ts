// app/api/generate-poem/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize with environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req: Request) {
  // Debug: Log API key status
  console.log("API Key Present:", !!process.env.OPENAI_API_KEY);

  try {
    const { prompt } = await req.json();
    console.log("Received prompt:", prompt);

    if (!prompt?.trim()) {
      console.log("Empty prompt received");
      return NextResponse.json(
        { error: "Please provide a poem theme" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a poetic assistant. Create poems that:
                   - Are 4-6 lines long
                   - Include the word "Unlock" naturally
                   - Match the requested theme
                   - Use rich imagery`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    console.log("OpenAI response:", completion);

    const poem = completion.choices[0]?.message?.content;
    if (!poem) {
      console.error("Empty poem generated");
      throw new Error("Empty response from AI");
    }

    return NextResponse.json({ poem });
  } catch (error: any) {
    console.error("Full error:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      response: error.response?.data,
    });

    return NextResponse.json(
      {
        error: "Failed to generate poem",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}