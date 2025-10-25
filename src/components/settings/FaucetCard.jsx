"use client";

import React from "react";
import { Droplet, ExternalLink } from "lucide-react";

export default function FaucetCard() {
  return (
    <section className="rounded-2xl border border-white/6 bg-[rgba(255,255,255,0.02)] p-6 group">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-3">
            <Droplet className="w-5 h-5 text-emerald-400" />
            PYUSD Testnet Faucet
          </h3>
          <p className="text-sm text-neutral-400 mt-1">
            Get test PYUSD tokens on Sepolia network for demo purposes
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="rounded-lg border border-emerald-900/40 bg-[rgba(0,0,0,0.18)] p-5">
          <div className="text-sm text-neutral-300 mb-3">
            Get test PYUSD
          </div>
          <button
            onClick={() => alert("Mock faucet trigger")}
            className="inline-flex items-center gap-2 rounded-md bg-[rgba(255,255,255,0.02)] border border-white/6 px-4 py-2 text-sm text-white hover:bg-[rgba(16,185,129,0.06)] hover:border-emerald-600 transition cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            Get Test PYUSD
          </button>
        </div>
      </div>
    </section>
  );
}
