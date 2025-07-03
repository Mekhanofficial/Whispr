"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filteredPoemsCount: number;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
  filteredPoemsCount,
}: CategoryFilterProps) {
  return (
    <section className="py-12 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Explore Poetry</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Discover poems that speak to your soul, filtered by emotion and
            theme
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-teal-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-900 px-4 text-sm text-slate-500">
              {filteredPoemsCount} poems found
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
