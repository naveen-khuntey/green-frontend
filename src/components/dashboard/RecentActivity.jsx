"use client";

import React from "react";
import { CheckCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentActivity() {
  const activities = [
    { id: 1, label: "Retired Credits", amount: "25 tCO₂e", time: "2 hours ago" },
    { id: 2, label: "Procured Credits", amount: "25 tCO₂e", time: "2 hours ago" },
    { id: 3, label: "PYUSD Payment", amount: "25.00 PYUSD", time: "2 hours ago" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl border border-white/6 p-6 bg-[#0b1117]/60"
    >
      <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
      <p className="text-sm text-neutral-400 mt-1">
        Complete history of retired carbon credits
      </p>

      <div className="mt-4 space-y-3">
        {activities.map((a) => (
          <motion.div
            key={a.id}
            className="group flex items-center justify-between rounded-lg border border-white/6 bg-[rgba(255,255,255,0.02)] p-3
                       transition-colors duration-200 ease-out hover:border-emerald-500/60"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>

              <div>
                <div className="font-medium text-white">{a.label}</div>
                <div className="text-xs text-neutral-400">{a.time}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 text-sm rounded-full bg-white/5 text-neutral-200 border border-white/10">
                {a.amount}
              </div>

              {/* 👇 Hover + cursor pointer added here */}
              <a
                href="#"
                className="p-2 rounded-md hover:bg-white/5 transition cursor-pointer"
                title="View on explorer"
              >
                <ExternalLink className="w-4 h-4 text-neutral-300 hover:text-emerald-400" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
