import React from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import CountdownBlock from "../common/CountdownBlock";
import { EVENTS, NEXT_EVENT_DATE } from "../../data";
import useCountdown from "../../hooks/useCountdown";

export default function EventsSection() {
  const left = useCountdown(NEXT_EVENT_DATE);
  return (
    <section id="events" className="relative bg-[#0d0a12] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal><Eyebrow tone="violet">EVENTS & TOURNAMENTS</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                BRING YOUR<br />SQUAD.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-violet-400/20 bg-violet-500/5 p-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-300">Next Event</span>
              <div className="mt-3 flex gap-3">
                <CountdownBlock value={left.d} label="Days" />
                <CountdownBlock value={left.h} label="Hours" />
                <CountdownBlock value={left.m} label="Min" />
                <CountdownBlock value={left.s} label="Sec" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {EVENTS.map((ev, i) => (
            <Reveal key={ev.name} delay={(i % 2) * 0.1}>
              <div className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-violet-400/30 hover:bg-white/[0.04]">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                  <span className="text-[10px] font-bold uppercase">{ev.day}</span>
                  <span className="font-display text-sm font-bold">{ev.date}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-white">{ev.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
                    <span>₹{ev.entry} Entry</span>
                    <span>•</span>
                    <span>₹{ev.prize} Prize Pool</span>
                    <span>•</span>
                    <span>{ev.players}</span>
                  </div>
                </div>
                <button className="flex shrink-0 items-center gap-1 rounded-full border border-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition group-hover:bg-violet-500 group-hover:border-violet-500">
                  Register <ArrowUpRight size={12} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}