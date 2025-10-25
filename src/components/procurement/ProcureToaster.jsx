"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

/**
 * Compact single-line toaster (bottom-right)
 * Displays one status line at a time.
 */
export default function ProcureToaster({ toaster, onClose = () => {} }) {
  const [currentStage, setCurrentStage] = useState(0);

  // move through stages automatically
  useEffect(() => {
    if (!toaster?.stages?.length) return;

    const stages = toaster.stages;
    let idx = 0;
    setCurrentStage(0);

    const interval = setInterval(() => {
      idx++;
      if (idx < stages.length) {
        setCurrentStage(idx);
      } else {
        clearInterval(interval);
      }
    }, 1800); // stage duration

    return () => clearInterval(interval);
  }, [toaster?.id]);

  // auto-close after finish
  useEffect(() => {
    if (toaster?.status === "success" || toaster?.status === "failed") {
      const t = setTimeout(onClose, 2500);
      return () => clearTimeout(t);
    }
  }, [toaster?.status, onClose]);

  if (!toaster) return null;

  const current = toaster.stages?.[currentStage];
  const isDone = toaster.status === "success" || toaster.status === "failed";

  let icon = <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />;
  let text = current?.label ?? "Processing...";
  if (toaster.status === "success") {
    icon = <CheckCircle className="w-4 h-4 text-emerald-400" />;
    text = `Successfully procured ${toaster.result?.amount ?? ""} tCO₂e credits`;
  } else if (toaster.status === "failed") {
    icon = <XCircle className="w-4 h-4 text-rose-400" />;
    text = "Failed to procure credits";
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={isDone ? toaster.status : currentStage}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#0b1117]/90 px-4 py-3 shadow-lg backdrop-blur-md min-w-[260px]"
        >
          {icon}
          <span className="text-sm text-neutral-200">{text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
