'use client'

import Navbar from '@/components/publicNavbar'
import About from "./about";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <>
        <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
          {/* Shared Navbar */}
          <Navbar />
          <About />
          {/* Footer */}
          <Footer />
        </main>
    </>
  )
}
