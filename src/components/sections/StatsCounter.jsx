import React from "react";
import useInView from "../../hooks/useInView";
import useCountUp from "../../hooks/useCountUp";
import { STATS } from "../../data";

export default function StatsCounter() {
  const [ref, inView] = useInView(0.4);
  return (
    <section ref={ref} className="border-y border-white/10 bg-[#0a0a0f] py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {STATS.map((s) => (
          <StatItem key={s.label} stat={s} start={inView} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ stat, start }) {
  const count = useCountUp(stat.value, start);
  return (
    <div className="text-center">
      <div className="font-display text-4xl font-extrabold text-white sm:text-5xl">
        {stat.isInfinity ? "∞" : count.toLocaleString()}
        {!stat.isInfinity && <span className="text-violet-400">{stat.suffix}</span>}
      </div>
      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{stat.label}</div>
    </div>
  );
}