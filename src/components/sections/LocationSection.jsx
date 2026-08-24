import React from "react";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import CTAButton from "../common/CTAButton";
import { HOURS } from "../../data";
import useIsOpenNow from "../../hooks/useIsOpenNow";

export default function LocationSection() {
  const isOpen = useIsOpenNow();
  return (
    <section id="location" className="relative bg-[#08080b] py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
        <Reveal>
          <div>
            <Eyebrow tone="neutral">LOCATION & HOURS</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              FIND US.<br />STAY A WHILE.
            </h2>

            <span className={`mt-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide ${isOpen ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-red-400/30 bg-red-400/10 text-red-300"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-emerald-400" : "bg-red-400"}`} />
              {isOpen ? "Open Now" : "Closed Now"}
            </span>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-violet-400" />
                <span className="text-sm leading-relaxed text-zinc-300">42 Vijay Nagar Square, AB Road, Indore, Madhya Pradesh 452010</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-violet-400" />
                <span className="text-sm text-zinc-300">+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-violet-400" />
                <div className="space-y-1 text-sm text-zinc-300">
                  {HOURS.map((h) => (
                    <div key={h.days} className="flex gap-3"><span className="w-28 font-semibold text-white">{h.days}</span>{h.time}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Instagram size={18} className="mt-0.5 shrink-0 text-violet-400" />
                <span className="text-sm text-zinc-300">@nexusandbrew</span>
              </div>
            </div>

            <div className="mt-9">
              <CTAButton variant="ghost" href="https://maps.google.com" >Get Directions</CTAButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative h-80 overflow-hidden rounded-2xl border border-white/10 md:h-full">
            <iframe
              title="Café location map"
              className="h-full w-full grayscale invert-[0.92] contrast-[1.1]"
              src="https://www.google.com/maps?q=Vijay+Nagar+Square+Indore&output=embed"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}