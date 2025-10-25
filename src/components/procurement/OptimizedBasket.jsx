// src/components/procurement/OptimizedBasket.jsx
"use client";

import React from "react";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

/**
 * OptimizedBasket - provider rows show thin green border on hover but do NOT lift.
 */

const container = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.36, ease: "easeOut" } },
};

export default function OptimizedBasket({ amount = 25 }) {
  const providers = [
    { id: 1, name: "Rainforest Alliance", type: "Nature-based", vintage: "2024", share: 0.6, price: 0.45 },
    { id: 2, name: "Direct Air Capture", type: "Tech-based", vintage: "2024", share: 0.4, price: 0.65 },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="rounded-2xl border border-white/6 p-6 bg-[#0b1117]/60"
    >
      <h3 className="text-lg font-semibold text-white">Optimized Basket</h3>
      <p className="text-sm text-neutral-400 mt-1">AI-selected providers based on price, quality, and vintage</p>

      <div className="mt-4 space-y-3">
        {providers.map((p) => (
          <motion.div
            key={p.id}
            variants={item}
            className={
              "group rounded-lg border border-white/6 p-3 flex items-center justify-between bg-[rgba(255,255,255,0.02)] " +
              "transition-colors duration-200 ease-out hover:border-emerald-500/60 focus-within:border-emerald-500/60"
            }
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(16,185,129,0.06)] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-400" />
              </div>

              <div>
                <div className="font-semibold text-white">{p.name}</div>
                <div className="text-xs text-neutral-400 mt-1 flex items-center gap-3">
                  <span className="inline-block bg-[#0b1117] px-2 py-1 rounded-full text-xs border border-white/6">
                    {p.type}
                  </span>
                  <span className="text-xs text-neutral-400">Vintage {p.vintage}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-white">{Math.round(p.share * 100)}%</div>
              <div className="text-xs text-neutral-400">${p.price}/tCO₂e</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
