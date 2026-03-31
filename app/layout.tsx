// 'use client'

import './globals.css'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/lib/wagmi'

import ToastProvider from '@/components/toastProvider';

// ✅ ADD METADATA HERE (outside the component)
export const metadata = {
  title: "The knwoledge Chain in Nigeria",
  description: "Knowledge on Web3, crypto and blockchain using Knowledge chain.",
  keywords: ["crypto", "web3", "blockchain", "Nigeria", "Knowlege", "education"],
};

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



