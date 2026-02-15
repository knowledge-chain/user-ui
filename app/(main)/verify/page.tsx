'use client'

import Navbar from '@/components/navbar'
import Verify from "./verify";
import { BlockchainProvider } from '../../../blockchain/blockchainContext';

export default function VerifyPage() {
  
  return (<>
  <BlockchainProvider>
      <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
        {/* Navbar */}
        <Navbar />

        <Verify />
      </main>
    </BlockchainProvider>
    </>
  )
}
