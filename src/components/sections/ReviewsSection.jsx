import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import { TESTIMONIALS } from "../../data";

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="relative bg-[#0d0906] py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center">
        <Reveal><Eyebrow tone="amber">REVIEWS</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-5 max-w-lg font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            THE ROOM SPEAKS.
          </h2>
        </Reveal>

        <div className="relative mt-16 min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < t.rating ? "fill-amber-400 text-amber-400" : "text-zinc-700"} />
                ))}
              </div>
              <p className="mx-auto mt-6 max-w-2xl text-balance font-display text-xl font-medium leading-snug text-white sm:text-2xl">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-amber-400 font-display text-sm font-bold text-black">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.type}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={prev} aria-label="Previous review" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10">
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-amber-400" : "w-1.5 bg-white/20"}`}
              />
            ))}
          </div>
          <button onClick={next} aria-label="Next review" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}