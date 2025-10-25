// src/components/dashboard/RecentActivity.jsx
"use client";

import { ExternalLink, CheckCircle } from "lucide-react";
import Card from "@/components/ui/Card";

const rows = [
  { title: "Retired Credits", subtitle: "2 hours ago", amount: "25 tCO₂e" },
  { title: "Procured Credits", subtitle: "2 hours ago", amount: "25 tCO₂e" },
  { title: "PYUSD Payment", subtitle: "2 hours ago", amount: "25.00 PYUSD" },
];

export default function RecentActivity({ items = rows }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <p className="text-sm text-neutral-400">Complete history of retired carbon credits</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 rounded-lg border border-white/6 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/6 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{r.title}</div>
                <div className="text-xs text-neutral-400">{r.subtitle}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-neutral-200 bg-white/6 px-3 py-1 rounded-full">{r.amount}</div>
              <button aria-label="Open explorer" className="p-2 rounded-md text-neutral-300 hover:text-white">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
