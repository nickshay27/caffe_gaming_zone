import React from "react";
import { Flame, Crown, Sparkles } from "lucide-react";

export default function TagBadge({ tag }) {
  const config = {
    Bestseller: { icon: Flame, cls: "bg-amber-400/15 text-amber-300 border-amber-400/30" },
    Spicy: { icon: Flame, cls: "bg-red-400/15 text-red-300 border-red-400/30" },
    "Chef's Pick": { icon: Crown, cls: "bg-violet-400/15 text-violet-300 border-violet-400/30" },
  };
  const c = config[tag] || { icon: Sparkles, cls: "bg-white/10 text-zinc-300 border-white/20" };
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide ${c.cls}`}>
      <Icon size={10} /> {tag}
    </span>
  );
}