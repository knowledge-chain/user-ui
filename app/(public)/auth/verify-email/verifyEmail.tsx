'use client'

import { VerifyEmail } from '@/api/api'
import Footer from '@/components/footer'
import PublicNavbar from '@/components/publicNavbar'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedEmail = localStorage.getItem('verificationEmail')

    if (!savedEmail) {
      alert('Signup email not found ❌')
      window.location.href = '/sign-up'
      return
    }

    setEmail(savedEmail)
  }, [])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimOtp = otp.trim()

    if (!trimOtp) {
      alert('Provide OTP ❌')
      return
    }

    setLoading(true)

    try {
      const res = await VerifyEmail({
        email,
        otp: trimOtp,
      })

      alert(res.data.message || 'Email verified successfully ✅')

      // optional remove saved email
      localStorage.removeItem('verificationEmail')

      window.location.href = '/auth/login'

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

        <div
          className="w-full max-w-md bg-[#001a4d]
          rounded-3xl p-8 shadow-2xl
          border border-[#002766]"
        >

          <h1 className="text-4xl font-extrabold text-center">
            Verify Email
          </h1>

          <p className="text-gray-300 text-center mt-4">
            Enter the OTP sent to your email
          </p>

          {/* EMAIL DISPLAY */}
          <div
            className="mt-6 bg-[#002766]
            rounded-2xl px-4 py-3 text-center"
          >
            <p className="text-sm text-gray-300">
              Verification Email
            </p>

            <p className="font-semibold text-[#fbc816] break-all">
              {email}
            </p>
          </div>

          <form
            onSubmit={handleVerify}
            className="mt-8 space-y-6"
          >

            {/* OTP */}
            <div>
              <label className="block mb-2 font-semibold">
                OTP Code
              </label>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 4 digit OTP"
                className="w-full px-4 py-3 rounded-2xl
                bg-white text-[#001740]
                border border-gray-300
                focus:outline-none
                focus:ring-2 focus:ring-[#fbc816]"
              />
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-[#fbc816]
              text-[#001740]
              py-3 rounded-2xl
              font-bold text-lg
              hover:scale-[1.02]
              transition
              disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>

          </form>

          {/* LOGIN */}
          <div className="mt-8">

            <Link
              href="/auth/login"
              className="block text-center
              border border-[#fbc816]
              text-[#fbc816]
              py-3 rounded-2xl
              font-semibold
              hover:bg-[#fbc816]
              hover:text-[#001740]
              transition"
            >
              Back To Login
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