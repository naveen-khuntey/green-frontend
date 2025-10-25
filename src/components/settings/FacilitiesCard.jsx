// src/components/settings/FacilitiesCard.jsx
"use client";

import { motion } from "framer-motion";
import React from "react";

export default function FacilitiesCard() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <svg className="w-6 h-6 text-neutral-300" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 6h18M6 6v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 className="text-lg font-semibold text-white">Facilities</h2>
      </div>

      <p className="text-sm text-neutral-400 mb-6">Manage your monitored facilities and locations</p>

      <motion.div
        className="rounded-lg border border-white/6 p-5 bg-[rgba(255,255,255,0.01)]"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white">Hotel Lisboa</div>
            <div className="text-xs text-neutral-400">Lisbon, Portugal</div>

            <div className="mt-3 text-xs text-neutral-400">
              <div>Grid Region</div>
              <div className="mt-1 font-semibold text-emerald-400">EU-PT</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-neutral-400">Last Reading</div>
            <div className="mt-1 font-semibold text-white">2 hours ago</div>
            <div className="mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/4 text-white cursor-default">Active</span>
            </div>
          </div>
        </div>

        <button
          className="mt-6 w-full rounded-md bg-[rgba(255,255,255,0.02)] border border-white/6 py-3 text-sm font-semibold text-white transition hover:border-emerald-500 hover:bg-[rgba(16,185,129,0.02)] cursor-pointer"
          aria-label="Add new facility"
        >
          Add New Facility
        </button>
      </motion.div>
    </div>
  );
}
