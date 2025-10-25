// src/components/layout/Navbar.js
import WalletConnectButton from "@/components/wallet/WalletConnectButton";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  return (
    <header className="w-full bg-transparent border-b border-black/10">
      <div className="container flex items-center justify-between py-3">
        {/* Left side: small compact logo on mobile */}
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Logo size={28} compact={true} />
          </div>
        </div>

        {/* Right side: network / wallet */}
        <div className="flex items-center gap-3">
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
