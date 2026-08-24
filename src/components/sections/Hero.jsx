import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Eyebrow from "../common/Eyebrow";
import CTAButton from "../common/CTAButton";
import { FLOATING_TAGS } from "../../data";

export default function Hero({ onBook }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 60, damping: 20 });

  const handleMouse = (e) => {
    const { innerWidth, innerHeight } = window;
    mvX.set((e.clientX / innerWidth - 0.5) * 26);
    mvY.set((e.clientY / innerHeight - 0.5) * 26);
  };

  const headline = ["EAT.", "PLAY.", "REPEAT."];

  return (
    <section id="home" ref={ref} onMouseMove={handleMouse} className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-black">
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2069&auto=format&fit=crop"
          alt="Gamers and friends enjoying a night at a premium gaming café lounge"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-screen">
        <div className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-violet-600/40 blur-[110px]" />
        <div className="absolute bottom-[10%] right-[10%] h-80 w-80 rounded-full bg-amber-500/25 blur-[120px]" />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 flex w-full max-w-6xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Eyebrow tone="neutral">CAFÉ • GAMING • COMMUNITY</Eyebrow>
        </motion.div>

        <motion.div style={{ x: springX, y: springY }} className="mt-6 font-display leading-[0.88]">
          {headline.map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15vw] font-extrabold tracking-tight text-white sm:text-[9vw] md:text-[7vw] lg:text-[6vw] xl:text-[92px] 2xl:text-[116px]"
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mx-auto mt-7 max-w-lg text-balance text-[15px] leading-relaxed text-zinc-300 md:text-base"
        >
          Where great food meets serious gaming, late-night conversations and unforgettable moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <CTAButton variant="gaming" onClick={onBook}>Book Your Experience</CTAButton>
          <CTAButton variant="ghost" href="#menu">Explore The Menu</CTAButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-0 right-0 z-10 hidden items-center justify-between px-10 md:flex"
      >
        {FLOATING_TAGS.map((tag, i) => (
          <span key={tag} className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            <span className={`h-1.5 w-1.5 rounded-full ${i % 2 === 0 ? "bg-violet-400" : "bg-amber-400"}`} />
            {tag}
          </span>
        ))}
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:hidden"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
          <div className="h-1.5 w-1 rounded-full bg-white/70" />
        </div>
      </motion.div>
    </section>
  );
}