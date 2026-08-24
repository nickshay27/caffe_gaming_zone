import React from "react";
import { motion } from "framer-motion";
import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import { COMMUNITY_TAGS } from "../../data";

export default function CommunitySection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 2xl:max-w-7xl">
        <Reveal><Eyebrow tone="neutral">COMMUNITY</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            MORE THAN CUSTOMERS.<br />WE BUILD A COMMUNITY.
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-14 flex">
        <motion.div
          className="flex gap-4 whitespace-nowrap px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {[...COMMUNITY_TAGS, ...COMMUNITY_TAGS].map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 font-display text-xl font-bold text-zinc-300 sm:text-2xl"
            >
              {tag}
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}