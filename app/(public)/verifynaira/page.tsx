'use client'

import { Suspense } from "react"
import VerifyPayment from "./verify";
import Footer from "@/components/footer";

export default function VerifyPaymentPage() {
  return (<>
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <VerifyPayment />
      </Suspense>
      <Footer />
    </main>
  </>)
}
