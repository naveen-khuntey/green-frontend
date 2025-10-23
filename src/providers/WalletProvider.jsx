// src/providers/WalletProvider.jsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

/**
 * WalletProvider
 * - Exposes: address, provider, network, isProcessing
 * - Actions: connectWallet(), disconnect(), getSigner()
 */
export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.ethereum) return;

    const p = new ethers.BrowserProvider(window.ethereum);
    setProvider(p);

    // initial network
    p.getNetwork()
      .then((n) => setNetwork(n))
      .catch(() => {});

    // check if already connected
    p.send("eth_accounts", [])
      .then((accounts) => {
        if (accounts && accounts.length) setAddress(accounts[0]);
      })
      .catch(() => {});

    // account change handler
    const handleAccountsChanged = (accounts) => {
      if (accounts && accounts.length) setAddress(accounts[0]);
      else setAddress(null);
    };

    // chain change handler (recreate provider and refetch network)
    const handleChainChanged = async () => {
      try {
        const p2 = new ethers.BrowserProvider(window.ethereum);
        setProvider(p2);
        const n = await p2.getNetwork();
        setNetwork(n);
      } catch (e) {
        setNetwork(null);
      }
    };

    window.ethereum?.on?.("accountsChanged", handleAccountsChanged);
    window.ethereum?.on?.("chainChanged", handleChainChanged);

    return () => {
      window.ethereum?.removeListener?.("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener?.("chainChanged", handleChainChanged);
    };
  }, []);

  async function connectWallet() {
    if (typeof window === "undefined") return null;
    if (!window.ethereum) {
      alert("MetaMask / Injected wallet not found!");
      return null;
    }

    setIsProcessing(true);
    try {
      const p = new ethers.BrowserProvider(window.ethereum);
      await p.send("eth_requestAccounts", []);
      const signer = await p.getSigner();
      const addr = await signer.getAddress();
      setProvider(p);

      try {
        const n = await p.getNetwork();
        setNetwork(n);
      } catch (e) {
        setNetwork(null);
      }

      setAddress(addr);
      return addr;
    } catch (err) {
      console.error("connectWallet error:", err);
      alert("Wallet connect failed: " + (err?.message || err));
      return null;
    } finally {
      setIsProcessing(false);
    }
  }

  function disconnect() {
    // injected wallets can't be programmatically disconnected
    setAddress(null);
  }

  async function getSigner() {
    if (!provider) {
      if (typeof window !== "undefined" && window.ethereum) {
        const p = new ethers.BrowserProvider(window.ethereum);
        setProvider(p);
        return p.getSigner();
      }
      return null;
    }
    return provider.getSigner();
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        provider,
        connectWallet,
        disconnect,
        getSigner,
        network,
        isProcessing,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
