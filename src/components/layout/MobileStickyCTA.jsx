import React from "react";

export default function MobileStickyCTA({ onBook, onBookGaming }) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-2xl border border-white/10 bg-black/70 p-2 backdrop-blur-2xl md:hidden">
      <button onClick={onBook} className="flex-1 rounded-xl border border-white/15 py-3 text-[11px] font-bold uppercase tracking-wide text-white">
        Book Table
      </button>
      <button onClick={onBookGaming} className="flex-1 rounded-xl bg-violet-500 py-3 text-[11px] font-bold uppercase tracking-wide text-white">
        Book Gaming
      </button>
    </div>
  );
}