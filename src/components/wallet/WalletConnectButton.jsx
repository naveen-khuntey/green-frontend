// src/components/wallet/WalletConnectButton.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@/providers/WalletProvider";

/**
 * WalletConnectButton
 * - Network pill is always visible (default: Sepolia Testnet)
 * - When disconnected: shows network pill + glassy Connect Wallet CTA
 * - When connected: shows network pill + address pill that opens dropdown
 *
 * All hooks are called at top-level to satisfy React Hooks rules.
 */

// constants
const DEFAULT_NETWORK_LABEL = "No Network";
const SUPPORTED_CHAIN_ID = 11155111; // Sepolia

function prettyNetworkLabel(network) {
  if (!network) return DEFAULT_NETWORK_LABEL;
  const { name, chainId } = network;
  if (chainId === SUPPORTED_CHAIN_ID) return "Sepolia Testnet";
  if (name) {
    const nm = String(name).replace(/-/g, " ");
    return nm.charAt(0).toUpperCase() + nm.slice(1);
  }
  if (chainId) return `Chain ${chainId}`;
  return DEFAULT_NETWORK_LABEL;
}

function networkDotColor(network) {
  if (!network) return "bg-neutral-500/80"; // grey when disconnected
  if (network.chainId === SUPPORTED_CHAIN_ID) return "bg-emerald-400/95"; // green if Sepolia
  return "bg-amber-400/95"; // amber for other network
}

export default function WalletConnectButton() {
  // --- Hooks (always called) ---
  const ctx = useWallet(); // may be undefined early, but hook is still called
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // outside click & Escape handler (safe to run even if ctx is undefined)
  useEffect(() => {
    function onDoc(e) {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // --- Derived values (safe to compute even if ctx is undefined) ---
  const address = ctx?.address ?? null;
  const network = ctx?.network ?? null;
  const connectWallet = ctx?.connectWallet;
  const disconnect = ctx?.disconnect;
  const isProcessing = ctx?.isProcessing ?? false;

  const netLabel = prettyNetworkLabel(network);
  const dotClass = networkDotColor(network);

  // helper functions
  function shortAddr(addr = "") {
    if (!addr) return "";
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  }

  async function handleCopy() {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  }

  async function handleConnect() {
    if (!connectWallet) {
      // if hook not ready, fallback to reload which may initialize provider
      try {
        window.location.reload();
      } catch {}
      return;
    }
    await connectWallet();
    // open the menu shortly after connect so user sees state
    setTimeout(() => setOpen(true), 250);
  }

  // --- Rendering (conditional, after hooks) ---
  // If the useWallet context is not ready, show a neutral fallback
  if (!ctx) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-neutral-200 rounded-full bg-white/3 px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-neutral-500/80" />
          <span>{DEFAULT_NETWORK_LABEL}</span>
        </div>

        <button
          onClick={handleConnect}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full font-semibold text-black
                     bg-linear-to-br from-emerald-400 to-green-500/95 shadow-[0_6px_24px_rgba(16,185,129,0.18)]
                     ring-1 ring-white/6 hover:brightness-105 transition"
          aria-label="Connect Wallet"
        >
          <span className="w-2 h-2 rounded-full bg-white/90 shadow-[0_4px_12px_rgba(16,185,129,0.24)]" />
          <span className="text-sm">Connect Wallet</span>
        </button>
      </div>
    );
  }

  // When disconnected (ctx available but no address)
  if (!address) {
    return (
      <div className="flex items-center gap-3">
        {/* Network pill (always visible) */}
        <div className="flex items-center gap-2 text-xs text-neutral-200 rounded-full bg-white/3 px-3 py-2">
          <span className={`w-2 h-2 rounded-full ${dotClass}`} />
          <span>{netLabel}</span>
        </div>

        {/* Connect CTA */}
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={handleConnect}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full font-semibold text-black
                       bg-linear-to-br from-emerald-400 to-green-500/95 shadow-[0_6px_24px_rgba(16,185,129,0.18)]
                       ring-1 ring-white/6 hover:brightness-105 transition cursor-pointer"
            aria-label="Connect Wallet"
          >
            <span className="w-2 h-2 rounded-full bg-white/90 shadow-[0_4px_12px_rgba(16,185,129,0.24)]" />
            <span className="text-sm">{isProcessing ? "Connecting..." : "Connect Wallet"}</span>
          </button>
        </motion.div>
      </div>
    );
  }

  // When connected (address exists)
  return (
    <div className="relative flex items-center gap-3">
      {/* Network pill */}
      <div className="flex items-center gap-2 text-xs text-neutral-200 rounded-full bg-white/3 px-3 py-2">
        <span className={`w-2 h-2 rounded-full ${dotClass}`} />
        <span>{netLabel}</span>
      </div>

      {/* Address pill (opens dropdown) */}
      <div className="relative">
        <button
          ref={buttonRef}
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="inline-flex items-center gap-3 bg-white/6 px-3 py-2 rounded-lg text-sm font-mono hover:bg-white/8 transition cursor-pointer"
          title={address}
        >
          <span className="hidden sm:inline text-xs text-neutral-200">{shortAddr(address)}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" className={`ml-1 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
          </svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-72 bg-[#0f1316] border border-white/6 rounded-lg shadow-lg z-50"
              role="menu"
              aria-label="Wallet menu"
            >
              <div className="p-4">
                <div className="text-xs text-neutral-400 mb-1">Connected</div>
                <div className="text-sm font-mono break-all text-white bg-black/10 px-3 py-2 rounded-md">{address}</div>

                <div className="mt-3 text-xs text-neutral-400">Network</div>
                <div className="text-sm text-white px-3 py-2 rounded-md bg-black/8 mt-1">{netLabel}</div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 px-3 py-2 rounded-md text-sm bg-white/6 hover:bg-white/8 transition"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>

                  <button
                    onClick={() => { disconnect?.(); setOpen(false); }}
                    className="px-3 py-2 rounded-md text-sm bg-rose-700 hover:bg-rose-600 text-white transition"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
