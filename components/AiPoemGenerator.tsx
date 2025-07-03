// components/AIPoemGenerator.tsx
"use client";
import { useState } from "react";

export default function AIPoemGenerator({
  onGenerate,
  className = "",
}: {
  onGenerate: (poem: string) => void;
  className?: string;
}) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please enter a theme");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch("/api/generate-poem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Generation failed");
      }

      const { poem } = await response.json();
      if (!poem) throw new Error("Received empty poem");

      onGenerate(poem);
      setPrompt("");
    } catch (err: any) {
      let errorMessage = err.message || "Failed to generate poem";
      if (err.name === "AbortError") {
        errorMessage = "Request took too long - please try again";
      }
      setError(errorMessage);
      console.error("Generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`space-y-4 p-4 bg-slate-800/50 rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold text-teal-300">AI Poem Assistant</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setError("");
          }}
          placeholder="Example: 'A haiku about the ocean with hidden meanings'"
          className="w-full p-3 rounded bg-slate-700 text-white"
          rows={3}
          disabled={isLoading}
        />
        {error && (
          <div className="p-2 bg-red-900/20 rounded">
            <p className="text-red-400 text-sm">{error}</p>
            <p className="text-red-300 text-xs mt-1">
              Tip: Try a different prompt or check your connection
            </p>
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 ${
            isLoading ? "bg-purple-700" : "bg-purple-600 hover:bg-purple-500"
          }`}
        >
          {isLoading ? (
            <>
              <span className="animate-spin">🌀</span>
              Generating...
            </>
          ) : (
            "Create Poem"
          )}
        </button>
      </form>
    </div>
  );
}
