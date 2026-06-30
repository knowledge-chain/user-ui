'use client'

import { useEffect, useState } from 'react'
import { GetTier2Plans, SubscribeTier2Plan } from '@/api/api'

interface Plan {
  _id: string
  name: string
  monthlyPrice: number
  discription: string
}

export default function Tier2PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState<string>('')

  const fetchPlans = async () => {
    try {
      const res = await GetTier2Plans()
      setPlans(res.data.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const handleSubscribe = async (planId: string) => {
    try {
      setSubscribing(planId)

      const callbackUrl = `${window.location.origin}/plan/tier2/verify`

      const res = await SubscribeTier2Plan({
        planId,
        callbackUrl,
      })

      const paymentUrl = res.data.data.data.url
      const reference = res.data.data.data.reference
      const billingId = res.data.billing[0]._id

      localStorage.setItem('tier2-reference', reference)
      localStorage.setItem('tier2-billingId', billingId)

      window.location.href = paymentUrl
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Subscription failed')
    } finally {
      setSubscribing('')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001740] flex items-center justify-center">
        <p className="text-[#fbc816]">Loading Plans...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#001740] p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-[#fbc816] mb-8">
          Tier 2 Plans
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-[#002766] rounded-2xl p-6"
            >
              <h2 className="text-white text-2xl font-bold">
                {plan.name}
              </h2>

              <p className="text-gray-300 mt-3">
                {plan.discription}
              </p>

              <p className="text-[#fbc816] text-4xl font-bold mt-6">
                ₦{plan.monthlyPrice}
              </p>

              <p className="text-gray-400 mt-2">
                Monthly
              </p>

              <button
                onClick={() => handleSubscribe(plan._id)}
                disabled={subscribing === plan._id}
                className="mt-6 w-full bg-[#fbc816] text-[#001740] py-3 rounded-xl font-bold"
              >
                {subscribing === plan._id
                  ? 'Processing...'
                  : 'Subscribe'}
              </button>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}