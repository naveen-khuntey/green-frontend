import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FacilityCard from '@/components/emissions/FacilityCard';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">GreenChain Dashboard</h1>
          <p className="text-muted mt-1">Track emissions, auto-procure offsets, and generate on-chain proofs.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost">Get Test PYUSD</Button>
          <Button>Upload CSV</Button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h3 className="text-muted text-sm">This month (tCO₂e)</h3>
          <div className="text-3xl font-bold mt-3">1,240</div>
          <p className="text-sm text-muted mt-2">Auto-procured: 68%</p>
        </Card>

        <Card>
          <h3 className="text-muted text-sm">PYUSD Spent</h3>
          <div className="text-3xl font-bold mt-3">$3,780</div>
          <p className="text-sm text-muted mt-2">Credits retired</p>
        </Card>

        <Card>
          <h3 className="text-muted text-sm">Last Retirement</h3>
          <div className="text-ellipsis mt-3 font-mono">0x12ab...f9ee</div>
          <p className="text-xs text-muted mt-2">Sepolia • View on Blockscout</p>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Facilities</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FacilityCard name="Hotel Lisboa" id="fac-001" />
          <FacilityCard name="Manufacturing Unit A" id="fac-002" />
          <FacilityCard name="Office HQ" id="fac-003" />
        </div>
      </section>
    </div>
  );
}
