'use client'

import { useState } from 'react'
import { Login } from '@/api/api'
import Link from 'next/link'
import PublicNavbar from '@/components/publicNavbar'
import Footer from '@/components/footer'
import { useBlockchain } from '@/blockchain/blockchainContext'

export default function LoginPage() {
  const { connectWallet } = useBlockchain(); 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimEmail = email.trim().toLowerCase()
    const trimPassword = password.trim()

    if (!trimEmail || !trimPassword) {
      alert('All fields are required ❌')
      return
    }

    setLoading(true)

    try {
      const res = await Login({
        email: trimEmail,
        password: trimPassword,
      })

      const { token, name, email: userEmail, walletAddress, userType } = res.data.data

      // ✅ store token
      localStorage.setItem('knowledge-token', token)
      localStorage.setItem('walletAddress', walletAddress)
      localStorage.setItem('userType', userType);

      window.location.href = '/courses/tier-two/courses'
    } catch (err: any) {
      console.log(err)

      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        'Login failed ❌'

      alert(message)
    } finally {
      setLoading(false)
    }
  }

  // ✅ WALLET LOGIN (ADDED ONLY)
  const handleWalletLogin = async () => {
    try {
      setLoading(true)

      await connectWallet()

      await new Promise((resolve) => setTimeout(resolve, 5000));

      window.location.href = '/courses/tier-two/courses'
    } catch (err: any) {
      console.log(err)

      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        'Wallet login failed ❌'

      alert(message)
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
            Welcome Back
          </h1>

          <p className="text-gray-300 text-center mt-3">
            Login to continue learning on the blockchain
          </p>

          <form onSubmit={handleLogin} className="mt-10 space-y-6">

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
                border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fbc816]"
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
                border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fbc816]"
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-[#fbc816] text-[#001740]
              py-3 rounded-2xl font-bold text-lg
              hover:scale-[1.02] transition
              disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* WALLET LOGIN BUTTON (ADDED) */}
            <button
              type="button"
              onClick={handleWalletLogin}
              disabled={loading}
              className="w-full mt-4 bg-black text-white
              py-3 rounded-2xl font-bold text-lg
              hover:scale-[1.02] transition
              border border-gray-600
              disabled:opacity-50"
            >
              {loading ? 'Connecting Wallet...' : 'Login with Wallet'}
            </button>

          </form>

          {/* LINKS */}
          <div className="mt-8 flex flex-col gap-4">

            <Link
              href="/auth/signup"
              className="border border-[#fbc816]
              text-[#fbc816]
              text-center py-3 rounded-2xl
              font-semibold hover:bg-[#fbc816]
              hover:text-[#001740] transition"
            >
              Create Account
            </Link>

            <Link
              href="/auth/forgot-password"
              className="text-center text-gray-300 hover:text-[#fbc816] transition"
            >
              Forgot password
            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  )
}

