// src/components/procurement/AutoProcureButton.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * AutoProcureButton
 * - onClick triggers procure
 * - shows primary green CTA, slightly lifts on hover
 */
export default function AutoProcureButton({ amount = 25, loading = false, onClick = () => {} }) {
  return (
    <div>
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.995 }}
        onClick={onClick}
        disabled={loading}
        className={`w-full inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold text-black
          ${loading ? "bg-emerald-600/60 cursor-wait" : "bg-linear-to-br from-emerald-400 to-green-500/95 shadow-[0_6px_24px_rgba(16,185,129,0.18)] cursor-pointer"}
        `}
      >
        <ArrowUpRight className="w-5 h-5" />
        <span>{loading ? "Processing..." : `Auto-Procure ${amount} tCO₂e`}</span>
      </motion.button>
    </div>
  );
}
