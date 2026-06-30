'use client'
import { BlockchainProvider } from '@/blockchain/blockchainContext'
import { useUserAuth } from '@/hook/useUserAuth'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const { loading } = useUserAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking user access...
      </div>
    )
  }

  return (
    <>
      <BlockchainProvider>
        {children}
        </BlockchainProvider>
    </>
  );
}
