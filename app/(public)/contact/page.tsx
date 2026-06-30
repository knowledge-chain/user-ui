'use client'

import Navbar from '@/components/publicNavbar'
import Contact from "./contact";
import Footer from "@/components/footer";


export default function ContactPage() {
  return (
    <>
        <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
          {/* Shared Navbar */}
          <Navbar />

          <Contact />

          <Footer />
        </main>
    </>
  )
}
