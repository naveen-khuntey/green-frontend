// src/components/dashboard/KPICard.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * KPICard
 * props:
 *  - title (string)
 *  - value (string|number)
 *  - unit (string, optional)
 *  - delta (string, optional)
 *  - accent (string) CSS color (defaults to emerald)
 *  - Icon (React component) optional (lucide icon)
 */

export default function KPICard({
  title,
  value,
  unit,
  delta,
  accent = "#16A34A",
  Icon = null,
}) {
  const isPositive =
    !!delta &&
    (delta.includes("↑") ||
      /up\b/i.test(delta) ||
      delta.includes("+") ||
      delta.includes("✅"));
  const isNegative =
    !!delta &&
    (delta.includes("↓") || /down\b/i.test(delta) || delta.includes("-"));
  const deltaCls = isPositive ? "text-emerald-400" : isNegative ? "text-rose-400" : "text-neutral-400";

  // small sparkline path (simple, works without extra libs)
  const Sparkline = ({ color = accent }) => (
    <svg className="w-24 h-6" viewBox="0 0 60 12" preserveAspectRatio="none" aria-hidden>
      <path d="M2 8 C 12 6, 22 10, 34 4, 42 8, 50 6, 58 7" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.98" />
    </svg>
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      role="region"
      aria-label={title}
      className={`
        relative
        rounded-2xl
        border
        border-white/6
        bg-[rgba(15,19,18,0.48)]
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-emerald-400/20
        focus-within:border-emerald-400/18
      `}
    >

      {/* Icon pill (top-right overlay, below sparkline) */}
      {Icon && (
        <div className="absolute top-10 right-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(255,255,255,0.03)]"
            role="img"
            aria-hidden
          >
            {/* icon color slightly muted */}
            <Icon className="w-5 h-5" style={{ color: accent }} />
          </div>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-neutral-300">{title}</h3>

          <div className="mt-4 flex items-end gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold leading-none text-white">{value}</span>
              {unit && <span className="text-sm text-neutral-400"> {unit}</span>}
            </div>
          </div>

          {delta && <div className={`mt-3 text-xs ${deltaCls}`}>{delta}</div>}
        </div>
      </div>
    </motion.article>
  );
}
