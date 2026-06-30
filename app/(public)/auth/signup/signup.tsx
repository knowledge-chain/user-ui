'use client'

import { Signup } from '@/api/api'
import Link from 'next/link'
import { useState } from 'react'
import PublicNavbar from '@/components/publicNavbar'
import Footer from '@/components/footer'
import { useBlockchain } from '@/blockchain/blockchainContext'

// ✅ ADD THIS
import { ethers } from 'ethers'

export default function SignupPage() {
  const { connectWallet } = useBlockchain(); 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimEmail = email.trim().toLowerCase()
    const trimPassword = password.trim()

    if (!trimEmail || !trimPassword) {
      alert('All fields are required ❌')
      return
    }

    if (trimPassword.length < 6) {
      alert('Password must be at least 6 characters ❌')
      return
    }

    setLoading(true)

    try {
      const res = await Signup({
        email: trimEmail,
        password: trimPassword,
      })

      localStorage.setItem('verificationEmail', trimEmail)

      alert(res.data.message || 'Signup successful ✅')

      window.location.href = '/auth/verify-email'

    } catch (err: any) {
      console.log(err)

      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        'Something went wrong ❌'

      alert(message)
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // ✅ ADD WALLET SIGNUP HANDLER
  // ================================
  const handleWalletSignup = async () => {
    try {
      
      await connectWallet()

      window.location.href = '/courses/tier-two/courses'
    } catch (err: any) {
      console.log(err)
      alert(err.message || 'Wallet signup failed ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#001740] text-white">
      <PublicNavbar />

      <section className="flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-md bg-[#001a4d] rounded-3xl p-8 shadow-2xl border border-[#002766]">

          <h1 className="text-4xl font-extrabold text-center">
            Create Account
          </h1>

          <p className="text-gray-300 text-center mt-3">
            Sign up to access blockchain powered courses
          </p>

          <form
            onSubmit={handleSignup}
            className="mt-10 space-y-6"
          >

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-semibold">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-2xl bg-white text-[#001740]
                border border-gray-300 focus:outline-none focus:ring-2
                focus:ring-[#fbc816]"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 font-semibold">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-2xl bg-white text-[#001740]
                border border-gray-300 focus:outline-none focus:ring-2
                focus:ring-[#fbc816]"
              />
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-[#fbc816] text-[#001740]
              py-3 rounded-2xl font-bold text-lg
              hover:scale-[1.02] transition
              disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* ✅ NEW WALLET BUTTON (ADDED ONLY) */}
            <button
              type="button"
              onClick={handleWalletSignup}
              disabled={loading}
              className="w-full mt-4 bg-transparent border border-[#fbc816]
              text-[#fbc816] py-3 rounded-2xl font-bold text-lg
              hover:bg-[#fbc816] hover:text-[#001740] transition"
            >
              {loading ? 'Connecting Wallet...' : 'Sign Up with Wallet'}
            </button>

          </form>

          {/* LOGIN + RESEND */}
          <div className="mt-8 flex flex-col gap-4">

            <Link
              href="/auth/login"
              className="border border-[#fbc816]
              text-[#fbc816] text-center py-3 rounded-2xl
              font-semibold hover:bg-[#fbc816]
              hover:text-[#001740] transition"
            >
              Login
            </Link>

            <Link
              href="/auth/resend-email"
              className="text-center text-gray-300 hover:text-[#fbc816] transition"
            >
              Resend Verification Email
            </Link>

          </div>

        </div>

      </section>

      <Footer />
    </main>
  )
}
