import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => { x.set(e.clientX - 10); y.set(e.clientY - 10); };
    const overCheck = (e) => {
      const el = e.target.closest("a, button, input, select, textarea");
      setHovering(!!el);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", overCheck);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", overCheck);
    };
  }, [x, y]);

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      animate={{ scale: hovering ? 2.2 : 1 }}
      transition={{ scale: { duration: 0.25 } }}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-5 w-5 rounded-full border border-white/70 mix-blend-difference lg:block"
    />
  );
}