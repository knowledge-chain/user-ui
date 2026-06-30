'use client'
import { BlockchainProvider } from "@/blockchain/blockchainContext";
import Signup from "./signup";


export default function SignupPage() {
  return (
    <>
      <BlockchainProvider>
        <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">

          <Signup />
        </main>
      </BlockchainProvider>
    </>
  )
}