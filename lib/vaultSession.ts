// lib/vaultSession.ts
const VAULT_SESSION_KEY = "vault_session";
const AUTO_LOCK_MINUTES = 5; // Auto-lock after 5 minutes

interface VaultSession {
  timestamp: number;
  expires: number;
}

export function createVaultSession(): void {
  const session = {
    timestamp: Date.now(),
    expires: Date.now() + AUTO_LOCK_MINUTES * 60 * 1000,
  };
  sessionStorage.setItem(VAULT_SESSION_KEY, JSON.stringify(session));
}

export function extendVaultSession(): void {
  const session = getVaultSession();
  if (session) {
    session.expires = Date.now() + AUTO_LOCK_MINUTES * 60 * 1000;
    sessionStorage.setItem(VAULT_SESSION_KEY, JSON.stringify(session));
  }
}

export function isVaultSessionValid(): boolean {
  const session = getVaultSession();
  return session ? Date.now() < session.expires : false;
}

export function getVaultSession(): VaultSession | null {
  if (typeof window === "undefined") return null;
  const data = sessionStorage.getItem(VAULT_SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearVaultSession(): void {
  sessionStorage.removeItem(VAULT_SESSION_KEY);
}
