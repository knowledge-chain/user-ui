'use client'

import Navbar from '@/components/navbar'
import  OutstandingBill from "./bills";
import Footer from "@/components/footer";

export default function OutstandingBillPage() {
  return (<>
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
      <Navbar />

      < OutstandingBill />

      <Footer />
    </main>
  </>)
}