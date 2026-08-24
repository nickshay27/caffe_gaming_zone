
import React from "react";

export default function Eyebrow({ children, tone = "violet" }) {
  const tones = {
    violet: "text-violet-300 border-violet-400/30 bg-violet-400/5",
    amber: "text-amber-300 border-amber-400/30 bg-amber-400/5",
    neutral: "text-zinc-300 border-white/15 bg-white/5",
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase ${tones[tone]}`}>
      {children}
    </span>
  );
}