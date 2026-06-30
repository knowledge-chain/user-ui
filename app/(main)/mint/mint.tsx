'use client'

import { initNairaPayment, uploadImage } from "@/api/user";
import { useBlockchain } from "../../../blockchain/blockchainContext";
import { useEffect, useState } from 'react'
import { approveContract, mintNft } from "@/blockchain/mint";
import { nftContractAddress } from "../../../blockchain/constant";
import { ethers, formatEther, formatUnits } from "ethers";

let USDC_AMOUNT = 2
const NAIRA_AMOUNT = '15000'

const TIER = {
  TIER1: "https://ipfs.io/ipfs/bafybeihodi2i7cg5fkgzx56m3arwibpleki56wxxxgxotrjyausgnrwprm",
  TIER2: "https://ipfs.io/ipfs/QmP7FzwC3foHPVSDt47ufT1D2vEcqgHj9FhMzmzCcVcDex",
  TIER3: 3,
  TIER4: 4,
};

export default function MintPage() {

  const [baseUrl, setBaseUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  // ✅ Added tier state
  const [selectedTier, setSelectedTier] = useState('')

  const { signer, nftTokenContractFunction } = useBlockchain();

  const walletAddress = localStorage.getItem('walletAddress')
  const userType = localStorage.getItem('userType')


  const handlePayUSDC = async () => {
    try {
      if (userType == 'web2') {
        alert("Please use other option to mint NFT")
        return
      }
      
      const checkTokenAccess =  await nftTokenContractFunction(
        nftContractAddress,
        "hasAccess",
        [walletAddress, parseInt(selectedTier)]
      )

      // if (checkTokenAccess) {
      //    alert("You already mint this NFT")
      //    return
      // }

      const mintPrice = await nftTokenContractFunction(
        nftContractAddress,
        "tierPrices",
        [parseInt(selectedTier)]
      )

      const formattedMintPrice = parseFloat(formatEther(mintPrice.toString()))

      console.log("Mint price (USDC):", formattedMintPrice);

      if (mintPrice.toString() === "0") {
        alert("Mint price has not been set");
        return;
      }

      const approve = await approveContract(mintPrice, signer)

      if (!approve.status) {
        alert(approve.result)
        return
      }

      let tierImg = TIER.TIER1
      if (parseInt(selectedTier) == 2) {
        tierImg = TIER.TIER2
      }

      const mint = await mintNft(signer, parseInt(selectedTier), tierImg)

      if (!mint.status) {
        alert(mint.result)
        return
      }

      alert("Transaction in progress")

    } catch (e) {
      console.log("error", e)
    }
  }

  const handlePayNaira = async () => {
    try {
      const wallet = localStorage.getItem('walletAddress')
      if (!wallet) {
        alert("Connect your wallet or login")
        return
      }

      let callback = `${baseUrl}/verifynaira?wallet=${walletAddress}&img=${TIER.TIER1}`
      if (parseInt(selectedTier) == 2) {
        callback = `${baseUrl}/verifynaira?wallet=${walletAddress}&img=${TIER.TIER2}`
      }

      initNairaPayment({
        walletAddress: wallet,
        callback: callback,
        tier: parseInt(selectedTier)
      }).then((res) => {

        const paystackUrl = res.data.data.data.url
        localStorage.setItem('paymentRef', res.data.data.data.reference)

        if (!paystackUrl) {
          alert('Paystack URL not found')
          return
        }

        window.location.href = paystackUrl

      }).catch((err) => {
        console.log(err)

        const message =
          err?.response?.data?.message ||
          err?.response?.data ||
          'Unable to Initial Payment ❌'

        alert(message)
        return
      })

    } catch (err) {
      alert('Unable to Initial Payment')
    }
  }

  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  return (
    <main className="min-h-screen bg-[#001740] text-white">
      <section className="max-w-xl mx-auto px-6 py-24 text-center">

        <h1 className="text-4xl font-extrabold mb-6 text-[#fbc816]">
          Mint Knowledge NFT
        </h1>

        <p className="text-gray-300 mb-10">
          Choose a payment method to mint your NFT and unlock access to
          the verification test.
        </p>

        {/* File Input */}
        {/* <div className="mb-6">
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full bg-gray-100 text-gray-800 p-3 rounded-xl"
          />
        </div> */}

        {/* Tier Dropdown */}
        <div className="mb-6">
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="w-full bg-gray-100 text-gray-800 p-3 rounded-xl  outline-none"
          >
            <option value="" className="bg-[#001740] text-white">
              Select NFT Tier
            </option>
            <option value="1" className="bg-[#001740] text-white">
              Tier 1
            </option>
            <option value="2" className="bg-[#001740] text-white">
              Tier 2
            </option>
            {/* <option value="tier3" className="bg-[#001740] text-white">
              Tier 3
            </option>
            <option value="tier4" className="bg-[#001740] text-white">
              Tier 4
            </option> */}
          </select>
        </div>

        <div className="space-y-4">

          <button
            onClick={handlePayUSDC}
            // disabled={!selectedFile || !selectedTier || isUploading}
            disabled={ !selectedTier || isUploading}
            className="w-full bg-[#fbc816] text-[#001740] py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : `Pay with wallet & Mint NFT`}
          </button>

          <button
            onClick={handlePayNaira}
            // disabled={!selectedFile || !selectedTier || isUploading}
            
            disabled={!selectedTier || isUploading}
            className="w-full bg-[#2417d3] text-[#fbc816] py-4 rounded-2xl font-bold shadow-xl hover:bg-[#1f14b0] hover:scale-105 transition disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : `Pay with card & Mint NFT`}
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          USDC payments require a connected wallet.  
          Naira payments support local bank & card transfers.
        </p>

      </section>
    </main>
  )
}

