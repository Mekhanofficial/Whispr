"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import KeywordTapHandler from "../KeywordTapHandler";
import { Poem } from "@/types/poem";

interface FeaturedPoemsProps {
  featuredPoems: Poem[];
}

export default function FeaturedPoems({ featuredPoems }: FeaturedPoemsProps) {
  return (
    <section className="py-16 bg-slate-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Poems</h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          navigation
          pagination={{ clickable: true }}
          effect="fade"
          loop={true}
          className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl"
        >
          {featuredPoems.map((poem) => (
            <SwiperSlide
              key={poem.id}
              className="bg-slate-800/50 backdrop-blur-sm"
            >
              <div className="p-8 md:p-12">
                <div className="text-center mb-6">
                  <span className="text-teal-400 font-semibold text-sm uppercase tracking-wider">
                    Featured Poem
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mt-2">
                    {poem.title}
                  </h3>
                </div>
                <div className="max-w-2xl mx-auto">
                  <KeywordTapHandler
                    text={poem.body}
                    id={poem.id}
                    className="text-lg md:text-xl text-center italic text-slate-200 leading-relaxed"
                  />
                </div>
                <div className="mt-8 text-center">
                  <span className="text-slate-400">— {poem.author}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
