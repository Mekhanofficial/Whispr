// app/search/page.tsx
"use client";

import { useState,useEffect } from "react";
import KeywordTapHandler from "../../components/KeywordTapHandler";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Poem {
  id: string;
  title: string;
  body: string;
  author: string;
  likes: number;
  date: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [poems, setPoems] = useState<Poem[]>([]);

  // Load poems from localStorage or default data
  useEffect(() => {
    const savedPoems = JSON.parse(localStorage.getItem("whispr-poems") || "[]");
    setPoems(
      savedPoems.length > 0
        ? savedPoems
        : [
            {
              id: "1",
              title: "Echoes",
              body: "The wind repeats your name... Unlock the secrets within.",
              author: "Anonymous",
              likes: 12,
              date: "2023-05-15",
            },
            {
              id: "2",
              title: "Cipher",
              body: "Unlock me in your lines, decode my hidden signs...",
              author: "Elena Rivers",
              likes: 24,
              date: "2023-06-22",
            },
            {
              id: "3",
              title: "Manga",
              body: "Unlock me in your lines manga, where stories come alive...",
              author: "Marcus T.",
              likes: 8,
              date: "2023-07-10",
            },
          ]
    );
  }, []);

  const filteredPoems = poems.filter(
    (poem) =>
      poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poem.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poem.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-teal-400 hover:text-teal-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-teal-400">Search Poems</h1>
          <div className="w-5"></div> {/* Spacer for alignment */}
        </div>

        {/* Search input */}
        <div className="sticky top-4 z-10 mb-6 bg-slate-900/80 backdrop-blur-sm p-2 rounded-lg shadow-lg">
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Search by title, content or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {filteredPoems.length > 0 ? (
            filteredPoems.map((poem) => (
              <div
                key={poem.id}
                className="bg-slate-800/50 rounded-xl p-6 shadow-lg hover:shadow-teal-500/10 transition-all duration-300 border border-slate-700/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-teal-300">
                    {poem.title}
                  </h2>
                  <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">
                    {poem.date}
                  </span>
                </div>
                <div className="mb-4">
                  <KeywordTapHandler text={poem.body} id={poem.id} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400 italic">
                    — {poem.author}
                  </span>
                  <span className="text-sm text-slate-400">{poem.likes} ♡</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">
                No poems found matching &quot;{searchTerm}&quot;
              </p>

              <Link
                href="/write"
                className="inline-block bg-teal-600 px-6 py-2 rounded-lg hover:bg-teal-500 transition-colors"
              >
                Write a new poem
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
