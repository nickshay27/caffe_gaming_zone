import React from "react";
import { Crown } from "lucide-react";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import { MEMBERSHIPS } from "../../data";

export default function MembershipSection() {
  return (
    <section id="membership" className="relative bg-[#0a0a0f] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <div className="text-center">
          <Reveal><Eyebrow tone="violet">MEMBERSHIP</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              MAKE IT YOUR SECOND HOME.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBERSHIPS.map((m, i) => (
            <Reveal key={m.tier} delay={i * 0.1}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-8 ${
                  m.featured ? "border-amber-400/50 bg-gradient-to-b from-amber-400/10 to-transparent lg:scale-105" : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-2">
                  {m.featured && <Crown size={16} className="text-amber-400" />}
                  <h3 className="font-display text-xl font-bold tracking-wide text-white">{m.tier}</h3>
                </div>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-extrabold text-white">₹{m.price}</span>
                  <span className="text-xs text-zinc-500">/ month</span>
                </div>
                <ul className="mt-7 flex-1 space-y-3.5">
                  {m.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${m.featured ? "bg-amber-400" : "bg-violet-400"}`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-full py-3 text-[12px] font-bold uppercase tracking-wide transition ${
                    m.featured ? "bg-amber-400 text-black hover:bg-amber-300" : "border border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  Become a Member
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}