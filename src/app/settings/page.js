// src/app/settings/page.js
"use client";

import { motion } from "framer-motion";
import SectionCard from "@/components/ui/SectionCard";
import FacilitiesCard from "@/components/settings/FacilitiesCard";
import EmissionFactorsCard from "@/components/settings/EmissionFactorsCard";
import AuditorAccessCard from "@/components/settings/AuditorAccessCard";
import FaucetCard from "@/components/settings/FaucetCard";

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <motion.header
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-extrabold text-white">Settings</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Configure your facilities and emission factors
          </p>
        </motion.header>

        <motion.main
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="space-y-6"
        >
          <SectionCard>
            <FacilitiesCard />
          </SectionCard>

          <SectionCard>
            <EmissionFactorsCard />
          </SectionCard>

          <SectionCard>
            <AuditorAccessCard />
          </SectionCard>

          <SectionCard>
            <FaucetCard />
          </SectionCard>
        </motion.main>
      </div>
    </div>
  );
}
