// context/VaultSessionContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  isVaultSessionValid,
  extendVaultSession,
  clearVaultSession,
} from "../lib/vaultSession";

interface VaultSessionContextType {
  isVaultUnlocked: boolean;
  unlockVault: () => void;
  lockVault: () => void;
}

const VaultSessionContext = createContext<VaultSessionContextType | undefined>(
  undefined
);

export default function VaultSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      if (isVaultSessionValid()) {
        setIsVaultUnlocked(true);
      }
    };
    checkSession();

    // Auto-lock timer
    const interval = setInterval(() => {
      if (!isVaultSessionValid()) {
        lockVault();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const unlockVault = () => {
    extendVaultSession();
    setIsVaultUnlocked(true);
  };

  const lockVault = () => {
    clearVaultSession();
    setIsVaultUnlocked(false);
  };

  return (
    <VaultSessionContext.Provider
      value={{ isVaultUnlocked, unlockVault, lockVault }}
    >
      {children}
    </VaultSessionContext.Provider>
  );
}

export function useVaultSession() {
  const context = useContext(VaultSessionContext);
  if (context === undefined) {
    throw new Error(
      "useVaultSession must be used within a VaultSessionProvider"
    );
  }
  return context;
}
