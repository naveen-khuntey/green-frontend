"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

/**
 * AuditorMode - simple explanatory card with CTA
 * - subtle entrance animation
 */

const appear = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
};

export default function AuditorMode() {
  return (
    <motion.section variants={appear} initial="hidden" animate="show" className="mt-6">
      <div className="rounded-2xl border border-white/6 p-6 bg-[#062017]/40">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-[rgba(16,185,129,0.06)] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-white">Auditor Mode</h3>
            <p className="text-sm text-neutral-400 mt-1">Connect an auditor wallet to decrypt Lit-encrypted proof bundles and verify attestations.</p>
          </div>

          <div>
            <button className="px-4 py-2 rounded-md bg-[#0b1117]/60 border border-white/6 text-sm hover:border-emerald-500/50 transition cursor-pointer">
              Connect Auditor Wallet
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
