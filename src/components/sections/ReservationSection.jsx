import React, { useState } from "react";
import { Utensils, Gamepad2 } from "lucide-react";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import CTAButton from "../common/CTAButton";

export default function ReservationSection({ bookingType, setBookingType }) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3200);
  };

  return (
    <section id="reserve" className="relative bg-gradient-to-b from-[#0d0a12] to-[#0a0a0f] py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <div className="text-center">
          <Reveal><Eyebrow tone="violet">RESERVATION</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-5 max-w-lg font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              YOUR NEXT NIGHT OUT STARTS HERE.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setBookingType("table")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-[12px] font-bold uppercase tracking-wide transition ${
                  bookingType === "table" ? "bg-amber-400 text-black" : "border border-white/15 text-zinc-300 hover:bg-white/5"
                }`}
              >
                <Utensils size={14} /> Book a Table
              </button>
              <button
                type="button"
                onClick={() => setBookingType("gaming")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-[12px] font-bold uppercase tracking-wide transition ${
                  bookingType === "gaming" ? "bg-violet-500 text-white" : "border border-white/15 text-zinc-300 hover:bg-white/5"
                }`}
              >
                <Gamepad2 size={14} /> Book Gaming Station
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Name</span>
                <input required type="text" placeholder="Your full name" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-400/60" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Phone</span>
                <input required type="tel" placeholder="+91 00000 00000" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-400/60" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Date</span>
                <input required type="date" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/60 [color-scheme:dark]" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Time</span>
                <input required type="time" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/60 [color-scheme:dark]" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Guests</span>
                <input required type="number" min="1" defaultValue="2" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/60" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Experience</span>
                <select defaultValue="Just Chilling" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/60">
                  <option>Just Chilling</option>
                  <option>Gaming Session</option>
                  <option>Combo Package</option>
                  <option>VIP Room</option>
                  <option>Birthday / Event</option>
                </select>
              </label>

              <div className="sm:col-span-2">
                <CTAButton variant={bookingType === "gaming" ? "gaming" : "amber"} className="w-full justify-center">
                  {submitted ? "Request Sent ✓" : "Confirm Reservation"}
                </CTAButton>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}