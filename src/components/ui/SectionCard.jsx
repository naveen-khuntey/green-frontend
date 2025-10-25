// src/components/ui/SectionCard.jsx
"use client";

import { motion } from "framer-motion";
import React from "react";

/**
 * SectionCard - wrapper used on settings page for the nice rounded glassy containers.
 * Props:
 *  - children
 *  - accent: 'green' (adds thin green border glow if desired)
 */
export default function SectionCard({ children, accent = null }) {
  return (
    <motion.section
      className={`rounded-2xl border border-white/6 bg-[rgba(255,255,255,0.02)] p-6 overflow-hidden`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      {/* optional subtle accent border */}
      <div className={`${accent === "green" ? "ring-1 ring-emerald-800/40" : ""} rounded-[12px]`}>
        {children}
      </div>
    </motion.section>
  );
}
