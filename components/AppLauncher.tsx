"use client";
import { useState, useEffect } from "react";
import { FaExternalLinkAlt, FaTrash, FaPlus, FaGlobe } from "react-icons/fa";
import { getIconForApp } from "@/utils/appIcons";

interface AppEntry {
  id: string;
  name: string;
  url: string;
}

export default function AppLauncher() {
  const [apps, setApps] = useState<AppEntry[]>([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });
  useEffect(() => {
    const stored = localStorage.getItem("vault_apps");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setApps(parsed);
        showNotification("Apps loaded from local storage", "info");

        // If no apps, add some samples
        if (parsed.length === 0) {
          addSampleApps();
        }
      } catch (error) {
        console.error("Failed to parse stored apps:", error);
        setApps([]);
        addSampleApps();
      }
    } else {
      // If nothing in localStorage, add samples
      setApps([]);
      addSampleApps();
    }
  }, []);
  

  const addSampleApps = () => {
    const sampleApps = [
      { id: crypto.randomUUID(), name: "Google", url: "https://google.com" },
      { id: crypto.randomUUID(), name: "YouTube", url: "https://youtube.com" },
      { id: crypto.randomUUID(), name: "GitHub", url: "https://github.com" },
    ];
    setApps(sampleApps);
    localStorage.setItem("vault_apps", JSON.stringify(sampleApps));
  };

  const showNotification = (message: string, type: "success" | "error" | "info") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ ...notification, show: false }), 3000);
  };

  const addApp = () => {
    if (!name || !url) {
      showNotification("Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);
      const validUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
      const newApp = {
        id: crypto.randomUUID(),
        name,
        url: validUrl.href,
      };

      const updated = [...apps, newApp];
      setApps(updated);
      localStorage.setItem("vault_apps", JSON.stringify(updated));

      setName("");
      setUrl("");
      showNotification("App added successfully!", "success");
    } catch {
      showNotification("Please enter a valid URL", "error");
    } finally {
      setLoading(false);
    }
  };

  const removeApp = (id: string) => {
    if (!confirm("Are you sure you want to remove this app?")) return;

    setLoading(true);
    const updated = apps.filter((app) => app.id !== id);
    setApps(updated);
    localStorage.setItem("vault_apps", JSON.stringify(updated));
    setLoading(false);
    showNotification("App removed", "info");
  };

  const openApp = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
            notification.type === "error"
              ? "bg-red-600"
              : notification.type === "info"
              ? "bg-blue-600"
              : "bg-green-600"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-teal-400">App Launcher</h1>
        
        {/* Add App Form */}
        <div className="bg-slate-800/50 p-4 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">App Name</label>
              <input
                type="text"
                placeholder="e.g. Google"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-700 px-4 py-2 rounded-lg text-white placeholder-slate-500"
                onKeyDown={(e) => e.key === "Enter" && addApp()}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">App URL</label>
              <input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-700 px-4 py-2 rounded-lg text-white placeholder-slate-500"
                onKeyDown={(e) => e.key === "Enter" && addApp()}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={addApp}
                className="w-full bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2"
                disabled={loading}
              >
                <FaPlus />
                {loading ? "Adding..." : "Add App"}
              </button>
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        {apps.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-slate-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <p className="text-slate-400">
              No apps added yet. Add your first app to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app) => (
              <div
                key={app.id}
                className="bg-slate-800/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4 flex items-center gap-4">
                  <div className="bg-teal-600 w-12 h-12 rounded-lg flex items-center justify-center text-xl">
                    {getIconForApp(app.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{app.name}</h3>
                    <p className="text-sm text-slate-400 truncate">{app.url}</p>
                  </div>
                </div>
                <div className="bg-slate-800/50 border-t border-slate-700 p-2 flex">
                  <button
                    onClick={() => openApp(app.url)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 px-4 rounded-l-lg flex items-center justify-center gap-2"
                  >
                    <FaExternalLinkAlt />
                    Open
                  </button>
                  <button
                    onClick={() => removeApp(app.id)}
                    className="flex-1 bg-red-600 hover:bg-red-500 py-2 px-4 rounded-r-lg flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    <FaTrash />
                    {loading ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}