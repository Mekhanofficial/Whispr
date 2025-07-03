"use client";

import Link from "next/link";

interface HeroSectionProps {
  setShowAIGenerator: (show: boolean) => void;
}

export default function HeroSection({ setShowAIGenerator }: HeroSectionProps) {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-slate-900 z-10"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-blue-900/20"></div>
      </div>

      <div className="relative z-20 text-center px-4 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Whispr
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Where words hold secrets and poetry becomes a portal to hidden worlds
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/write"
            className="bg-teal-600 hover:bg-teal-500 px-8 py-4 rounded-lg transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-teal-500/30"
          >
            Write Your Poem
          </Link>
          <button
            onClick={() => setShowAIGenerator(true)}
            className="bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-lg transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-purple-500/30"
          >
            AI Inspiration
          </button>
        </div>
      </div>
    </div>
  );
}
