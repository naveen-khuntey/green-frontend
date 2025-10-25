"use client";

import React from "react";
import { motion } from "framer-motion";
import RetirementCard from "./RetirementCard";

/**
 * RetiredCreditsList
 * - Big container with inner list of retirement rows
 * - Entrance animation with stagger
 */

const container = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export default function RetiredCreditsList({ items }) {
  // sample data; replace with API data later
  const data = items ?? [
    { id: "0x742d...3a4f", label: "Mixed Basket", date: "2025-01-15", amount: 25, verified: true },
    { id: "0x34fa...9c1e", label: "Rainforest Alliance", date: "2024-12-20", amount: 20, verified: true },
    { id: "0x56de...1a8b", label: "Direct Air Capture", date: "2024-11-18", amount: 30, verified: true },
  ];

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="rounded-2xl border border-white/6 bg-[#0b1117]/60 p-6"
      aria-labelledby="retired-heading"
    >
      <h2 id="retired-heading" className="text-xl font-semibold text-white mb-4">Retired Credits</h2>

      <div className="space-y-3">
        {data.map((r, i) => (
          <motion.div key={r.id} className="">
            <RetirementCard {...r} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
