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
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-2xl font-bold tracking-[0.1em] text-white"
      >
        NEXUS<span className="text-violet-400">&</span>BREW

        Build By<span className="text-violet-400">Nickshay</span>Chouhan
      </motion.span>
      <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full bg-gradient-to-r from-violet-400 to-amber-400"
        />
      </div>
    </motion.div>
  );
}