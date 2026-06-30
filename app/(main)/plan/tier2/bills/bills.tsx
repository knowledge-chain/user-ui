'use client'

import { useEffect, useState } from 'react'
import {
  GetOutstandingBills,
  PayOutstandingBill,
} from '@/api/api'

interface Bill {
  _id: string
  amount: number
  dueDate: string
  status: string
  reference?: string

  sub: {
    _id: string
    status: string
    duration: string
    nextBillingDate: string

    plan: {
      _id: string
      name: string
      monthlyPrice: number
      discription: string
    }
  }
}

export default function OutstandingBillPage() {
  const [bills, setBills] = useState<Bill[]>([])
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState('')

  const fetchBills = async () => {
    try {
      const res = await GetOutstandingBills()
      setBills(res.data.bills || [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBills()
  }, [])

  const handlePayBill = async (billId: string) => {
    try {
      setPaying(billId)

      const callbackUrl = `${window.location.origin}/plan/tier2/verify`

      const res = await PayOutstandingBill({
        billId,
        callbackUrl,
      })

      const paymentUrl = res.data.data.data.url

      const reference = res.data.data.data.reference

      const billingId = res.data.bill._id

      localStorage.setItem('tier2-reference', reference)

      localStorage.setItem('tier2-billingId', billingId)

      window.location.href = paymentUrl
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          'Failed to initialize payment'
      )
    } finally {
      setPaying('')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001740] flex items-center justify-center">
        <p className="text-[#fbc816] text-lg">
          Loading Outstanding Bills...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#001740] p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-[#fbc816] mb-8">
          Outstanding Bills
        </h1>

        {bills.length === 0 ? (
          <div className="bg-[#002766] rounded-2xl p-8 text-center">
            <h2 className="text-white text-xl">
              No Outstanding Bills Found
            </h2>

            <p className="text-gray-400 mt-3">
              Your account is up to date.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {bills.map((bill) => (
              <div
                key={bill._id}
                className="bg-[#002766] rounded-2xl p-6"
              >
                <h2 className="text-white text-2xl font-bold">
                  {bill.sub.plan.name}
                </h2>

                <p className="text-gray-300 mt-3">
                  {bill.sub.plan.discription}
                </p>

                <div className="mt-6 space-y-3">

                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      Amount
                    </span>

                    <span className="text-[#fbc816] font-bold">
                      ₦{bill.amount}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      Status
                    </span>

                    <span className="text-red-400 capitalize">
                      {bill.status}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      Due Date
                    </span>

                    <span className="text-white">
                      {new Date(
                        bill.dueDate
                      ).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      Subscription
                    </span>

                    <span className="text-white">
                      {bill.sub.status}
                    </span>
                  </div>

                </div>

                <button
                  onClick={() =>
                    handlePayBill(bill._id)
                  }
                  disabled={
                    paying === bill._id
                  }
                  className="w-full mt-8 bg-[#fbc816] text-[#001740] py-3 rounded-xl font-bold hover:scale-105 transition"
                >
                  {paying === bill._id
                    ? 'Initializing Payment...'
                    : 'Pay Bill'}
                </button>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}