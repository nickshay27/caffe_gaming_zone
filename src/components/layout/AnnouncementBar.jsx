import React from "react";
import { motion } from "framer-motion";

export default function AnnouncementBar() {
  const messages = [
    "WEEKEND GAMING NIGHTS — BOOK YOUR SLOT",
    "NEW GAMING + FOOD COMBOS AVAILABLE",
    "WEEKLY TOURNAMENTS • FOOD • MUSIC • GOOD VIBES",
  ];
  return (
    <div className="relative z-[60] overflow-hidden border-b border-white/10 bg-[#0a0a0f] py-2">
      <motion.div
        className="flex whitespace-nowrap text-[11px] font-semibold tracking-[0.18em] uppercase text-zinc-400"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[...messages, ...messages, ...messages].map((m, i) => (
          <span key={i} className="mx-6 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-violet-400" />
            {m}
          </span>
        ))}
      </motion.div>
    </div>
  );
}