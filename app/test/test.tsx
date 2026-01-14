'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useBlockchain } from "../../blockchain/blockchainContext";
import { checkEmail, checkTest, getYourTest, requestForTest } from '@/api/user';

export default function Test() {
  const [wallet, setWallet] = useState('')
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasTest, setHasTest] = useState(false)
  const [testLink, setTestLink] = useState('')

  const { walletAddress, } = useBlockchain();

  const handleRequestTest = async () => {
    try {
      if (walletAddress == null) {
        alert("Connect your wallet")
        return
      }

      requestForTest({walletAddress: walletAddress})
        .then(res => {
          setTestLink(res.data.data[0].url)
          setHasTest(true)
        }).catch(err => {
          console.error(err)
        })
    } catch (err) {
      console.error(err)
      alert('Failed to verify OTP')
      return
    }
  }
  

  useEffect(() => {
    // Replace with your logic to get connected wallet (wagmi or ethers)
    const storedWallet = walletAddress || ''
    setWallet(storedWallet)

    if (walletAddress == null) {
      alert("Connect your wallet")
      
      return
    }

  

    // if (walletAddress) {
    //   alert("ok me")
      checkEmail({walletAddress: walletAddress})
        .then(res => {
          if (res.data.status) {
            setVerified(res.data.status)
            setLoading(false)
            checkTest({walletAddress: walletAddress})
              .then(res => {
                if (res.data.status) {
                  getYourTest({walletAddress: walletAddress})
                    .then(res => {
                      setTestLink(res.data.url)
                    }).catch(err => {
                      console.error(err)
                      setVerified(false)
                      setLoading(false)
                    })
                    setHasTest(true)
                }else{
                  // requestForTest({walletAddress: walletAddress})
                  //   .then(res => {
                  //     setTestLink(res.data.data[0].url)
                  //     setHasTest(true)
                  //   }).catch(err => {
                  //     console.error(err)
                  //     setVerified(false)
                  //     setLoading(false)
                  //   })
                  setHasTest(false)
                }

              }).catch(err => {
                console.error(err)
                setVerified(false)
                setLoading(false)
              })
          }else{
            setVerified(false)
            setLoading(false)
          }
         
        })
        .catch(err => {
          console.error(err)
          setVerified(false)
          setLoading(false)
        })
    // } else {
    //   setVerified(false)
    //   setLoading(false)
    // }
  })

  if (loading) return <div>Loading...</div>

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">

      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl font-extrabold mb-8">Knowledge Test</h1>

        {!wallet && <p className="text-red-300 mb-6">Connect your wallet to access the test.</p>}
        {wallet && !verified && (
          <p className="text-red-300 mb-6">
            Your email is not verified. Please verify your email to access the test.
          </p>
        )}

        {wallet && verified && (
          hasTest ? (
          <a
            href="https://your-test-link.com" // Replace with actual test URL
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition"
          >
            Take the Test
          </a> ):

          (<button
             onClick={handleRequestTest}
            className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition"
          >
            Request Test link
          </button>
          )
          
        )}
      </section>
    </main>
  )
}
