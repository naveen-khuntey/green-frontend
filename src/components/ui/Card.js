"use client";

import { motion } from "framer-motion";

export default function Card({ children, className = "", selected = false }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`
        relative
        rounded-xl
        p-5
        border
        border-white/5
        bg-[rgba(15,18,17,0.45)]
        backdrop-blur-md
        shadow-[0_4px_20px_rgba(0,0,0,0.35)]
        transition-all duration-300
        hover:border-emerald-400/20
        ${selected ? "border-emerald-400/20" : ""}
        ${className}
      `}
    >
      {/* subtle inner light for realism */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
