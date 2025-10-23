import { useState } from 'react';

export default function useWallet() {
  const [address, setAddress] = useState(null);
  const connect = async () => {
    // later: implement wallet connect (wagmi / ethers)
    alert('Connect wallet: implement using wagmi / rainbowkit');
  };
  return { address, connect, setAddress };
}
