// src/components/emissions/UploadCSV.js
'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function UploadCSV() {
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);
  const [previewRows, setPreviewRows] = useState([]);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setError(null);
    setPreviewRows([]);

    // simple client-side CSV read (you can replace with PapaParse later)
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target.result;
        // naive split — replace with PapaParse for robust parsing later
        const lines = text.split(/\r?\n/).filter(Boolean);
        const rows = lines.slice(0, 10).map(line => line.split(',').map(c => c.trim()));
        setPreviewRows(rows);
        // later: POST parsed data to backend /readings
      } catch (err) {
        setError('Failed to parse file');
      }
    };
    reader.onerror = () => setError('Failed to read file');
    reader.readAsText(f);
  }

  return (
    <div className="rounded-2xl bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Upload Utility Bills (CSV)</h3>
          <p className="text-sm text-muted mt-1">Map columns (date, kWh, fuel type) after upload.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer">
            <input type="file" accept=".csv" onChange={handleFile} className="hidden" />
            <Button variant="ghost">{fileName ? 'Selected: ' + fileName : 'Choose file'}</Button>
          </label>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {previewRows.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Preview (first {previewRows.length} rows)</h4>
          <div className="overflow-auto rounded-md border border-surface/60 bg-black/10 p-2">
            <table className="min-w-full text-sm">
              <tbody>
                {previewRows.map((r, i) => (
                  <tr key={i} className={i % 2 ? 'bg-white/2' : ''}>
                    {r.map((c, j) => (
                      <td key={j} className="px-2 py-1 whitespace-nowrap">
                        <span className="text-sm">{c}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex gap-3">
            <Button>Map Columns</Button>
            <Button variant="ghost">Send to Backend</Button>
          </div>
        </div>
      )}
    </div>
  );
}
