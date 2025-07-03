// === FILE: app/vault/apps/page.tsx ===
"use client";

import AppLauncher from "../../../components/AppLauncher";

export default function VaultAppsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Hidden Apps</h1>
      <AppLauncher />
    </div>
  );
}
