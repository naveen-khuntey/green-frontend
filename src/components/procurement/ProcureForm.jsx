// src/components/procurement/ProcureForm.jsx
"use client";

import React from "react";

/**
 * ProcureForm
 * - amount (tCO2e)
 * - onChange(amount)
 */
export default function ProcureForm({ amount = 25, onChange = () => {} }) {
  const handleInput = (e) => {
    const v = Number(e.target.value || 0);
    onChange(Math.max(1, Math.min(100, Math.round(v))));
  };

  // cost estimation: simple price per tCO2e (demo)
  const pricePer = 1.0; // $ per tCO2e for demo
  const estimated = (amount * pricePer).toFixed(2);

  return (
    <div className="rounded-2xl border border-white/6 p-6 bg-[#0b1117]/60">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Offset Amount</h2>
        <div className="text-sm text-neutral-400">Select the amount of carbon credits to offset</div>
      </div>

      <div className="mt-6">
        <label className="block mb-2 text-sm text-neutral-300">Amount to offset</label>

        <div className="flex items-center gap-6">
          <input
            type="range"
            min="1"
            max="100"
            value={amount}
            onChange={handleInput}
            className="w-full accent-emerald-400"
            aria-label="Amount to offset"
          />
          <div className="text-2xl font-extrabold text-white">
            {amount} <span className="text-sm text-neutral-400">tCO₂e</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 text-xs text-neutral-400">
          <span>1 tCO₂e</span>
          <span>100 tCO₂e</span>
        </div>

        <div className="mt-4 rounded-lg border border-white/6 p-4 bg-[#0b1117]/40">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-neutral-400">Estimated Cost</div>
              <div className="text-xs text-neutral-400">Payment will be processed on Sepolia testnet</div>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400">
              ${estimated} <span className="text-sm text-neutral-400">PYUSD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
