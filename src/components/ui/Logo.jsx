// src/components/ui/Logo.jsx
"use client";

import Image from "next/image";

export default function Logo({ compact = false, size = 44 }) {
  const src = "/logo1.png"; // image in /public folder

  return (
    <div
      className={`flex items-center gap-3 ${compact ? "py-0" : "py-1"}`}
      aria-hidden={compact ? "true" : "false"}
    >
      <div
        className="relative shrink-0"
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* ✅ Explicit width/height required by Next.js */}
        <Image
          src={src}
          alt="GreenChain logo"
          width={size}
          height={size}
          className="object-cover"
          priority
        />
      </div>

      {!compact && (
        <div className="leading-tight">
          <div className="text-lg font-semibold">GreenChain</div>
          <div className="text-xs text-neutral-400 -mt-0.5">
            ESG Automation
          </div>
        </div>
      )}
    </div>
  );
}
