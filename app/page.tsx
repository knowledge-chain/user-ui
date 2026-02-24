'use client'

import Navbar from '@/components/navbar'
import Link from 'next/link'
import { BlockchainProvider } from '../blockchain/blockchainContext'
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <BlockchainProvider>
        <main className="min-h-screen bg-[#001740] text-white">
          
          {/* Navbar */}
          <Navbar />

          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center text-center px-6 py-24">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Prove Knowledge <br /> On the Blockchain
            </h2>

            <p className="mt-6 max-w-2xl text-lg text-gray-300">
              Knowledge Chain allows you to mint an NFT, verify your identity,
              and access exclusive knowledge-based tests secured on Chain.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap justify-center">
              
              {/* Primary Button */}
              <Link
                href="/mint"
                className="bg-[#fbc816] text-[#001740] px-8 py-3 rounded-2xl font-bold shadow-xl hover:scale-105 hover:shadow-[0_0_20px_#fbc816] transition"
              >
                Get Started
              </Link>

              {/* Secondary Button */}
              <Link
                href="/about"
                className="border border-[#fbc816] text-[#fbc816] px-8 py-3 rounded-2xl font-semibold hover:bg-[#fbc816] hover:text-[#001740] transition"
              >
                Learn More
              </Link>

            </div>
          </section>

          {/* How It Works */}
          <section className="bg-[#001a4d] py-20 px-6">
            <h3 className="text-4xl font-bold text-center mb-16">
              How It Works
            </h3>

            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { title: 'Payment', desc: 'Pay a small amount fee securely on chain.' },
                { title: 'Mint NFT', desc: 'Receive your Knowledge Chain NFT.' },
                { title: 'Verify Email', desc: 'Confirm your identity with OTP verification.' },
                { title: 'Take Test', desc: 'Access and complete the knowledge test.' }
              ].map((step, i) => (
                <div
                  key={i}
                  className="bg-[#002766] p-8 rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  <div className="text-3xl font-extrabold text-[#fbc816]">
                    {i + 1}
                  </div>

                  <h4 className="mt-4 text-xl font-bold">
                    {step.title}
                  </h4>

                  <p className="mt-2 text-gray-300">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Call To Action */}
          <section className="py-24 text-center">
            <h3 className="text-4xl font-bold">
              Ready to Start?
            </h3>

            <p className="mt-4 text-gray-300">
              Mint your Knowledge NFT and prove what you know.
            </p>

            <Link
              href="/test"
              className="inline-block mt-8 bg-[#fbc816] text-[#001740] px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 hover:shadow-[0_0_20px_#fbc816] transition"
            >
              Take Test
            </Link>
          </section>

          <Footer />
        </main>
      </BlockchainProvider>
    </>
  )
}
