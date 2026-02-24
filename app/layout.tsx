// 'use client'

import './globals.css'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/lib/wagmi'

import ToastProvider from '@/components/toastProvider';
import { BlockchainProvider } from '@/blockchain/blockchainContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <body className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white"> */}
      <body className="min-h-screen bg-[#001740] text-white">
        {/* <WagmiProvider config={wagmiConfig}> */}

          {children}
        {/* </WagmiProvider> */}
      </body>
    </html>
  )
}



