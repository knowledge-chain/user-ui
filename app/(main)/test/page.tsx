'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '@/components/navbar'
import Test from "./test";
import Footer from "@/components/footer";
import { BlockchainProvider } from '../../../blockchain/blockchainContext';

export default function TestPage() {
  return (<>
    <BlockchainProvider>
      <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
        <Navbar />

        <Test />

        <Footer />
      </main>
    </BlockchainProvider>
    </>
  )
}
