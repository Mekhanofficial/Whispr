// types/vault.ts
export interface VaultData {
  secretWord: string;
  tapCount: number;
  password: string;
  notes: string[];
  biometricEnabled?: boolean;
  decoyMode?: boolean;
}

