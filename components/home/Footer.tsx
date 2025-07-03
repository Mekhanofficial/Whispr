"use client";

import Link from "next/link";

interface FooterProps {
  categories: string[];
  setActiveCategory: (category: string) => void;
}

export default function Footer({ categories, setActiveCategory }: FooterProps) {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Whispr
            </h3>
            <p className="text-slate-400">
              A sanctuary for poetic secrets and creative expression
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-slate-300 mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Search Poems
                </Link>
              </li>
              <li>
                <Link
                  href="/write"
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Write Poem
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-slate-300 mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.slice(1).map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className="text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-slate-300 mb-4">
              Discover Secrets
            </h4>
            <p className="text-slate-400 text-sm mb-4">
              Tap the word &quot;Unlock&quot; in any poem{" "}
              {getVaultSettings()?.tapCount || 3} times to discover hidden
              features
            </p>

            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Whispr. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function getVaultSettings() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("Whispr_vault_settings");
  return data ? JSON.parse(data) : null;
}
