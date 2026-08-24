import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Flame, Crown, Sparkles } from "lucide-react";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import TagBadge from "../common/TagBadge";
import { MENU_CATEGORIES, MENU_ITEMS } from "../../data";

export default function MenuSection() {
  const [active, setActive] = useState("COFFEE");
  const [modalOpen, setModalOpen] = useState(false);
  const filtered = MENU_ITEMS.filter((m) => m.category === active);

  return (
    <section id="menu" className="relative bg-[#0d0906] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal><Eyebrow tone="amber">SIGNATURE MENU</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                CRAFTED. NOT<br />JUST COOKED.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[12px] font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              View Full Menu <ArrowUpRight size={14} />
            </button>
          </Reveal>
        </div>

        <div className="mt-12 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide transition-colors duration-300 ${
                active === cat ? "text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              {active === cat && (
                <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-amber-400" transition={{ type: "spring", duration: 0.5 }} />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-amber-400/30 hover:bg-white/[0.04]"
              >
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-[15px] font-bold leading-tight text-white">{item.name}</h3>
                    {item.veg ? (
                      <span title="Vegetarian" className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" /></span>
                    ) : (
                      <span title="Non-Vegetarian" className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-red-400"><span className="h-2 w-2 rounded-full bg-red-400" /></span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => <TagBadge key={t} tag={t} />)}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="font-display text-base font-bold text-white">₹{item.price}</span>
                    <button className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-black transition hover:scale-110" aria-label={`Add ${item.name}`}>
                      <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <FullMenuModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}

function FullMenuModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0d0d12] p-6 md:p-10"
      >
        <button onClick={onClose} className="absolute right-6 top-6 text-zinc-400 hover:text-white" aria-label="Close menu">
          <X size={22} />
        </button>
        <h3 className="font-display text-3xl font-bold text-white">Full Menu</h3>
        <p className="mt-1 text-sm text-zinc-500">Every category, every item.</p>
        <div className="mt-8 space-y-9">
          {MENU_CATEGORIES.map((cat) => (
            <div key={cat}>
              <h4 className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-amber-300">{cat}</h4>
              <div className="divide-y divide-white/5">
                {MENU_ITEMS.filter((m) => m.category === cat).map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{item.name}</span>
                        {item.tags.map((t) => <TagBadge key={t} tag={t} />)}
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-500">{item.desc}</p>
                    </div>
                    <span className="shrink-0 font-display text-sm font-bold text-white">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}