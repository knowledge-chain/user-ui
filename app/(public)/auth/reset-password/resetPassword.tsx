'use client'

import { useEffect, useState } from 'react'
import { ResetPassword } from '@/api/api'
import Link from 'next/link'
import PublicNavbar from '@/components/publicNavbar'
import Footer from '@/components/footer'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedEmail = localStorage.getItem('resetPasswordEmail')

    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimEmail = email.trim().toLowerCase()
    const trimOtp = otp.trim()
    const trimPassword = password.trim()

    if (!trimEmail || !trimOtp || !trimPassword) {
      alert('All fields are required ❌')
      return
    }

    setLoading(true)

    try {
      const res = await ResetPassword({
        email: trimEmail,
        otp: trimOtp,
        password: trimPassword,
      })

      alert(res.data.message || 'Password changed successfully ✅')

      // ❌ remove email from storage after success
      localStorage.removeItem('resetPasswordEmail')

      // redirect to login
      window.location.href = '/auth/login'

    } catch (err: any) {
      console.log(err)

      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        'Reset password failed ❌'

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
            Reset Password
          </h1>

          <p className="text-gray-300 text-center mt-3">
            Enter OTP and set a new password
          </p>

          <form onSubmit={handleResetPassword} className="mt-10 space-y-6">

            {/* EMAIL (readonly) */}
            <div>
              <label className="block mb-2 font-semibold">
                Email
              </label>

              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-4 py-3 rounded-2xl bg-gray-200 text-[#001740]
                border border-gray-300"
              />
            </div>

            {/* OTP */}
            <div>
              <label className="block mb-2 font-semibold">
                OTP Code
              </label>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 4-digit OTP"
                className="w-full px-4 py-3 rounded-2xl bg-white text-[#001740]
                border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fbc816]"
              />
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label className="block mb-2 font-semibold">
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
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
              {loading ? 'Updating Password...' : 'Reset Password'}
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
              href="/auth/forgot-password"
              className="text-center text-gray-300 hover:text-[#fbc816] transition"
            >
              Resend OTP
            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  )
}