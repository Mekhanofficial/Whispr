"use client";

import { useState } from "react";
import { validatePassword, getVaultSettings } from "../../lib/vault";
import { useRouter } from "next/navigation";
import { createVaultSession } from "../../lib/vaultSession";
import { useVaultSession } from "../../context/VaultSessionContext";

export default function VaultUnlockPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { unlockVault } = useVaultSession();
  const vaultSettings = getVaultSettings();

  const handleUnlock = () => {
    if (validatePassword(input)) {
      createVaultSession();
      unlockVault();
      router.push("/vault/gallery");
    } else {
      setError("Incorrect password");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-800/50 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Enter Vault</h1>

      <div className="space-y-4">
        <input
          type="password"
          className="w-full p-3 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
          placeholder="Enter vault password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
        />

        {error && <p className="text-red-400 text-center">{error}</p>}

        <button
          onClick={handleUnlock}
          className="w-full bg-teal-600 px-4 py-3 rounded-lg hover:bg-teal-500 transition-colors font-medium"
        >
          Unlock
        </button>
      </div>

      <div className="mt-8 text-center text-sm text-slate-400">
        <p>Forgot how to enter?</p>
        <p className="mt-2">
          Find a poem containing your secret word and tap it{" "}
          {vaultSettings?.tapCount || 3} times
        </p>
      </div>
    </div>
  );
}
