import React from "react";
import { motion } from "framer-motion";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";

export default function CafeExperience() {
  const items = [
    { label: "Coffee", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=700&auto=format&fit=crop" },
    { label: "Burgers", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=700&auto=format&fit=crop" },
    { label: "Pizza", img: "https://images.unsplash.com/photo-1548365328-9f547fb0953b?q=80&w=700&auto=format&fit=crop" },
    { label: "Mocktails", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=700&auto=format&fit=crop" },
    { label: "Desserts", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=700&auto=format&fit=crop" },
  ];
  return (
    <section className="relative bg-gradient-to-b from-[#0a0a0f] to-[#120d08] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <Reveal><Eyebrow tone="amber">CAFÉ EXPERIENCE</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl">
            COME FOR THE GAME.
            <br />
            STAY FOR THE FOOD.
          </h2>
        </Reveal>

        <div className="mt-16 flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.06} className="shrink-0">
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative h-72 w-56 overflow-hidden rounded-2xl border border-white/10 sm:h-80 sm:w-64"
              >
                <img src={it.img} alt={it.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <span className="absolute bottom-5 left-5 font-display text-xl font-bold text-white">{it.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}