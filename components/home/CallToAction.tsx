"use client";

import Link from "next/link";

interface CallToActionProps {
  setShowAIGenerator: (show: boolean) => void;
}

export default function CallToAction({
  setShowAIGenerator,
}: CallToActionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-900/30 to-blue-900/30">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h2 className="text-3xl font-bold mb-6">Unlock Your Inner Poet</h2>
        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
          Join a community of passionate writers sharing their deepest thoughts
          and most beautiful verses
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/write"
            className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-4 rounded-lg transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-white/30"
          >
            Start Writing Now
          </Link>
          <button
            onClick={() => setShowAIGenerator(true)}
            className="bg-teal-600 hover:bg-teal-500 px-8 py-4 rounded-lg transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-teal-500/30"
          >
            Try AI Assistant
          </button>
        </div>
      </div>
    </section>
  );
}
