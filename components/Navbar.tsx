"use client";

import Link from "next/link";
import { useVaultSession } from "../context/VaultSessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { isVaultUnlocked, lockVault } = useVaultSession();

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-sm border-b border-slate-800 bg-slate-900">
      <Link
        href="/"
        className="text-2xl font-semibold text-white hover:text-teal-400 transition-colors"
      >
        Whispr
      </Link>

      <div className="flex items-center gap-5 text-sm text-slate-300">
        <Link href="/write" className="hover:text-teal-300 transition-colors">
          Write
        </Link>

        <Link
          href="/settings"
          className="hover:text-teal-300 transition-colors"
        >
          Settings
        </Link>

        <Link href="/search" className="hover:text-teal-300 transition-colors">
          <FontAwesomeIcon icon={faSearch} />
        </Link>

        {isVaultUnlocked && (
          <button
            onClick={lockVault}
            className="ml-2 px-3 py-1 text-xs bg-red-600 rounded hover:bg-red-500 transition-colors"
          >
            Lock
          </button>
        )}
      </div>
    </nav>
  );
}
"y"