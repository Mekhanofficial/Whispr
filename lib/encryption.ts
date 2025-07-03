// lib/encryption.ts
import CryptoJS from "crypto-js";

export function encryptData(data: string, password: string): string {
  return CryptoJS.AES.encrypt(data, password).toString();
}

export function decryptData(encrypted: string, password: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, password);
    const result = bytes.toString(CryptoJS.enc.Utf8);
    return result || ""; // Return empty string if decryption fails
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
}
