import React from "react";
import { motion } from "framer-motion";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";

export default function BrandIntro() {
  return (
    <section className="relative bg-[#08080b] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <Reveal>
          <Eyebrow tone="neutral">EST. 2026 — INDORE, INDIA</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl">
            NOT JUST A CAFÉ.
            <br />
            NOT JUST A GAMING ZONE.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-zinc-400 md:text-base">
            We built a place where you can grab your favorite coffee, challenge your friends, discover new food,
            play your favorite games, and stay longer than you planned.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-16 grid grid-cols-1 overflow-hidden md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative h-[62vh] overflow-hidden md:h-[74vh]"
        >
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1400&auto=format&fit=crop"
            alt="Warm premium café interior with coffee and pastries"
            className="h-full w-full scale-[1.06] object-cover transition-transform duration-[1200ms] group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-amber-500/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300">01 / The Café</span>
            <h3 className="mt-3 font-display text-5xl font-extrabold text-white md:text-6xl">CAFÉ</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-300">
              Specialty coffee, wood-fired kitchen and a room that feels warm even at 1am.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative h-[62vh] overflow-hidden md:h-[74vh]"
        >
          <img
            src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1400&auto=format&fit=crop"
            alt="Futuristic gaming lounge with high-end PCs and ambient lighting"
            className="h-full w-full scale-[1.06] object-cover transition-transform duration-[1200ms] group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-violet-500/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 md:items-end md:text-right">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-300">02 / The Arena</span>
            <h3 className="mt-3 font-display text-5xl font-extrabold text-white md:text-6xl">GAMING</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-300 md:ml-auto">
              50+ stations running the latest hardware, tuned for competitive play.
            </p>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-amber-400/60 via-white/40 to-violet-400/60 md:block" />
      </div>
    </section>
  );
}