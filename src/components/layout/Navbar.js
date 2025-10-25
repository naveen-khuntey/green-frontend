"use client";

import WalletConnectButton from "@/components/wallet/WalletConnectButton";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-transparent border-b border-white/6">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo only for mobile (hidden on md+) */}
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/" className="flex items-center gap-2">
              <Logo size={28} compact={true} />
              <span className="font-semibold text-white text-base">GreenChain</span>
            </Link>
          </div>

          {/* Right: Wallet / controls */}
          <div className="flex items-center gap-3 ml-auto">
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}
