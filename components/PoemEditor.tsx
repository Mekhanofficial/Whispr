"use client";

import { useState } from "react";
import AIWritingAssistant from "./AiWritingAssistant";
import { Poem } from "@/types/poem";

interface PoemEditorProps {
  onPoemSubmit: (newPoem: Omit<Poem, "id">) => void;
}

const categories = [
  "love",
  "pain",
  "nature",
  "revolution",
  "introspection",
  "mystery",
  "other",
];

export default function PoemEditor({ onPoemSubmit }: PoemEditorProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Anonymous");
  const [category, setCategory] = useState("love"); // Default category
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPoem = {
      title,
      body,
      author,
      category,
      likes: 0,
      date: new Date().toISOString().split("T")[0],
    };

    onPoemSubmit(newPoem);
    setTitle("");
    setBody("");
    setAuthor("Anonymous");
    setCategory("love"); // Reset to default
  };

  const handleAIGeneratedText = (generatedText: string) => {
    setBody((prev) => (prev ? `${prev}\n\n${generatedText}` : generatedText));
    setShowAIAssistant(false);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Poem title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full p-3 h-60 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Write your poem here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Author</label>
            <input
              className="w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Your name (optional)"
              value={author}
              onChange={(e) => setAuthor(e.target.value || "Anonymous")}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Category
            </label>
            <select
              className="w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 bg-teal-600 px-4 py-3 rounded-lg hover:bg-teal-500 transition-colors font-medium"
          >
            Publish Poem
          </button>
          <button
            type="button"
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className="flex-1 bg-purple-600 px-4 py-3 rounded-lg hover:bg-purple-500 transition-colors font-medium"
          >
            {showAIAssistant ? "Hide AI" : "Get AI Help"}
          </button>
        </div>
      </form>

      {showAIAssistant && (
        <AIWritingAssistant onGenerate={handleAIGeneratedText} />
      )}
    </div>
  );
}
