"use client";

import React from "react";
import AutoProcureButton from "./AutoProcureButton";

export default function ProcureControls({ amount = 0, estimatedCost = "0.00", onAmountChange = () => {}, onCostChange = () => {}, onAutoProcure, loading=false }) {
  return (
    <aside className="app-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">Offset Amount</h3>
          <p className="text-sm text-neutral-400">Select the amount of carbon credits to offset</p>
        </div>
        <div className="text-right">
          <div className="text-2xl md:text-3xl font-extrabold">{amount}</div>
          <div className="text-xs text-neutral-400">tCO₂e</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="rounded-md border border-white/6 p-4 bg-[rgba(255,255,255,0.01)]">
          <div className="text-sm text-neutral-400">Estimated Cost</div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <div className="text-2xl font-extrabold text-emerald-400">${estimatedCost}</div>
              <div className="text-xs text-neutral-400">PYUSD</div>
            </div>
            <div>
              <AutoProcureButton amount={amount} loading={loading} onClick={onAutoProcure} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
