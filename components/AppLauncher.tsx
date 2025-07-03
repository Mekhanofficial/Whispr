"use client";
import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/api";
import * as mutations from "@/graphql/mutations";
import * as queries from "@/graphql/queries";
import config from "@/amplifyconfiguration.json";

// Configure Amplify
Amplify.configure(config);

interface AppEntry {
  id: string;
  name: string;
  url: string;
  owner?: string;
}

const client = generateClient();

function AppLauncher() {
  const [apps, setApps] = useState<AppEntry[]>([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const { data } = await client.graphql({
        query: queries.listApps,
        authMode: "userPool",
      });
      setApps(data.listApps.items);
    } catch (error) {
      console.error("Error fetching apps:", error);
      // Fallback to localStorage if API fails
      const stored = localStorage.getItem("vault_apps");
      if (stored) {
        try {
          setApps(JSON.parse(stored));
        } catch {
          setApps([]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const addApp = async () => {
    if (!name || !url) return;

    try {
      const validUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
      const newApp = {
        id: crypto.randomUUID(),
        name,
        url: validUrl.href,
      };

      // Try Amplify first
      try {
        const { data } = await client.graphql({
          query: mutations.createApp,
          variables: { input: newApp },
          authMode: "userPool",
        });
        setApps((prev) => [...prev, data.createApp]);
      } catch (amplifyError) {
        console.warn(
          "Amplify failed, falling back to localStorage:",
          amplifyError
        );
        const updated = [...apps, newApp];
        setApps(updated);
        localStorage.setItem("vault_apps", JSON.stringify(updated));
      }

      setName("");
      setUrl("");
    } catch {
      alert("Please enter a valid URL");
    }
  };

  const removeApp = async (id: string) => {
    if (!confirm("Are you sure you want to remove this app?")) return;

    try {
      // Try Amplify first
      await client.graphql({
        query: mutations.deleteApp,
        variables: { input: { id } },
        authMode: "userPool",
      });
      setApps((prev) => prev.filter((app) => app.id !== id));
    } catch (amplifyError) {
      console.warn(
        "Amplify failed, falling back to localStorage:",
        amplifyError
      );
      const updated = apps.filter((app) => app.id !== id);
      setApps(updated);
      localStorage.setItem("vault_apps", JSON.stringify(updated));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 p-4 rounded-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="App Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-700 px-3 py-2 rounded text-white placeholder-slate-500"
          />
          <input
            type="url"
            placeholder="App URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-slate-700 px-3 py-2 rounded text-white placeholder-slate-500"
          />
          <button
            onClick={addApp}
            className="bg-teal-600 hover:bg-teal-500 px-3 py-2 rounded text-white"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add App"}
          </button>
        </div>
      </div>

      {apps.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <svg
            className="w-16 h-16 mx-auto text-slate-700"
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
          <p className="mt-4">
            No apps added yet. Add your first app to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {apps.map((app) => (
            <div
              key={app.id}
              className="bg-slate-800/50 p-4 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-teal-400 truncate max-w-[70%]">
                  {app.name}
                </h3>
                <button
                  onClick={() => removeApp(app.id)}
                  className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1"
                  disabled={loading}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {loading ? "Removing..." : "Remove"}
                </button>
              </div>
              <iframe
                src={app.url}
                className="w-full h-96 rounded-lg"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                title={app.name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuthenticator(AppLauncher);
