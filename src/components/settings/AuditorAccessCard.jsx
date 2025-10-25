// src/components/settings/AuditorAccessCard.jsx
"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

export default function AuditorAccessCard() {
  const [auditor, setAuditor] = useState("");
  const [list, setList] = useState(["0x742d35f8a9b2c1e4d6f7a3b8c9e1f2d4a5b6c7e8"]);

  function handleAdd(e) {
    e.preventDefault();
    if (!auditor) return;
    setList((s) => [auditor, ...s]);
    setAuditor("");
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <svg className="w-6 h-6 text-neutral-300" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2v20M4 8h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 className="text-lg font-semibold text-white">Auditor Access</h2>
      </div>

      <p className="text-sm text-neutral-400 mb-6">Manage wallet addresses with audit permissions</p>

      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
        <div className="space-y-3">
          {list.map((addr, i) => (
            <div key={i} className="rounded-md bg-[rgba(255,255,255,0.015)] border border-white/6 px-4 py-3 text-sm text-neutral-100">
              {addr}
            </div>
          ))}

          <form onSubmit={handleAdd} className="flex gap-3 items-center">
            <input
              value={auditor}
              onChange={(e) => setAuditor(e.target.value)}
              placeholder="Enter auditor wallet address"
              className="flex-1 rounded-md px-4 py-3 bg-[rgba(255,255,255,0.01)] border border-white/6 text-sm placeholder:text-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-md px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-white/6 hover:bg-[rgba(16,185,129,0.06)] hover:border-emerald-500 cursor-pointer transition text-sm font-semibold"
            >
              Add
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
