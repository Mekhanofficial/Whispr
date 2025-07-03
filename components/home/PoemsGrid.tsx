"use client";

import Link from "next/link";
import KeywordTapHandler from "../KeywordTapHandler";
import { Poem } from "@/types/poem";

interface PoemsGridProps {
  filteredPoems: Poem[];
  handleLike: (id: string) => void;
}

export default function PoemsGrid({
  filteredPoems,
  handleLike,
}: PoemsGridProps) {
  return (
    <section className="py-12 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoems.length > 0 ? (
            filteredPoems.map((poem) => (
              <div
                key={poem.id}
                className="bg-slate-800/50 rounded-xl p-6 shadow-lg hover:shadow-teal-500/10 transition-all duration-300 border border-slate-700/50 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-teal-300">
                      {poem.title}
                    </h2>
                    <span className="text-xs text-teal-500 bg-teal-900/30 px-2 py-1 rounded-full mt-1 inline-block">
                      {poem.category}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">
                    {poem.date}
                  </span>
                </div>

                <div className="mb-6">
                  <KeywordTapHandler text={poem.body} id={poem.id} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400 italic">
                    — {poem.author}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(poem.id)}
                      className="flex items-center gap-1 text-sm text-slate-300 hover:text-teal-400 transition-colors"
                      aria-label="Like this poem"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{poem.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-slate-400 mb-4">
                No poems found matching your search
              </p>
              <Link
                href="/write"
                className="inline-block bg-teal-600 px-6 py-2 rounded-lg hover:bg-teal-500 transition-colors"
              >
                Write the first one
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
