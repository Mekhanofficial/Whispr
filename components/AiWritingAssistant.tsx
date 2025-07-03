// components/AIWritingAssistant.tsx
"use client";

import { useState } from "react";
import OpenAI from "openai";

interface AIWritingAssistantProps {
  onGenerate: (generatedText: string) => void;
}

export default function AIWritingAssistant({
  onGenerate,
}: AIWritingAssistantProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a writing prompt");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      // Initialize OpenAI client
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true, // Only for client-side usage
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a poetic writing assistant. Help the user create beautiful poetry based on their prompts. Respond only with the poem itself, no additional commentary.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      const generatedPoem = response.choices[0]?.message?.content || "";
      onGenerate(generatedPoem);
    } catch (err) {
      console.error("AI generation error:", err);
      setError("Failed to generate poem. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-slate-800/50 rounded-lg">
      <h3 className="text-lg font-semibold text-teal-300">
        AI Writing Assistant
      </h3>
      <div className="space-y-2">
        <textarea
          className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Describe what you want to write about..."
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {isGenerating ? "Generating..." : "Generate Poem"}
        </button>
      </div>
    </div>
  );
}
