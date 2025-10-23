// src/components/wallet/WalletConnectButton.jsx
"use client";

import { useState } from "react";
import { useWallet } from "@/providers/WalletProvider";
import Button from "@/components/ui/Button";

function shortAddr(addr = "") {
  if (!addr) return "";
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

export default function WalletConnectButton() {
  const { address, network, connectWallet, disconnect, isProcessing } = useWallet();
  const [copied, setCopied] = useState(false);

  async function handleConnect() {
    try {
      await connectWallet();
    } catch (e) {
      console.error(e);
    }
  }

  function handleCopy() {
    if (!address) return;
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  }

  // Try to switch to Sepolia (chainId 11155111 => 0xaa36a7)
  async function switchToSepolia() {
    if (!window.ethereum) return alert("No injected wallet");
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
    } catch (err) {
      console.error("switch network error", err);
      alert("Network switch failed. Add Sepolia to your wallet manually.");
    }
  }

  return (
    <div className="flex items-center gap-2">
      {address ? (
        <>
          <div className="bg-white/6 px-3 py-2 rounded-lg text-sm font-mono flex items-center gap-3">
            <span>{shortAddr(address)}</span>
            <button onClick={handleCopy} className="text-xs text-muted hover:underline">
              {copied ? "copied" : "copy"}
            </button>
          </div>

          <div className="text-xs text-muted">
            {network ? `${network.name ?? "chain"} (${network.chainId})` : "no network"}
          </div>

          {network?.chainId !== 11155111 && (
            <button
              onClick={switchToSepolia}
              className="text-xs px-3 py-1 rounded-md bg-white/6 hover:bg-white/8"
            >
              Switch to Sepolia
            </button>
          )}

          <Button onClick={disconnect} variant="ghost">
            Disconnect
          </Button>
        </>
      ) : (
        <Button onClick={handleConnect}>{isProcessing ? "Connecting..." : "Connect Wallet"}</Button>
      )}
    </div>
  );
}
