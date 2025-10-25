"use client";

import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import Card from "@/components/ui/Card";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

// helper: produce last N months ending with current month
function lastNMonthsLabels(n = 6) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const labels = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(months[d.getMonth()]);
  }
  return labels;
}

// generate random demo data near baseline
function generateDemoSeries(n = 6, baseline = 22, variance = 3.2) {
  const out = [];
  let cur = baseline;
  for (let i = 0; i < n; i++) {
    cur += (Math.random() - 0.5) * variance;
    out.push(Math.max(1, Math.round(cur * 10) / 10));
  }
  return out;
}

export default function EmissionsChart({ values = null }) {
  const labels = useMemo(() => lastNMonthsLabels(6), []);
  const datapoints = useMemo(() => {
    if (Array.isArray(values) && values.length >= 6) {
      return values.slice(-6);
    }
    return generateDemoSeries(6);
  }, [values]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "tCO₂e",
        data: datapoints,
        fill: true,
        borderColor: "#10B981",
        borderWidth: 2.4,
        tension: 0.36,
        pointRadius: 4,
        pointBackgroundColor: "#16A34A",
        pointBorderColor: "#0b1112",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(16,185,129,0.25)"); // top glow
          gradient.addColorStop(1, "rgba(10,40,30,0.05)");  // bottom fade
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#0b1112",
        titleColor: "#ffffff",
        bodyColor: "#d1fae5",
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: (context) => ` ${context.raw} tCO₂e`,
        },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#9ca3af",
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...datapoints) + 6,
        grid: {
          color: "rgba(255,255,255,0.04)",
          borderDash: [4, 4],
        },
        ticks: {
          color: "#9ca3af",
          font: { size: 12 },
        },
      },
    },
    interaction: { mode: "index", intersect: false },
  };

  return (
    <Card className="min-h-[320px] h-full border border-white/5 bg-[#0b1117]/70 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Emissions Trend</h3>
          <p className="text-sm text-neutral-400">Last 6 months</p>
        </div>
      </div>

      <div className="mt-5 h-[260px]">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
}
