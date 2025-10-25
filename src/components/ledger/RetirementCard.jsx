// src/components/ledger/RetirementCard.jsx
"use client";
import React from "react";
import { ExternalLink, Lock, CheckCircle } from "lucide-react";

export default function RetirementCard({ id, label, date, amount, verified = false }) {
  return (
    <article
      className="group rounded-lg border border-white/6 p-4 bg-[rgba(255,255,255,0.01)]
                 hover:border-emerald-500/60 focus-within:border-emerald-500/60 
                 transition-colors duration-150 flex flex-col md:flex-row md:items-center 
                 md:justify-between gap-4"
      tabIndex={0}
    >
      {/* Left section */}
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-[#0b1117] border border-white/6 flex items-center justify-center text-emerald-400 shrink-0">
          <CheckCircle className="w-5 h-5" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-mono text-white break-all">{id}</span>
            {verified && (
              <span className="text-xs bg-white/6 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                verified
              </span>
            )}
          </div>

          <div className="text-sm text-neutral-300 mt-1">{label}</div>
          <div className="text-xs text-neutral-400 mt-0.5">{date}</div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 md:gap-4">
        <div className="text-right">
          <div className="text-lg font-extrabold text-white">{amount}</div>
          <div className="text-xs text-neutral-400">tCO₂e <span className="text-[11px]">Retired</span></div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/6 px-3 py-2 text-sm 
                       bg-[rgba(255,255,255,0.02)] hover:border-emerald-500/40 transition"
          >
            <ExternalLink className="w-4 h-4" />
            Explorer
          </a>

          <button
            className="inline-flex items-center gap-1.5 rounded-md border border-white/6 px-3 py-2 text-sm 
                       bg-[rgba(255,255,255,0.02)] text-neutral-400 cursor-not-allowed"
            disabled
          >
            <Lock className="w-4 h-4" />
            Proof
          </button>
        </div>
      </div>
    </article>
  );
}
