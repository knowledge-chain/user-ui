'use client'
import { BlockchainProvider } from "@/blockchain/blockchainContext";
import Login from "./login";

export default function LoginPage() {
  return (
    <>
     <BlockchainProvider>
        <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
          <Login />
        </main>
      </BlockchainProvider>
    </>
  )
}