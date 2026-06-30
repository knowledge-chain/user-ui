'use client'


import Navbar from '@/components/navbar'
import  VerifyPayment from "./verifyPayment";
import Footer from "@/components/footer";

export default function VerifyPaymentPage() {
  return (<>
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
      <Navbar />

      < VerifyPayment />

      <Footer />
    </main>
  </>)
}