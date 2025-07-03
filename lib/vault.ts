import { VaultData } from "@/types/vault";

const DEFAULT_VAULT_DATA: VaultData = {
  secretWord: "whispr",
  tapCount: 3,
  password: "",
  notes: [],
  biometricEnabled: false,
  decoyMode: false,
};

export const getVaultSettings = (): VaultData => {
  if (typeof window === "undefined") return DEFAULT_VAULT_DATA;

  const stored = localStorage.getItem("Whispr_vault_data");
  return stored ? JSON.parse(stored) : DEFAULT_VAULT_DATA;
};

export const saveVaultSettings = (data: Partial<VaultData>) => {
  if (typeof window === "undefined") return;

  const current = getVaultSettings();
  const updated = { ...current, ...data };
  localStorage.setItem("Whispr_vault_data", JSON.stringify(updated));
};

export const resetVaultSettings = () => {
  if (typeof window === "undefined") return;
  localStorage.setItem("Whispr_vault_data", JSON.stringify(DEFAULT_VAULT_DATA));
};

export const validatePassword = (inputPassword: string): boolean => {
  const settings = getVaultSettings();
  return inputPassword === settings.password;
};