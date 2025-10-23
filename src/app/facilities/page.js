import UploadCSV from '@/components/emissions/UploadCSV';

export default function FacilitiesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Facilities</h1>
      <p className="text-muted mt-2">Upload utility bills or stream meter data.</p>

      <div className="mt-6">
        <UploadCSV />
      </div>
    </div>
  );
}
