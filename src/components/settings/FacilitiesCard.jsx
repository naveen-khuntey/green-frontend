"use client";

import React from "react";
import { Building2, Plus } from "lucide-react";

export default function FacilitiesCard() {
  return (
    <section className="rounded-2xl border border-white/6 bg-[rgba(255,255,255,0.02)] p-6 group">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-3">
            <Building2 className="w-5 h-5 text-emerald-400" />
            Facilities
          </h3>
          <p className="text-sm text-neutral-400 mt-1">
            Manage your monitored facilities and locations
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-lg border border-white/6 p-5 flex items-center justify-between gap-4 hover:border-emerald-600 transition-all cursor-default">
          <div>
            <div className="font-semibold text-white">Hotel Lisboa</div>
            <div className="text-sm text-neutral-400">Lisbon, Portugal</div>

            <div className="mt-4 text-sm text-neutral-400">
              <div className="inline-block mr-4">
                <div className="text-xs text-neutral-400">Grid Region</div>
                <div className="font-semibold text-emerald-400">EU-PT</div>
              </div>

              <div className="inline-block">
                <div className="text-xs text-neutral-400">Last Reading</div>
                <div className="font-semibold text-white">2 hours ago</div>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-neutral-200">
              Active
            </span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-md bg-[rgba(255,255,255,0.02)] border border-white/6 py-3 text-sm font-medium text-white hover:border-emerald-600 hover:bg-[rgba(16,185,129,0.02)] transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Facility
        </button>
      </div>
    </section>
  );
}
