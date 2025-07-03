"use client";
import { useState, useEffect } from "react";
import {
  getVaultSettings,
  saveVaultSettings,
  resetVaultSettings,
} from "@/lib/vault";

export default function SettingsPage() {
  const [settings, setSettings] = useState(getVaultSettings());
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    setSettings(getVaultSettings());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleSave = () => {
    saveVaultSettings(settings);
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Reset all vault settings to default?")) {
      resetVaultSettings();
      setSettings(getVaultSettings());
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-teal-400">Vault Settings</h1>

      <div className="space-y-4 bg-slate-800/50 p-4 rounded-lg">
        <div className="space-y-2">
          <label className="block text-sm text-slate-300">Secret Word</label>
          <input
            name="secretWord"
            value={settings.secretWord}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-slate-300">Tap Count</label>
          <input
            name="tapCount"
            type="number"
            min="1"
            value={settings.tapCount}
            onChange={handleNumberChange}
            className="w-full p-2 rounded bg-slate-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-slate-300">
            Master Password
          </label>
          <input
            name="password"
            type="password"
            value={settings.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 text-white"
          />
        </div>
      </div>

      <div className="bg-slate-800/50 p-4 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Enable Biometric Unlock</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              name="biometricEnabled"
              type="checkbox"
              checked={settings.biometricEnabled || false}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-300">Enable Decoy Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              name="decoyMode"
              type="checkbox"
              checked={settings.decoyMode || false}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 rounded"
        >
          Save Settings
        </button>
        <button
          onClick={handleReset}
          className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
        >
          Reset Defaults
        </button>
      </div>
    </div>
  );
}
