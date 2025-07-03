"use client";

import { useState, useEffect } from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import SplashScreen from "../components/SplashScreen";
import VaultSessionProvider from "../context/VaultSessionContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMainApp, setShowMainApp] = useState(false);

  useEffect(() => {
    const skip = localStorage.getItem("Whispr_skipSplash");
    if (skip === "true") setShowMainApp(true);
  }, []);

  return (
    <html lang="en">
      <body className="bg-slate-900 text-white font-sans">
        {!showMainApp && <SplashScreen onFinish={() => setShowMainApp(true)} />}

        {showMainApp && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
            <VaultSessionProvider>
              <Navbar />
              {children}
            </VaultSessionProvider>
          </div>
        )}
      </body>
    </html>
  );
}
