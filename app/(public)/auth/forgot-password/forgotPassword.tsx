'use client'

import { useState } from 'react'
import { ForgotPassword } from '@/api/api'
import Link from 'next/link'
import PublicNavbar from '@/components/publicNavbar'
import Footer from '@/components/footer'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimEmail = email.trim().toLowerCase()

    if (!trimEmail) {
      alert('Email is required ❌')
      return
    }

    setLoading(true)

    try {
      const res = await ForgotPassword({
        email: trimEmail,
      })

      // ✅ save email for reset page
      localStorage.setItem('resetPasswordEmail', trimEmail)

      alert(res.data.message || 'OTP sent successfully ✅')

      // redirect to reset password page
      window.location.href = '/auth/reset-password'

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

  return (
    <main className="min-h-screen bg-[#001740] text-white">

      <PublicNavbar />

      <section className="flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-md bg-[#001a4d] rounded-3xl p-8 shadow-2xl border border-[#002766]">

          <h1 className="text-4xl font-extrabold text-center">
            Forgot Password
          </h1>

          <p className="text-gray-300 text-center mt-3">
            Enter your email and we will send you a reset OTP
          </p>

          <form onSubmit={handleForgotPassword} className="mt-10 space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-semibold">
                Email Address
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

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-[#fbc816] text-[#001740]
              py-3 rounded-2xl font-bold text-lg
              hover:scale-[1.02] transition
              disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Send Reset OTP'}
            </button>

          </form>

          {/* LINKS */}
          <div className="mt-8 flex flex-col gap-4">

            <Link
              href="/auth/login"
              className="border border-[#fbc816]
              text-[#fbc816]
              text-center py-3 rounded-2xl
              font-semibold hover:bg-[#fbc816]
              hover:text-[#001740] transition"
            >
              Back to Login
            </Link>

            <Link
              href="/auth/reset-password"
              className="text-center text-gray-300 hover:text-[#fbc816] transition"
            >
              Already have OTP? Verify Reset
            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  )
}