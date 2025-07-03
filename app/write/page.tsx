"use client";

import PoemEditor from "../../components/PoemEditor";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();

  const handlePoemSubmit = async (newPoem: any) => {
    try {
      const existingPoems = JSON.parse(
        localStorage.getItem("whispr-poems") || "[]"
      );
      const poemWithId = { ...newPoem, id: Date.now().toString() };
      localStorage.setItem(
        "whispr-poems",
        JSON.stringify([poemWithId, ...existingPoems])
      );
      router.push("/");
    } catch (error) {
      console.error("Failed to save poem:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        Write a New Poem
      </h1>
      <PoemEditor onPoemSubmit={handlePoemSubmit} />
    </div>
  );
}
