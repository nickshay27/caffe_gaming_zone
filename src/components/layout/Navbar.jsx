import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu as MenuIcon, X } from "lucide-react";
import { NAV_LINKS } from "../../data";

export default function Navbar({ onBook, onBookGaming }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4">
        <motion.nav
          animate={{
            marginTop: scrolled ? 12 : 20,
            paddingTop: scrolled ? 8 : 14,
            paddingBottom: scrolled ? 8 : 14,
            width: scrolled ? "min(92%, 980px)" : "min(96%, 1180px)",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 backdrop-blur-2xl md:px-7"
        >
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-amber-400">
              <Zap size={15} className="fill-black text-black" />
            </span>
            <span className="font-display text-[15px] font-bold tracking-[0.02em] text-white">
              NEXUS<span className="text-violet-400">&</span>BREW
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative text-[12.5px] font-semibold uppercase tracking-[0.12em] text-zinc-300 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-violet-400 to-amber-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2.5 md:flex">
            <button
              onClick={onBook}
              className="rounded-full border border-white/15 px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white/10"
            >
              Book a Table
            </button>
            <button
              onClick={onBookGaming}
              className="rounded-full bg-violet-500 px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_20px_-6px_rgba(139,92,246,0.9)] transition hover:bg-violet-400"
            >
              Book Gaming
            </button>
          </div>

          <button onClick={() => setOpen(true)} className="p-1.5 text-white lg:hidden" aria-label="Open menu">
            <MenuIcon size={22} />
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col justify-between border-l border-white/10 bg-[#0a0a0f] p-8"
            >
              <div>
                <div className="mb-12 flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-white">MENU</span>
                  <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-white">
                    <X size={22} />
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  {[...NAV_LINKS, { label: "Membership", href: "#membership" }, { label: "Contact", href: "#location" }].map((l, i) => (
                    <motion.a
                      key={l.label}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="border-b border-white/5 py-4 font-display text-2xl font-bold text-white/90"
                    >
                      {l.label}
                    </motion.a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setOpen(false); onBook(); }}
                  className="rounded-full border border-white/20 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white"
                >
                  Book a Table
                </button>
                <button
                  onClick={() => { setOpen(false); onBookGaming(); }}
                  className="rounded-full bg-violet-500 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}