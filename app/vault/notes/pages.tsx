// === FILE: app/vault/notes/page.tsx ===
"use client";

import VaultNotes from "../../../components/VaultNotes";

export default function VaultNotesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Vault Notes</h1>
      <VaultNotes />
    </div>
  );
}
