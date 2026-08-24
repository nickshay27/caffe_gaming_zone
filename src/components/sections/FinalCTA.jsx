import React from "react";
import Reveal from "../common/Reveal";
import CTAButton from "../common/CTAButton";

export default function FinalCTA({ onBook }) {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-black py-32">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=2069&auto=format&fit=crop"
          alt="Group of friends celebrating a night at the café gaming lounge"
          className="h-full w-full scale-105 object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8 text-center">
        <Reveal>
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
            DON'T JUST<br />VISIT.
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-amber-400 bg-clip-text text-transparent">EXPERIENCE IT.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-7 text-base text-zinc-300">Bring your squad. We'll handle the rest.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTAButton variant="gaming" onClick={onBook}>Book Now</CTAButton>
            <CTAButton variant="ghost" href="#menu">Explore Menu</CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}