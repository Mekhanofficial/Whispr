"use client";

import { useState, useEffect } from "react";
import { Poem } from "@/types/poem";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import HeroSection from "@/components/home/HeroSection";
import FeaturedPoems from "@/components/home/FeaturedPoems";
import CategoryFilter from "@/components/home/CategoryFilter";
import PoemsGrid from "@/components/home/PoemsGrid";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/home/Footer";
import AIGeneratorSection from "@/components/home/AiGeneratorSection";

export default function HomePage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  // Categories for filtering
  const categories = [
    "all",
    "love",
    "pain",
    "nature",
    "revolution",
    "introspection",
    "mystery",
  ];

  // Load poems from localStorage
  useEffect(() => {
    const loadPoems = () => {
      try {
        const savedPoems = JSON.parse(
          localStorage.getItem("whispr-poems") || "[]"
        );

        if (savedPoems.length > 0) {
          setPoems(savedPoems);
        } else {
          // Default poems if none exist
          const defaultPoems: Poem[] = [
            {
              id: "1",
              title: "Whispering Wind",
              body: "The wind carries secrets untold, through valleys deep and mountains bold. Unlock the whispers if you dare, but only if you truly care.",
              author: "Anonymous",
              likes: 42,
              date: "2023-05-15",
              category: "nature",
              featured: true,
            },
            {
              id: "2",
              title: "Silent Echo",
              body: "In the quiet of the night, shadows dance in pale moonlight. Unlock the silence, hear the sound, of hearts that beat but make no sound.",
              author: "Elena Rivers",
              likes: 28,
              date: "2023-06-22",
              category: "mystery",
              featured: true,
            },
            {
              id: "3",
              title: "Veiled Truth",
              body: "Beneath the layers, thin and frail, lies a truth that will prevail. Unlock the words, set them free, but guard them well, for all to see.",
              author: "Marcus T.",
              likes: 35,
              date: "2023-07-10",
              category: "introspection",
              featured: true,
            },
            {
              id: "4",
              title: "Revolution Dawn",
              body: "The time has come to rise and fight, unlock the chains with all your might. A new day dawns for everyone, beneath the golden morning sun.",
              author: "Alex Johnson",
              likes: 19,
              date: "2023-08-05",
              category: "revolution",
            },
            {
              id: "5",
              title: "Ocean's Whisper",
              body: "Waves that crash upon the shore, tell of secrets, ancient lore. Unlock the tides, hear their song, of love that's lost and love that's strong.",
              author: "J. Wellington",
              likes: 31,
              date: "2023-09-18",
              category: "nature",
            },
            {
              id: "6",
              title: "Heart's Lament",
              body: "A love that burned so bright and fast, now memories alone will last. Unlock the pain that lies within, and let the healing now begin.",
              author: "Sophia Chen",
              likes: 27,
              date: "2023-10-03",
              category: "pain",
            },
          ];
          setPoems(defaultPoems);
          localStorage.setItem("whispr-poems", JSON.stringify(defaultPoems));
        }
      } catch (error) {
        console.error("Error loading poems:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPoems();
  }, []);

  // Save poems to localStorage whenever they change
  useEffect(() => {
    if (poems.length > 0) {
      localStorage.setItem("whispr-poems", JSON.stringify(poems));
    }
  }, [poems]);

  // Filter poems based on search term and category
  const filteredPoems = poems.filter(
    (poem) =>
      (activeCategory === "all" || poem.category === activeCategory) &&
      (poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poem.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poem.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get featured poems for the slideshow
  const featuredPoems = poems.filter((poem) => poem.featured);

  const handleLike = (id: string) => {
    setPoems(
      poems.map((poem) =>
        poem.id === id ? { ...poem, likes: poem.likes + 1 } : poem
      )
    );
  };

  const handleNewPoem = (newPoem: Omit<Poem, "id">) => {
    const poemWithId = { ...newPoem, id: Date.now().toString() };
    setPoems([poemWithId, ...poems]);
    setShowAIGenerator(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-slate-900 text-white">
      <HeroSection setShowAIGenerator={setShowAIGenerator} />

      <FeaturedPoems featuredPoems={featuredPoems} />

      <AIGeneratorSection
        showAIGenerator={showAIGenerator}
        setShowAIGenerator={setShowAIGenerator}
        handleNewPoem={handleNewPoem}
      />

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        filteredPoemsCount={filteredPoems.length}
      />

      <PoemsGrid filteredPoems={filteredPoems} handleLike={handleLike} />

      <CallToAction setShowAIGenerator={setShowAIGenerator} />

      <Footer categories={categories} setActiveCategory={setActiveCategory} />
    </div>
  );
}
