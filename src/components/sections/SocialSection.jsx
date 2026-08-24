import React from "react";
import { Instagram } from "lucide-react";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import { SOCIAL_POSTS } from "../../data";

export default function SocialSection() {
  return (
    <section className="relative bg-[#0a0a0f] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal><Eyebrow tone="neutral">SOCIAL</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                SEE WHAT'S HAPPENING.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <a href="#" className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[12px] font-bold uppercase tracking-wide text-white transition hover:bg-white/10">
              <Instagram size={15} /> Follow The Vibe
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {SOCIAL_POSTS.map((src, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group relative aspect-square overflow-hidden rounded-xl border border-white/10">
                <img src={src} alt={`Community social post ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Instagram size={18} className="text-white" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}