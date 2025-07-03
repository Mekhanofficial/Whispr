"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);
  const [tapCount, setTapCount] = useState(0);

  // Automatically finish after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onFinish();
      localStorage.setItem("Whispr_skipSplash", "true");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onFinish]);

  // Handle tapping "Whispr" to skip
  useEffect(() => {
    if (tapCount === 2) {
      setVisible(false);
      onFinish();
      localStorage.setItem("Whispr_skipSplash", "true");
    }

    const tapTimeout = setTimeout(() => setTapCount(0), 300);
    return () => clearTimeout(tapTimeout);
  }, [tapCount, onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent animate-pulse pointer-events-none" />

      <h1
        className="text-4xl font-bold z-10 animate-fade-in cursor-pointer select-none"
        onClick={() => setTapCount((prev) => prev + 1)}
      >
        Whispr
      </h1>
      <p className="mt-4 italic text-slate-300 text-center animate-pulse max-w-xs z-10">
        “Words are veils for what the soul cannot scream.”
      </p>
      <p className="mt-2 text-xs text-slate-500 z-10">
        Tap &quot;Whispr&quot; twice to skip.
      </p>
    </div>
  );
}
