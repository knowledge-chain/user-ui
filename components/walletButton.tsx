'use client'

import { useBlockchain } from "../blockchain/blockchainContext";

export default function WalletButton() {
  const { walletAddress, connectWallet, disconnectWallet } = useBlockchain(); 


  return (<>
      {
        walletAddress ?
        <button  className="bg-white text-indigo-700 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-100" onClick={disconnectWallet}> DisConnect Wallet </button> :

        <button  className="bg-white text-indigo-700 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-100" onClick={connectWallet}> Connect Wallet </button>
      }

    </>
  )
}


