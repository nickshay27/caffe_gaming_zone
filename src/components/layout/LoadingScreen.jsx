import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1900);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <span className="font-display text-2xl font-bold tracking-[0.1em] text-white sm:text-3xl">
          NEXUS<span className="text-violet-400">&</span>BREW
        </span>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.28em] text-zinc-500"
        >
          <span>Built by</span>
          <span className="font-medium tracking-[0.12em] text-violet-400">
            Nickshay Chouhan
          </span>
        </motion.div>
      </motion.div>

      <div className="mt-7 h-px w-40 overflow-hidden bg-white/10 sm:w-48">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="h-full w-full bg-gradient-to-r from-violet-400 to-amber-400"
        />
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-4 text-[9px] uppercase tracking-[0.3em] text-zinc-700"
      >
        Crafted with passion
      </motion.span>
    </motion.div>
  );
}