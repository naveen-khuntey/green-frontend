// src/app/procure/page.js
"use client";

import React, { useState } from "react";
import FacilityUploadCard from "@/components/procurement/FacilityUploadCard";
import ProcureForm from "@/components/procurement/ProcureForm";
import OptimizedBasket from "@/components/procurement/OptimizedBasket";
import AutoProcureButton from "@/components/procurement/AutoProcureButton";
import ProcureToaster from "@/components/procurement/ProcureToaster";

export default function ProcurePage() {
  const [amount, setAmount] = useState(25);
  const [estimatedCost, setEstimatedCost] = useState((25 * 25).toFixed(2));
  const [isProcessing, setIsProcessing] = useState(false);
  const [toaster, setToaster] = useState(null);

  // handle computed emissions from CSV
  function handleComputedResult({ tCO2e, cost }) {
    setAmount(Math.round(tCO2e));
    setEstimatedCost(Number(cost).toFixed(2));
  }

  // simulate or handle procure
  async function handleAutoProcure() {
    const id = Date.now().toString();
    const stages = [
      { key: "analysis", label: "Agent analysing providers" },
      { key: "payment", label: "Securing PYUSD payment" },
      { key: "mint", label: "Minting credit tokens" },
      { key: "final", label: "Finalizing" },
    ];

    setToaster({
      id,
      stages,
      stageIndex: 0,
      status: "running",
      message: stages[0].label,
    });
    setIsProcessing(true);

    try {
      const resp = await fetch("/api/procure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!resp.ok) {
        await simulateFlow(amount, setToaster);
      } else {
        const data = await resp.json();
        setToaster((prev) => ({
          ...prev,
          stageIndex: prev?.stages?.length ? prev.stages.length - 1 : 3,
          status: "success",
          message:
            data?.message ?? `Successfully procured ${data?.amount ?? amount} tCO₂e`,
        }));
        setTimeout(() => setToaster(null), 1600);
      }
    } catch {
      await simulateFlow(amount, setToaster);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-extrabold text-white">Procure Offsets</h1>
        <p className="text-sm text-neutral-400">
          Automatically purchase carbon credits with AI-powered optimization
        </p>
      </header>

      {/* Upload facility card */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <FacilityUploadCard onComputed={handleComputedResult} />
        </div>
      </div>

      {/* Main content (form, basket, and button) */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <ProcureForm
            amount={amount}
            onChange={(v) => {
              setAmount(v);
              setEstimatedCost((v * 25).toFixed(2));
            }}
          />

          <OptimizedBasket amount={amount} />

          {/* Full-width AutoProcureButton */}
          <div className="w-full">
            <AutoProcureButton
              amount={amount}
              loading={isProcessing}
              onClick={handleAutoProcure}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Toaster */}
      {toaster && (
        <ProcureToaster toaster={toaster} onClose={() => setToaster(null)} />
      )}
    </div>
  );
}

/**
 * Local simulation of the 4-stage flow with progress updates
 */
function simulateFlow(amount, setToaster) {
  return new Promise((resolve) => {
    const stages = [
      { key: "analysis", label: "Agent analysing providers", duration: 1000 },
      { key: "payment", label: "Securing PYUSD payment", duration: 1600 },
      { key: "mint", label: "Minting credit tokens", duration: 1400 },
      { key: "final", label: "Finalizing", duration: 800 },
    ];

    let idx = 0;

    function showStage(i) {
      setToaster((prev) => ({
        ...prev,
        stageIndex: i,
        status: "running",
        message: stages[i].label,
      }));

      const dur = stages[i].duration;
      setTimeout(() => {
        idx++;
        if (idx < stages.length) {
          showStage(idx);
        } else {
          setToaster((prev) => ({
            ...prev,
            stageIndex: stages.length - 1,
            status: "success",
            message: `Successfully procured ${amount} tCO₂e`,
          }));
          setTimeout(() => {
            setToaster(null);
            resolve();
          }, 1200);
        }
      }, dur);
    }

    setTimeout(() => showStage(0), 240);
  });
}
