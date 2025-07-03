"use client";
import { useState, useEffect, useRef } from "react";
import { getVaultSettings } from "@/lib/vault";
import VaultNotes from "./VaultNotes";
import AppLauncher from "./AppLauncher";

type MediaItem = {
  id: string;
  url: string;
  type: "image" | "video";
  createdAt: number;
  name: string;
};

type VaultTab = "gallery" | "notes" | "apps";

export default function VaultGallery() {
  const [activeTab, setActiveTab] = useState<VaultTab>("gallery");
  const [password, setPassword] = useState("");
  const [isLocked, setIsLocked] = useState(true);
  const [settings, setSettings] = useState(getVaultSettings());
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [isDecoyMode, setIsDecoyMode] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const secretWordRef = useRef<HTMLHeadingElement>(null);

  // Load media from localStorage
  useEffect(() => {
    const storedMedia = localStorage.getItem("vault_media");
    if (storedMedia) {
      try {
        setMedia(JSON.parse(storedMedia));
      } catch {
        setMedia([]);
      }
    }
  }, []);

  // Setup auto-lock
  useEffect(() => {
    if (!isLocked) {
      // Lock after 5 minutes of inactivity
      inactivityTimer.current = setTimeout(() => {
        lockVault();
        alert("Vault locked due to inactivity");
      }, 5 * 60 * 1000);
    }

    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [isLocked]);

  // Evaluate password strength
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);

  const lockVault = () => {
    setIsLocked(true);
    setIsDecoyMode(false);
    setPassword("");
    setAttempts(0);
    setTapCount(0);
    setSelectedMedia(null);
  };

  const unlockVault = () => {
    if (password === settings.password) {
      setIsLocked(false);
      setIsDecoyMode(false);
      setAttempts(0);
      setTapCount(0);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 2 && settings.decoyMode) {
        setIsDecoyMode(true);
        setIsLocked(false);
        setMedia([]);
      } else {
        alert(`Incorrect password. ${3 - newAttempts} attempts remaining`);
      }
    }
  };

  const simulateBiometric = () => {
    // In a real app, this would call device biometric API
    const success = Math.random() > 0.2; // 80% success rate
    if (success) {
      setIsLocked(false);
      setAttempts(0);
    } else {
      alert("Biometric authentication failed. Try password.");
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newItems: MediaItem[] = [];
    let filesProcessed = 0;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const newItem: MediaItem = {
          id: crypto.randomUUID(),
          url: reader.result as string,
          type: file.type.startsWith("video") ? "video" : "image",
          createdAt: Date.now(),
          name: file.name,
        };
        newItems.push(newItem);
        filesProcessed++;

        if (filesProcessed === files.length) {
          const updatedMedia = [...media, ...newItems].sort(
            (a, b) => b.createdAt - a.createdAt
          );
          setMedia(updatedMedia);
          localStorage.setItem("vault_media", JSON.stringify(updatedMedia));
        }
      };
      reader.onerror = () => {
        console.error("File reading failed for", file.name);
        filesProcessed++;
        if (filesProcessed === files.length && newItems.length > 0) {
          const updatedMedia = [...media, ...newItems].sort(
            (a, b) => b.createdAt - a.createdAt
          );
          setMedia(updatedMedia);
          localStorage.setItem("vault_media", JSON.stringify(updatedMedia));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const updatedMedia = media.filter((item) => item.id !== id);
      setMedia(updatedMedia);
      localStorage.setItem("vault_media", JSON.stringify(updatedMedia));

      if (selectedMedia?.id === id) {
        setSelectedMedia(null);
      }
    }
  };

  const handleSecretWordTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    if (newTapCount === settings.tapCount) {
      unlockVault();
    }
  };

  const passwordStrengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-teal-500",
  ];

  if (isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <div className="max-w-md w-full space-y-6">
          <h1
            ref={secretWordRef}
            onClick={handleSecretWordTap}
            className="text-3xl font-bold text-center text-teal-400 cursor-pointer select-none active:scale-95 transition-transform"
          >
            {settings.secretWord.toUpperCase()}
          </h1>

          <div className="space-y-4">
            <div className="space-y-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter vault password"
                className="w-full p-3 rounded-lg bg-slate-800 text-white"
              />

              {password && (
                <div className="flex h-1.5 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${
                        i < passwordStrength
                          ? passwordStrengthColors[passwordStrength - 1]
                          : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={unlockVault}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-lg"
            >
              Unlock Vault
            </button>
          </div>

          {settings.biometricEnabled && (
            <button
              onClick={simulateBiometric}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5 5 0 0010 2z"
                  clipRule="evenodd"
                />
              </svg>
              Use Biometrics
            </button>
          )}

          <p className="text-center text-sm text-slate-500">
            Tap &quot;{settings.secretWord}&quot; {settings.tapCount} times to
            unlock
          </p>

          {tapCount > 0 && (
            <p className="text-center text-xs text-slate-600">
              Tapped {tapCount} time{tapCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Media viewer modal
  if (selectedMedia) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
        <div className="p-4 flex justify-between items-center bg-black/80">
          <h3 className="text-white truncate max-w-[70%]">
            {selectedMedia.name}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => handleDelete(selectedMedia.id)}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => setSelectedMedia(null)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          {selectedMedia.type === "video" ? (
            <video
              src={selectedMedia.url}
              controls
              autoPlay
              className="max-h-full max-w-full"
            />
          ) : (
            <img
              src={selectedMedia.url}
              alt={selectedMedia.name}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex border-b border-slate-700">
            {(["gallery", "notes", "apps"] as VaultTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium ${
                  activeTab === tab
                    ? "text-teal-400 border-b-2 border-teal-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={lockVault}
            className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Lock
          </button>
        </div>

        {isDecoyMode && (
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mb-6 text-center">
            <p className="text-yellow-400">
              Decoy mode activated. Showing empty vault.
            </p>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="space-y-6">
            {!isDecoyMode && (
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleUpload}
                className="block w-full text-white file:mr-4 file:py-2 file:px-4 
                  file:rounded file:border-0 file:bg-teal-600 file:text-white 
                  hover:file:bg-teal-500"
              />
            )}

            {media.length === 0 ? (
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-4">
                  {isDecoyMode
                    ? "No media found"
                    : "Your vault is empty. Upload some media to get started."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {media.map((item) => (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => setSelectedMedia(item)}
                      className="block w-full h-full"
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.url}
                          className="w-full h-full object-cover aspect-square rounded-lg"
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt=""
                          className="w-full h-full object-cover aspect-square rounded-lg"
                        />
                      )}
                    </button>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b-lg">
                      <p className="text-xs text-white truncate">{item.name}</p>
                    </div>

                    {!isDecoyMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-full"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "notes" && <VaultNotes />}
        {activeTab === "apps" && <AppLauncher />}
      </div>
    </div>
  );
}
