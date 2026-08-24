import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import { GAMING_STATIONS } from "../../data";

export default function GamingSection({ onBookGaming }) {
  return (
    <section id="gaming" className="relative overflow-hidden bg-[#0a0a10] py-28 md:py-36">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal><Eyebrow tone="violet">GAMING EXPERIENCE</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl">
                READY PLAYER<br />ONE?
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              Six categories of stations, all running competition-grade hardware with sub-5ms input lag.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GAMING_STATIONS.map((st, i) => (
            <StationCard key={st.id} station={st} index={i} onBook={onBookGaming} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StationCard({ station, index, onBook }) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="group relative h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={station.image}
            alt={`${station.name} gaming station`}
            className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
        </div>

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-200 backdrop-blur-md">
            {station.category}
          </span>
          <span className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-md ${station.available ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-red-400/30 bg-red-400/10 text-red-300"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${station.available ? "bg-emerald-400" : "bg-red-400"}`} />
            {station.available ? "Available" : "In Use"}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-2xl font-bold text-white">{station.name}</h3>

          <div className="mt-3 flex flex-wrap gap-1.5 opacity-0 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
            {station.specs.map((s) => (
              <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-zinc-300">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <span className="font-display text-xl font-bold text-white">₹{station.price}</span>
              <span className="text-xs text-zinc-500"> / hour</span>
            </div>
            <button
              onClick={onBook}
              className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-black opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
              Book Station <ChevronRight size={13} />
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-violet-400/0 transition-all duration-500 group-hover:border-violet-400/40" />
      </motion.div>
    </Reveal>
  );
}