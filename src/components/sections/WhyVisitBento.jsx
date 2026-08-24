import React from "react";
import { Monitor, Coffee, Trophy, Users } from "lucide-react";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";

export default function WhyVisitBento() {
  return (
    <section className="relative bg-[#08080b] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <Reveal><Eyebrow tone="neutral">WHY VISIT US</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            EVERY REASON.<br />ONE ROOM.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
          <Reveal className="col-span-2 row-span-1 md:col-span-2 md:row-span-2">
            <div className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 md:h-full">
              <img src="https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=1000&auto=format&fit=crop" alt="High-end gaming PC setup" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Monitor size={20} className="mb-2 text-violet-300" />
                <h3 className="font-display text-2xl font-bold text-white">RTX-Powered Rigs</h3>
                <p className="mt-1 max-w-xs text-xs text-zinc-400">50+ stations built for zero-compromise gameplay.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 md:h-full">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=700&auto=format&fit=crop" alt="Specialty coffee" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <Coffee size={18} className="mb-1.5 text-amber-300" />
                <h3 className="font-display text-lg font-bold text-white">Specialty Coffee</h3>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 md:h-full">
              <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=700&auto=format&fit=crop" alt="Tournament crowd" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <Trophy size={18} className="mb-1.5 text-violet-300" />
                <h3 className="font-display text-lg font-bold text-white">Weekly Tournaments</h3>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.22} className="col-span-2 md:col-span-2">
            <div className="group relative h-52 overflow-hidden rounded-2xl border border-white/10 md:h-full">
              <img src="https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=1000&auto=format&fit=crop" alt="Friends hanging out together" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <Users size={18} className="mb-1.5 text-amber-300" />
                <h3 className="font-display text-lg font-bold text-white">A Real Community</h3>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}