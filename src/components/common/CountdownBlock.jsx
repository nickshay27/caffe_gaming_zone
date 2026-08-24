import React from "react";

export default function CountdownBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-display text-lg font-bold text-white sm:h-16 sm:w-16 sm:text-2xl md:h-20 md:w-20 md:text-3xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{label}</span>
    </div>
  );
}