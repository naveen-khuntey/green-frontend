"use client";

import React, { useState } from "react";
import { ShieldCheck, Plus } from "lucide-react";

export default function AuditorAccessCard() {
  const [addr, setAddr] = useState("");
  const [list, setList] = useState([
    "0x742d35f8a9b2c1e4d6f7a3b8c9e1f2d4a5b6c7e8",
  ]);

  const addAddress = () => {
    if (!addr) return;
    setList((s) => [...s, addr]);
    setAddr("");
  };

  return (
    <section className="rounded-2xl border border-white/6 bg-[rgba(255,255,255,0.02)] p-6 group">
      <h3 className="text-lg font-semibold text-white flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        Auditor Access
      </h3>
      <p className="text-sm text-neutral-400 mt-1">
        Manage wallet addresses with audit permissions
      </p>

      <div className="mt-6 space-y-4">
        {list.map((a, i) => (
          <div
            key={i}
            className="rounded-md bg-[rgba(255,255,255,0.01)] border border-white/6 px-4 py-3 text-sm text-neutral-200"
          >
            {a}
          </div>
        ))}

        <div className="flex gap-3">
          <input
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            placeholder="Enter auditor wallet address"
            className="flex-1 rounded-md bg-[rgba(255,255,255,0.01)] border border-white/6 px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 transition"
          />
          <button
            onClick={addAddress}
            className="rounded-md flex items-center gap-2 bg-[rgba(255,255,255,0.02)] border border-white/6 px-4 py-3 text-sm font-medium text-white hover:bg-[rgba(16,185,129,0.06)] hover:border-emerald-600 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </section>
  );
}
