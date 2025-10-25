// src/components/dashboard/KPIGrid.jsx
"use client";

import KPICard from "./KPICard";
import { Cloud, Leaf, ArrowDownRight, DollarSign } from "lucide-react";

/**
 * KPIGrid - lays out KPI cards responsively and passes icons + accents
 */
export default function KPIGrid({ items }) {
  const data =
    items ?? [
      {
        title: "Monthly Emissions",
        value: "25.0",
        unit: "tCO₂e",
        delta: "↓ 8% from last month",
        Icon: Cloud,
        accent: "#16A34A",
      },
      {
        title: "Offsets Purchased",
        value: "25.0",
        unit: "tCO₂e",
        delta: "✅ 68% auto-procured",
        Icon: Leaf,
        accent: "#16A34A",
      },
      {
        title: "Coverage",
        value: "100",
        unit: "%",
        delta: "Carbon neutral",
        Icon: ArrowDownRight,
        accent: "#16A34A",
      },
      {
        title: "PYUSD Spent",
        value: "$25.00",
        unit: "PYUSD",
        delta: null,
        Icon: DollarSign,
        accent: "#16A34A",
      },
    ];

  return (
    <section aria-label="Key performance indicators" className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((d, i) => (
          <KPICard
            key={i}
            title={d.title}
            value={d.value}
            unit={d.unit}
            delta={d.delta}
            accent={d.accent}
            Icon={d.Icon}
          />
        ))}
      </div>
    </section>
  );
}
