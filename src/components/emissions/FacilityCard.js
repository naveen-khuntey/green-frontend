export default function FacilityCard({ name, id }) {
  return (
    <div className="gc-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="text-sm gc-muted mt-1">ID: <span className="addr">{id}</span></div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold gc-accent">{420}</div>
          <div className="text-xs gc-muted mt-1">tCO₂e / mo</div>
        </div>
      </div>
      <div className="mt-3 text-sm gc-muted">Last uploaded: 12 Oct 2025</div>
    </div>
  );
}
