import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import { COMBOS } from "../../data";

export default function ComboSection({ onBook }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#120a1e] via-[#0a0a0f] to-[#1a0f05] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <Reveal><Eyebrow tone="neutral">COMBOS</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            PLAY MORE.<br />PAY LESS.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMBOS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                  c.popular ? "border-violet-400/50 bg-gradient-to-b from-violet-500/15 to-transparent" : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {c.popular && (
                  <span className="absolute -top-3 left-8 rounded-full bg-violet-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-white">{c.name}</h3>
                <ul className="mt-6 flex-1 space-y-3">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-sm text-zinc-300">
                      <Zap size={13} className="shrink-0 text-amber-400" /> {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <span className="font-display text-3xl font-extrabold text-white">₹{c.price}</span>
                  </div>
                  <button
                    onClick={onBook}
                    className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide transition ${
                      c.popular ? "bg-violet-500 text-white hover:bg-violet-400" : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    Book Combo
                  </button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}