"use client";

import { useState } from "react";
import { getVaultSettings, validatePassword } from "@/lib/vault";
import { useRouter } from "next/navigation";

interface KeywordTapHandlerProps {
  text: string;
  id: string;
  className?: string;
  onUnlock?: () => void;
}

export default function KeywordTapHandler({
  text,
  id,
  className = "",
  onUnlock,
}: KeywordTapHandlerProps) {
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const settings = getVaultSettings();
  const SECRET_WORD = settings?.secretWord?.toLowerCase() || "unlock";
  const TAP_TARGET = settings?.tapCount || 3;

  const handleTap = (word: string) => {
    if (word.toLowerCase() === SECRET_WORD) {
      const newCount = tapCount + 1;
      setTapCount(newCount);

      if (newCount >= TAP_TARGET) {
        setShowPasswordInput(true);
        setTapCount(0); // Reset after reaching target
      }
    } else {
      setTapCount(0);
    }
  };

  const handleUnlock = () => {
    if (validatePassword(passwordInput)) {
      setShowPasswordInput(false);
      setPasswordInput("");
      if (onUnlock) {
        onUnlock();
      } else {
        router.push("/vault/gallery");
      }
    } else {
      setError("Incorrect password");
      setTimeout(() => setError(""), 2000);
    }
  };

  // Split text into words while preserving punctuation
  const words = text.split(/(\s+)/).filter((word) => word.trim().length > 0);

  return (
    <div className={`relative ${className}`}>
      <div className="whitespace-pre-wrap">
        {words.map((word, i) => {
          // Extract the base word without punctuation
          const baseWord = word.replace(/[^a-zA-Z0-9']/g, "").toLowerCase();
          const isSecretWord = baseWord === SECRET_WORD;

          return (
            <span
              key={`${id}-${i}`}
              onClick={() => isSecretWord && handleTap(baseWord)}
              className={`
                cursor-${isSecretWord ? "pointer" : "default"}
                transition-all duration-150
                ${
                  isSecretWord
                    ? "text-teal-400 font-medium hover:text-teal-300"
                    : "text-slate-300"
                }
              `}
            >
              {word}
            </span>
          );
        })}
      </div>

      {showPasswordInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-white mb-4">
              Enter Vault Password
            </h3>
            <input
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              className="w-full p-3 rounded bg-slate-700 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowPasswordInput(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUnlock}
                className="flex-1 bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 rounded transition-colors"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
