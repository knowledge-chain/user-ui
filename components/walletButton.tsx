'use client'

import { useBlockchain } from "../blockchain/blockchainContext";

export default function WalletButton() {
  const { walletAddress, connectWallet, disconnectWallet } = useBlockchain(); 

  return (
    <>
      {walletAddress ? (
        <button
          onClick={disconnectWallet}
          className="bg-[#fbc816] text-[#001740] px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 hover:shadow-[0_0_15px_#fbc816] transition"
        >
          Disconnect Wallet
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-[#fbc816] text-[#001740] px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 hover:shadow-[0_0_15px_#fbc816] transition"
        >
          Connect Wallet
        </button>
      )}
    </>
  );
}


