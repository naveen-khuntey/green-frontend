// src/components/settings/EmissionFactorsCard.jsx
"use client";

import { motion } from "framer-motion";
import React from "react";

function FieldRow({ label, value }) {
  return (
    <div className="mb-6">
      <div className="text-sm font-medium text-white mb-2">{label}</div>
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-md bg-[rgba(255,255,255,0.015)] border border-white/6 px-4 py-3 text-sm text-neutral-100">
          {value}
        </div>
        <button
          className="rounded-md px-3 py-2 border border-white/6 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(16,185,129,0.06)] hover:border-emerald-500 cursor-pointer transition"
          aria-label="open source"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-neutral-300">
            <path d="M14 3h7v7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 21H3V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="text-xs text-neutral-500 mt-2">{
        label === "Primary Source"
          ? "Environmental Protection Agency Emission Factors Hub"
          : "UK Government Conversion Factors for Company Reporting"
      }</div>
    </div>
  );
}

export default function EmissionFactorsCard() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <svg className="w-6 h-6 text-neutral-300" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 className="text-lg font-semibold text-white">Emission Factors</h2>
      </div>

      <p className="text-sm text-neutral-400 mb-6">Data sources for carbon calculations</p>

      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
        <FieldRow label="Primary Source" value="EPA 2025 (US)" />
        <FieldRow label="Fallback Source" value="UK Gov 2024" />
      </motion.div>
    </div>
  );
}
