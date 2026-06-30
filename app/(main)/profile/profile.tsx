// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import {
//   GetProfile,
//   EditProfile
// } from '@/api/api'

// export default function EditProfilePage() {
//   const router = useRouter()

//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)

//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [walletAddress, setWalletAddress] = useState('')

//   const [paid, setPaid] = useState(false)
//   const [verified, setVerified] = useState(false)
//   const [hasTier2NFT, setHasTier2NFT] = useState(false)
//   const [subscribeTier2, setSubscribeTier2] = useState(false)

//   // =============================
//   // LOAD PROFILE
//   // =============================

//   const fetchProfile = async () => {
//     try {
//       setLoading(true)

//       const res = await GetProfile()

//       const user = res.data.user

//       setName(user.name || '')
//       setEmail(user.userEmail || '')
//       setWalletAddress(user.walletAddress || '')

//       setPaid(user.paid)
//       setVerified(user.isEmailVerified)
//       setHasTier2NFT(user.hasTier2NFT)
//       setSubscribeTier2(user.subscribeToTier2)

//     } catch (err) {
//       console.log(err)
//       alert('Unable to load profile')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchProfile()
//   }, [])

//   // =============================
//   // UPDATE PROFILE
//   // =============================

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault()

//     if (!name.trim()) {
//       return alert('Name is required')
//     }

//     try {
//       setSaving(true)

//       const formData = new FormData()

//       formData.append('name', name)

//       await EditProfile(formData)

//       alert('Profile updated successfully')

//     } catch (err: any) {
//       console.log(err)

//       alert(
//         err?.response?.data?.message ||
//         'Update failed'
//       )
//     } finally {
//       setSaving(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#001740] flex items-center justify-center">
//         <p className="text-[#ffdb60]">
//           Loading profile...
//         </p>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-[#001740] p-6">

//       <div className="max-w-4xl mx-auto">

//         <h1 className="text-3xl font-bold text-[#ffdb60] mb-6">
//           My Profile
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-2xl p-8 space-y-6"
//         >

//           {/* NAME */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Full Name
//             </label>

//             <input
//               value={name}
//               onChange={(e) =>
//                 setName(e.target.value)
//               }
//               className="w-full border rounded-xl px-4 py-3"
//               placeholder="Enter your name"
//             />
//           </div>

//           {/* EMAIL */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Email
//             </label>

//             <input
//               value={email}
//               disabled
//               className="w-full border rounded-xl px-4 py-3 bg-gray-100"
//             />
//           </div>

//           {/* WALLET */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Wallet Address
//             </label>

//             <input
//               value={walletAddress}
//               disabled
//               className="w-full border rounded-xl px-4 py-3 bg-gray-100"
//             />
//           </div>

//           {/* STATUS GRID */}

//           <div className="grid md:grid-cols-2 gap-4">

//             <div className="border rounded-xl p-4">
//               <p className="text-gray-500">
//                 Email Verified
//               </p>

//               <p
//                 className={`font-bold ${
//                   verified
//                     ? 'text-green-600'
//                     : 'text-red-600'
//                 }`}
//               >
//                 {verified ? 'Yes' : 'No'}
//               </p>
//             </div>

//             <div className="border rounded-xl p-4">
//               <p className="text-gray-500">
//                 Payment Status
//               </p>

//               <p
//                 className={`font-bold ${
//                   paid
//                     ? 'text-green-600'
//                     : 'text-red-600'
//                 }`}
//               >
//                 {paid ? 'Paid' : 'Not Paid'}
//               </p>
//             </div>

//             <div className="border rounded-xl p-4">
//               <p className="text-gray-500">
//                 Tier 2 NFT
//               </p>

//               <p
//                 className={`font-bold ${
//                   hasTier2NFT
//                     ? 'text-green-600'
//                     : 'text-red-600'
//                 }`}
//               >
//                 {hasTier2NFT ? 'Owned' : 'Not Owned'}
//               </p>
//             </div>

//             <div className="border rounded-xl p-4">
//               <p className="text-gray-500">
//                 Tier 2 Subscription
//               </p>

//               <p
//                 className={`font-bold ${
//                   subscribeTier2
//                     ? 'text-green-600'
//                     : 'text-red-600'
//                 }`}
//               >
//                 {subscribeTier2
//                   ? 'Active'
//                   : 'Inactive'}
//               </p>
//             </div>

//           </div>

//           {/* BUTTONS */}

//           <div className="flex gap-4">

//             <button
//               disabled={saving}
//               className="bg-[#2417d3] text-white px-8 py-3 rounded-xl"
//             >
//               {saving
//                 ? 'Saving...'
//                 : 'Update Profile'}
//             </button>

//             <button
//               type="button"
//               onClick={() => router.back()}
//               className="bg-gray-200 px-8 py-3 rounded-xl"
//             >
//               Cancel
//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  GetProfile,
  EditProfile
} from '@/api/api'

export default function EditProfilePage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [walletAddress, setWalletAddress] = useState('')

  const [paid, setPaid] = useState(false)
  const [verified, setVerified] = useState(false)
  const [hasTier2NFT, setHasTier2NFT] = useState(false)
  const [subscribeTier2, setSubscribeTier2] = useState(false)

  // =============================
  // LOAD PROFILE
  // =============================

  const fetchProfile = async () => {
    try {
      setLoading(true)

      const res = await GetProfile()

      const user = res.data.user

      setName(user.name || '')
      setEmail(user.userEmail || '')
      setWalletAddress(user.walletAddress || '')

      setPaid(user.paid)
      setVerified(user.isEmailVerified)
      setHasTier2NFT(user.hasTier2NFT)
      setSubscribeTier2(user.subscribeToTier2)

    } catch (err) {
      console.log(err)
      alert('Unable to load profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  // =============================
  // UPDATE PROFILE
  // =============================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!name.trim()) {
      return alert('Name is required')
    }

    try {
      setSaving(true)

      await EditProfile({name})

      alert('Profile updated successfully')

    } catch (err: any) {
      console.log(err)

      alert(
        err?.response?.data?.message ||
        'Update failed'
      )
      
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001740] flex items-center justify-center">
        <p className="text-[#ffdb60] text-lg">
          Loading profile...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#001740] p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-[#ffdb60] mb-6">
          My Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 space-y-6 shadow-xl"
        >

          {/* NAME */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2417d3]"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Email Address
            </label>

            <input
              value={email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-black disabled:text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* WALLET */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Wallet Address
            </label>

            <textarea
              value={walletAddress}
              disabled
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-black disabled:text-gray-700 resize-none cursor-not-allowed"
            />
          </div>

          {/* STATUS */}

          <div className="grid md:grid-cols-2 gap-4">

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-gray-500 text-sm">
                Email Verified
              </p>

              <p
                className={`mt-2 text-lg font-bold ${
                  verified
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {verified ? 'Yes' : 'No'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-gray-500 text-sm">
                Payment Status
              </p>

              <p
                className={`mt-2 text-lg font-bold ${
                  paid
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {paid ? 'Paid' : 'Not Paid'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-gray-500 text-sm">
                Tier 2 NFT
              </p>

              <p
                className={`mt-2 text-lg font-bold ${
                  hasTier2NFT
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {hasTier2NFT ? 'Owned' : 'Not Owned'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-gray-500 text-sm">
                Tier 2 Subscription
              </p>

              <p
                className={`mt-2 text-lg font-bold ${
                  subscribeTier2
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {subscribeTier2 ? 'Active' : 'Inactive'}
              </p>
            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex gap-4 pt-2">

            <button
              type="submit"
              disabled={saving}
              className="bg-[#2417d3] hover:bg-[#1d13b0] text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {saving ? 'Updating...' : 'Update Profile'}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-200 hover:bg-gray-300 text-black px-8 py-3 rounded-xl font-semibold transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}