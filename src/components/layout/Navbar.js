// src/components/layout/Navbar.js
import Link from 'next/link';
import WalletConnectButton from '@/components/wallet/WalletConnectButton';

export default function Navbar() {
  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold">G</div>
            <div>
              <Link href="/" className="text-lg font-semibold leading-tight">GreenChain</Link>
              <div className="text-xs text-muted -mt-0.5">Carbon automation</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5 ml-6 text-sm text-gray-700">
            <Link href="/" className="hover:underline">Overview</Link>
            <Link href="/procure" className="hover:underline">Procure</Link>
            <Link href="/ledger" className="hover:underline">Ledger</Link>
            <Link href="/facilities" className="hover:underline">Facilities</Link>
            <Link href="/auditor" className="hover:underline">Auditor</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
