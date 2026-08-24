import React from "react";
import { Zap, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050507] pb-28 pt-16 sm:pt-20 md:pb-8">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-amber-400">
                <Zap size={16} className="fill-black text-black" />
              </span>
              <span className="font-display text-lg font-bold text-white">NEXUS<span className="text-violet-400">&</span>BREW</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-500">
              Coffee. Food. Games. One place. Endless memories.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-violet-400/40 hover:text-white">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500">Navigate</h4>
            <ul className="mt-5 space-y-3">
              {["Home", "Gaming", "Menu", "Events", "Gallery", "Membership", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="text-sm text-zinc-400 transition hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              <li>+91 98765 43210</li>
              <li>hello@nexusandbrew.in</li>
              <li>Vijay Nagar Square, Indore</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
          <span className="text-xs text-zinc-600">© 2026 Nexus & Brew. All rights reserved.</span>
          <span className="text-xs text-zinc-600">Made for gamers, foodies & good times.</span>
        </div>
      </div>
    </footer>
  );
}