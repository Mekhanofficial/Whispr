"use client";
import { useState, useEffect } from "react";

export default function VaultNotes() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("vault_notes");
    if (stored) {
      setNotes(stored);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value);
    localStorage.setItem("vault_notes", value);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={notes}
        onChange={handleChange}
        placeholder="Write your secret thoughts here..."
        className="w-full h-96 p-4 bg-slate-800 rounded-lg text-white resize-none focus:outline-none"
      />

      <div className="flex justify-between text-sm text-slate-500">
        <div>Auto-saved</div>
        <div>{notes.length} characters</div>
      </div>
    </div>
  );
}
