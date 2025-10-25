"use client";

import React from "react";
import { Database, ExternalLink } from "lucide-react";

export default function EmissionFactorsCard() {
  return (
    <section className="rounded-2xl border border-white/6 bg-[rgba(255,255,255,0.02)] p-6 group">
      <h3 className="text-lg font-semibold text-white flex items-center gap-3">
        <Database className="w-5 h-5 text-emerald-400" />
        Emission Factors
      </h3>
      <p className="text-sm text-neutral-400 mt-1">
        Data sources for carbon calculations
      </p>

      <div className="mt-6 space-y-5">
        {[
          {
            label: "Primary Source",
            value: "EPA 2025 (US)",
            desc: "Environmental Protection Agency Emission Factors Hub",
          },
          {
            label: "Fallback Source",
            value: "UK Gov 2024",
            desc: "UK Government Conversion Factors for Company Reporting",
          },
        ].map((f, i) => (
          <div key={i}>
            <label className="block text-sm font-medium text-white mb-2">
              {f.label}
            </label>
            <div className="flex gap-3 items-center">
              <input
                className="flex-1 rounded-md bg-[rgba(255,255,255,0.02)] border border-white/6 px-4 py-3 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 transition"
                defaultValue={f.value}
              />
              <button className="p-3 rounded-md border border-white/6 hover:border-emerald-600 hover:bg-[rgba(16,185,129,0.06)] transition cursor-pointer">
                <ExternalLink className="w-4 h-4 text-neutral-300" />
              </button>
            </div>
            <div className="text-xs text-neutral-500 mt-2">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
