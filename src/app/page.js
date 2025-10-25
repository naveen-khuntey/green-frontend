// src/app/page.js
import KPIGrid from "@/components/dashboard/KPIGrid";
import EmissionsChart from "@/components/dashboard/EmissionsChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FacilityCard from "@/components/emissions/FacilityCard";

export const metadata = {
  title: "GreenChain — Dashboard",
  description:
    "Monitor emissions, auto-procure offsets and generate on-chain proofs",
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white">
            Dashboard
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Monitor your carbon footprint and offset progress
          </p>
        </div>
      </header>

      {/* KPI row */}
      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">
          Key performance indicators
        </h2>
        <KPIGrid />
      </section>

      {/* Chart + Activity (2:2 layout to match KPI grid) */}
      <section
        aria-label="Overview"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
      >
        <div className="h-full">
          <EmissionsChart />
        </div>
        <div className="h-full">
          <RecentActivity />
        </div>
      </section>
    </div>
  );
}
