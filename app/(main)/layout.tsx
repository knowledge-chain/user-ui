'use client'
import { BlockchainProvider } from '@/blockchain/blockchainContext'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
    <>
        <BlockchainProvider>{children}</BlockchainProvider>
    </>
  );
}
