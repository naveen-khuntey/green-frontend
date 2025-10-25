// src/components/procurement/FacilityUploadCard.jsx
"use client";

import { useState, useRef } from "react";

export default function FacilityUploadCard({ onComputed }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [facilityName, setFacilityName] = useState("");
  const [date, setDate] = useState("");
  const [kwh, setKwh] = useState("");
  const [fuelType, setFuelType] = useState("none");
  const [fuelAmount, setFuelAmount] = useState("");
  const fileRef = useRef(null);

  // emission factors (dummy client-side)
  const FACTORS = {
    electricity: 0.000233, // tCO2e per kWh
    diesel: 0.00268, // tCO2e per liter
    natural_gas: 0.00202, // tCO2e per m³
  };
  const PRICE_PER_TCO2E = 25; // $25 per ton

  // Simple CSV parser
  function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (!lines.length) return [];
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    return lines.slice(1).map((ln) => {
      const cols = ln.split(",").map((c) => c.trim());
      const obj = {};
      headers.forEach((h, i) => (obj[h] = cols[i] ?? ""));
      return obj;
    });
  }

  // Local compute emissions — no backend
  function computeEmissions(totalKwh, fuels = {}) {
    let total = 0;
    total += totalKwh * FACTORS.electricity;
    for (const [type, amt] of Object.entries(fuels)) {
      if (FACTORS[type]) total += amt * FACTORS[type];
    }
    const tCO2e = Math.round(total * 100) / 100;
    const cost = Math.round(tCO2e * PRICE_PER_TCO2E * 100) / 100;
    return { tCO2e, cost };
  }

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMessage(null);
    setLoading(true);

    try {
      const text = await file.text();
      const rows = parseCSV(text);

      let totalKwh = 0;
      const fuels = {};
      rows.forEach((r) => {
        const valKwh = Number(r.kwh || 0);
        totalKwh += isFinite(valKwh) ? valKwh : 0;
        const ft = (r.fuel_type || "none").toLowerCase();
        const fa = Number(r.fuel_amount || 0);
        if (ft !== "none" && isFinite(fa)) fuels[ft] = (fuels[ft] || 0) + fa;
      });

      const result = computeEmissions(totalKwh, fuels);

      setMessage({
        type: "success",
        text: `Computed ${result.tCO2e} tCO₂e — $${result.cost} PYUSD`,
      });
      onComputed?.(result);
    } catch (err) {
      setMessage({ type: "error", text: "Error parsing file" });
    } finally {
      setLoading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleManualSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const totalKwh = Number(kwh) || 0;
      const fuels = {};
      if (fuelType !== "none" && fuelAmount) fuels[fuelType] = Number(fuelAmount);

      const result = computeEmissions(totalKwh, fuels);

      setMessage({
        type: "success",
        text: `Computed ${result.tCO2e} tCO₂e — $${result.cost} PYUSD`,
      });
      onComputed?.(result);
    } catch (err) {
      setMessage({ type: "error", text: "Error computing emissions" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-white/6 bg-[rgba(255,255,255,0.02)] p-6">
      <h2 className="text-lg font-semibold text-white">Upload Facility Bills</h2>
      <p className="text-sm text-neutral-400 mt-1">
        Upload CSV of bills or enter a single facility. CSV columns:{" "}
        <code className="bg-transparent text-xs px-1 py-0.5 rounded">facility_name,date,kWh,fuel_type,fuel_amount</code>.
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* CSV Upload */}
        <div className="space-y-2">
          <label className="text-sm text-neutral-300">CSV Upload</label>

          {/* styled file input - should appear consistent with other cards width */}
          <div className="relative inline-block w-full">
            <input
              ref={fileRef}
              onChange={handleFile}
              type="file"
              accept=".csv,text/csv"
              className="block w-full text-sm text-neutral-200
                         file:mr-4 file:py-2 file:px-3 file:rounded-md
                         file:border file:border-white/6
                         file:bg-[rgba(255,255,255,0.02)] cursor-pointer"
              disabled={loading}
            />
          </div>

          <div className="text-xs text-neutral-500">
            Example row: Hotel Lisboa,2025-10-12,420,none,0
          </div>
        </div>

      </div>

      {message && (
        <div className={`mt-4 text-sm ${message.type === "success" ? "text-emerald-400" : "text-rose-400"}`}>
          {message.text}
        </div>
      )}
    </section>
  );
}
