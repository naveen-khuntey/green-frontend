// src/components/settings/FaucetCard.jsx
"use client";

import { motion } from "framer-motion";
import React from "react";

export default function FaucetCard() {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <svg className="w-6 h-6 text-neutral-300" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2v10M8 8h8M4 20h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 className="text-lg font-semibold text-white">PYUSD Testnet Faucet</h2>
      </div>

      <p className="text-sm text-neutral-400 mb-6">Get test PYUSD tokens on Sepolia network for demo purposes</p>

      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
        <div className="rounded-md border border-emerald-800/30 p-5 bg-[rgba(0,0,0,0.14)]">
          <p className="text-sm text-neutral-300 mb-4">Get test PYUSD</p>

          <a
            role="button"
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border border-white/6 hover:bg-[rgba(16,185,129,0.06)] hover:border-emerald-500 cursor-pointer text-sm font-semibold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-neutral-200">
              <path d="M14 3h7v7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21H3V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Get Test PYUSD
          </a>
        </div>
      </motion.div>
    </>
  );
}
