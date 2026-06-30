'use client'


import Navbar from '@/components/navbar'
import  Tier2Plans from "./plans";
import Footer from "@/components/footer";

export default function Tier2PlansPage() {
  return (<>
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
      <Navbar />

      < Tier2Plans />

      <Footer />
    </main>
  </>)
}