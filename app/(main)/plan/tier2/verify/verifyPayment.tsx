'use client'

import { useState } from 'react'
import { VerifyTier2Payment } from '@/api/api'

export default function VerifyPaymentPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleVerify = async () => {
    try {
      setLoading(true)

      const billingId =
        localStorage.getItem('tier2-billingId')

      const reference =
        localStorage.getItem('tier2-reference')

      if (!billingId || !reference) {
        return alert('Payment information not found')
      }

      const res = await VerifyTier2Payment({
        billingId,
        reference,
      })

      setMessage(res.data.message)

      localStorage.removeItem('tier2-reference')
      localStorage.removeItem('tier2-billingId')
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message ||
          'Verification failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#001740] flex items-center justify-center p-6">

      <div className="bg-[#002766] rounded-2xl p-8 max-w-lg w-full">

        <h1 className="text-3xl font-bold text-[#fbc816] mb-6">
          Verify Payment
        </h1>

        <p className="text-gray-300 mb-6">
          After completing your Paystack payment,
          click the button below to verify your
          subscription.
        </p>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-[#fbc816] text-[#001740] py-3 rounded-xl font-bold"
        >
          {loading
            ? 'Verifying...'
            : 'Verify Payment'}
        </button>

        {message && (
          <div className="mt-6 bg-[#001740] p-4 rounded-xl">
            <p className="text-white">
              {message}
            </p>
          </div>
        )}

      </div>

    </div>
  )
}