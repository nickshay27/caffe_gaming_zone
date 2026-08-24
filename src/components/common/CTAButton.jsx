import React from "react";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";

export default function CTAButton({ children, variant = "primary", icon: Icon = ArrowUpRight, onClick, className = "", href }) {
  const styles = {
    primary: "bg-white text-black hover:bg-zinc-200",
    gaming: "bg-violet-500 text-white hover:bg-violet-400 shadow-[0_0_30px_-8px_rgba(139,92,246,0.8)]",
    ghost: "bg-white/5 text-white border border-white/15 hover:bg-white/10",
    amber: "bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_30px_-8px_rgba(245,158,11,0.7)]",
  };
  const Comp = href ? "a" : "button";
  return (
    <Magnetic strength={10}>
      <Comp
        href={href}
        onClick={onClick}
        className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-bold tracking-[0.08em] uppercase transition-colors duration-300 ${styles[variant]} ${className}`}
      >
        {children}
        <Icon size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Comp>
    </Magnetic>
  );
}