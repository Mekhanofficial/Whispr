"use client";

import AIPoemGenerator from "../AiPoemGenerator";

interface AIGeneratorSectionProps {
  showAIGenerator: boolean;
  setShowAIGenerator: (show: boolean) => void;
  handleNewPoem: (newPoem: any) => void;
}

export default function AIGeneratorSection({
  showAIGenerator,
  setShowAIGenerator,
  handleNewPoem,
}: AIGeneratorSectionProps) {
  if (!showAIGenerator) return null;

  return (
    <section className="py-12 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-teal-500/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-teal-300">
              AI Poem Assistant
            </h3>
            <button
              onClick={() => setShowAIGenerator(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <AIPoemGenerator
            onGenerate={(generatedText) => {
              handleNewPoem({
                title: "AI-Generated Poem",
                body: generatedText,
                author: "AI Assistant",
                likes: 0,
                date: new Date().toISOString().split("T")[0],
              });
            }}
          />
        </div>
      </div>
    </section>
  );
}
