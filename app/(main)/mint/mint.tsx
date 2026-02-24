// 'use client'

// import { initNairaPayment, uploadImage } from "@/api/user";
// import { useBlockchain } from "../../../blockchain/blockchainContext";
// import { useEffect, useState } from 'react'
// import { approveContract, mintNft } from "@/blockchain/mint";
// import { nftContractAddress, } from "../../../blockchain/constant";
// import { formatEther} from "ethers";

// let USDC_AMOUNT = 2 // 10 USDC example
// const NAIRA_AMOUNT = '15000' // example ₦ price

// export default function MintPage() {

//   const [baseUrl, setBaseUrl] = useState('')

//   // ==============================
//   // ✅ ADDED STATES (NEW)
//   // ==============================
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
//   const [isUploading, setIsUploading] = useState(false)

//   const { walletAddress, signer, nftTokenContractFunction} = useBlockchain(); 

//   // ==============================
//   // ✅ ADDED UPLOAD FUNCTION (NEW)
//   // ==============================
//   const uploadFileToServer = async (): Promise<string | null> => {
//     try {

//       if (!selectedFile) {
//         alert("Please select a file first")
//         return null
//       }

//       setIsUploading(true)

//       const formData = new FormData()
//       formData.append("media", selectedFile)

//       const res = await uploadImage(formData)

//       console.log("ress", res)
//        console.log("data", res.data)

//       setUploadedUrl(res.data.url)
//       return res.data.url

//     } catch (error) {
//       console.log("Upload error:", error)
//       alert("Upload failed")
//       return null
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handlePayUSDC = async () => {
//     try {

//       // ==============================
//       // ✅ ADDED: Upload before payment
//       // ==============================
//       const fileUrl = await uploadFileToServer()
//       if (!fileUrl) {
//         alert("Unable to upload file")
//         return
//       }
//       console.log("Uploaded file URL:", fileUrl)
//       // ==============================

//       const nftTokenBalance = await nftTokenContractFunction(nftContractAddress, "balanceOf", [walletAddress])
//       // if (parseFloat(nftTokenBalance.toString()) >= 1) {
//       //   alert("You already made payment")
//       //   return
//       // }

//       const mintPrice = await nftTokenContractFunction(nftContractAddress, "mintPrice", [])
//       const formattedMintPrice = parseFloat(formatEther(mintPrice.toString()))
//       console.log("formattedMintPrice", formattedMintPrice)

//       if (formattedMintPrice < 1) {
//         alert("Mint price have not be set")
//         return
//       }

//       const approve= await approveContract( formattedMintPrice, signer )
//       console.log("approve", approve)

//       if (!approve.status) {
//         alert(approve.result)
//         return
//       }

//       const mint= await mintNft(signer, fileUrl)
//       console.log("mint", mint)

//       if (!mint.status) {
//         alert(mint.result)
//         return
//       }

//       alert("Transaction in progress")
  
      
//     } catch (e) {
//       console.log("error", e)
//     }
//   }

//   const handlePayNaira = async () => {
//     try {

//       // ==============================
//       // ✅ ADDED: Upload before payment
//       // ==============================
//       const fileUrl = await uploadFileToServer()
//       if (!fileUrl) return
//       console.log("Uploaded file URL:", fileUrl)
//       // ==============================

//       if (walletAddress == null) {
//         alert("Connect your wallet")
//         return
//       }

//       console.log("walletAddress", walletAddress)

//       const nftTokenBalance = await nftTokenContractFunction(nftContractAddress, "balanceOf", [walletAddress])
//       // if (parseFloat(nftTokenBalance.toString()) >= 1) {
//       //   alert("You already made payment")
//       //   return
//       // }

//       console.log(1)

//       const callback = `${baseUrl}/verifynaira?wallet=${walletAddress}&img=${uploadedUrl}`

//       console.log(2)

//       initNairaPayment({
//         walletAddress: walletAddress,
//         callback: callback,
//         // fileUrl: fileUrl // ✅ ADDED: send uploaded file URL to backend
//       }).then((res) => {

//         console.log(3)

//         const paystackUrl = res.data.data.data.url
//         localStorage.setItem('paymentRef', res.data.data.data.reference)

//         console.log(4)
        
//         if (!paystackUrl) {
//           alert('Paystack URL not found')
//           return
//         }

//         console.log(5)

//         window.open(paystackUrl, '_blank')
        
//       }).catch((e) => {
//         alert("Unable to Initial Payment")
//         console.log("error", e)
//         return
//       })

//     } catch (err) {
//       console.error(err)
//       alert('Unable to Initial Payment')
//     }
//   }

//   useEffect(() => {
//     setBaseUrl(window.location.origin)
//   }, [])

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
//       <section className="max-w-xl mx-auto px-6 py-24 text-center">

//         <h1 className="text-4xl font-extrabold mb-6">
//           Mint Knowledge NFT
//         </h1>

//         <p className="text-gray-200 mb-10">
//           Choose a payment method to mint your NFT and unlock access to
//           the verification test.
//         </p>

//         {/* ============================== */}
//         {/* ✅ ADDED FILE INPUT */}
//         {/* ============================== */}
//         <div className="mb-6">
//           <input
//             type="file"
//             onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//             className="w-full bg-white text-black p-3 rounded-xl"
//           />
//         </div>

//         {/* PAYMENT BUTTONS */}
//         <div className="space-y-4">

//           {/* USDC BUTTON */}
//           <button
//             onClick={handlePayUSDC}
//             disabled={!selectedFile || isUploading} // ✅ ADDED disable logic
//             className="w-full bg-white text-indigo-700 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition disabled:opacity-50"
//           >
//             {isUploading ? "Uploading..." : `Pay ${USDC_AMOUNT} USDC & Mint NFT`}
//           </button>

//           {/* NAIRA BUTTON */}
//           <button
//             onClick={handlePayNaira}
//             disabled={!selectedFile || isUploading} // ✅ ADDED disable logic
//             className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-green-700 hover:scale-105 transition disabled:opacity-50"
//           >
//             {isUploading ? "Uploading..." : `Pay ₦${NAIRA_AMOUNT} & Mint NFT`}
//           </button>
//         </div>

//         <p className="text-sm text-gray-300 mt-8">
//           USDC payments require a connected wallet.  
//           Naira payments support local bank & card transfers.
//         </p>

//       </section>
//     </main>
//   )
// }


// 'use client'

// import { initNairaPayment, uploadImage } from "@/api/user";
// import { useBlockchain } from "../../../blockchain/blockchainContext";
// import { useEffect, useState } from 'react'
// import { approveContract, mintNft } from "@/blockchain/mint";
// import { nftContractAddress, } from "../../../blockchain/constant";
// import { formatEther} from "ethers";

// let USDC_AMOUNT = 2
// const NAIRA_AMOUNT = '15000'

// export default function MintPage() {

//   const [baseUrl, setBaseUrl] = useState('')
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
//   const [isUploading, setIsUploading] = useState(false)

//   const { walletAddress, signer, nftTokenContractFunction} = useBlockchain(); 

//   const uploadFileToServer = async (): Promise<string | null> => {
//     try {
//       if (!selectedFile) {
//         alert("Please select a file first")
//         return null
//       }

//       setIsUploading(true)

//       const formData = new FormData()
//       formData.append("media", selectedFile)

//       const res = await uploadImage(formData)

//       setUploadedUrl(res.data.url)
//       return res.data.url

//     } catch (error) {
//       alert("Upload failed")
//       return null
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handlePayUSDC = async () => {
//     try {

//       const fileUrl = await uploadFileToServer()
//       if (!fileUrl) {
//         alert("Unable to upload file")
//         return
//       }

//       const nftTokenBalance = await nftTokenContractFunction(nftContractAddress, "balanceOf", [walletAddress])

//       const mintPrice = await nftTokenContractFunction(nftContractAddress, "mintPrice", [])
//       const formattedMintPrice = parseFloat(formatEther(mintPrice.toString()))

//       if (formattedMintPrice < 1) {
//         alert("Mint price have not be set")
//         return
//       }

//       const approve= await approveContract( formattedMintPrice, signer )

//       if (!approve.status) {
//         alert(approve.result)
//         return
//       }

//       const mint= await mintNft(signer, fileUrl)

//       if (!mint.status) {
//         alert(mint.result)
//         return
//       }

//       alert("Transaction in progress")
  
//     } catch (e) {
//       console.log("error", e)
//     }
//   }

//   const handlePayNaira = async () => {
//     try {

//       const fileUrl = await uploadFileToServer()
//       if (!fileUrl) return

//       if (walletAddress == null) {
//         alert("Connect your wallet")
//         return
//       }

//       const nftTokenBalance = await nftTokenContractFunction(nftContractAddress, "balanceOf", [walletAddress])

//       const callback = `${baseUrl}/verifynaira?wallet=${walletAddress}&img=${uploadedUrl}`

//       initNairaPayment({
//         walletAddress: walletAddress,
//         callback: callback,
//       }).then((res) => {

//         const paystackUrl = res.data.data.data.url
//         localStorage.setItem('paymentRef', res.data.data.data.reference)
        
//         if (!paystackUrl) {
//           alert('Paystack URL not found')
//           return
//         }

//         window.open(paystackUrl, '_blank')
        
//       }).catch(() => {
//         alert("Unable to Initial Payment")
//         return
//       })

//     } catch (err) {
//       alert('Unable to Initial Payment')
//     }
//   }

//   useEffect(() => {
//     setBaseUrl(window.location.origin)
//   }, [])

//   return (
//     <main className="min-h-screen bg-[#001740] text-white">
//       <section className="max-w-xl mx-auto px-6 py-24 text-center">

//         <h1 className="text-4xl font-extrabold mb-6 text-[#fbc816]">
//           Mint Knowledge NFT
//         </h1>

//         <p className="text-gray-300 mb-10">
//           Choose a payment method to mint your NFT and unlock access to
//           the verification test.
//         </p>

//         <div className="mb-6">
//           <input
//             type="file"
//             onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//             className="w-full bg-gray-100 text-gray-800 p-3 rounded-xl"
//           />
//         </div>

//         <div className="space-y-4">

//           <button
//             onClick={handlePayUSDC}
//             disabled={!selectedFile || isUploading}
//             className="w-full bg-[#fbc816] text-[#001740] py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition disabled:opacity-50"
//           >
//             {isUploading ? "Uploading..." : `Pay with wallet & Mint NFT`}
//           </button>

//           <button
//             onClick={handlePayNaira}
//             disabled={!selectedFile || isUploading}
//             className="w-full bg-[#2417d3] text-[#fbc816] py-4 rounded-2xl font-bold shadow-xl hover:bg-[#1f14b0] hover:scale-105 transition disabled:opacity-50"
//           >
//             {isUploading ? "Uploading..." : `Pay with card & Mint NFT`}
//           </button>
//         </div>

//         <p className="text-sm text-gray-400 mt-8">
//           USDC payments require a connected wallet.  
//           Naira payments support local bank & card transfers.
//         </p>

//       </section>
//     </main>
//   )
// }


'use client'

import { initNairaPayment, uploadImage } from "@/api/user";
import { useBlockchain } from "../../../blockchain/blockchainContext";
import { useEffect, useState } from 'react'
import { approveContract, mintNft } from "@/blockchain/mint";
import { nftContractAddress } from "../../../blockchain/constant";
import { formatEther } from "ethers";

let USDC_AMOUNT = 2
const NAIRA_AMOUNT = '15000'

export default function MintPage() {

  const [baseUrl, setBaseUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // ✅ Added tier state
  const [selectedTier, setSelectedTier] = useState('')

  const { walletAddress, signer, nftTokenContractFunction } = useBlockchain();

  const uploadFileToServer = async (): Promise<string | null> => {
    try {
      if (!selectedFile) {
        alert("Please select a file first")
        return null
      }

      if (!selectedTier) {
        alert("Please select a tier")
        return null
      }

      setIsUploading(true)

      const formData = new FormData()
      formData.append("media", selectedFile)

      const res = await uploadImage(formData)

      setUploadedUrl(res.data.url)
      return res.data.url

    } catch (error) {
      alert("Upload failed")
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const handlePayUSDC = async () => {
    try {

      // const fileUrl = await uploadFileToServer()
      // if (!fileUrl) {
      //   alert("Unable to upload file")
      //   return
      // }

      const nftTokenBalance = await nftTokenContractFunction(
        nftContractAddress,
        "balanceOf",
        [walletAddress]
      )

      // if (parseFloat(nftTokenBalance.toString()) >= 1) {
      //   alert("You already made payment")
      //   return
      // }

      const mintPrice = await nftTokenContractFunction(
        nftContractAddress,
        "mintPrice",
        []
      )

      const formattedMintPrice = parseFloat(formatEther(mintPrice.toString()))

      if (formattedMintPrice < 1) {
        alert("Mint price have not be set")
        return
      }

      const approve = await approveContract(formattedMintPrice, signer)

      if (!approve.status) {
        alert(approve.result)
        return
      }

      const mint = await mintNft(signer, selectedTier)

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

      // const fileUrl = await uploadFileToServer()
      // if (!fileUrl) return

      if (walletAddress == null) {
        alert("Connect your wallet")
        return
      }

      const nftTokenBalance = await nftTokenContractFunction(
        nftContractAddress,
        "balanceOf",
        [walletAddress]
      )

      // if (parseFloat(nftTokenBalance.toString()) >= 1) {
      //   alert("You already made payment")
      //   return
      // }

      const callback = `${baseUrl}/verifynaira?wallet=${walletAddress}&img=${selectedTier}`

      initNairaPayment({
        walletAddress: walletAddress,
        callback: callback,
      }).then((res) => {

        const paystackUrl = res.data.data.data.url
        localStorage.setItem('paymentRef', res.data.data.data.reference)

        if (!paystackUrl) {
          alert('Paystack URL not found')
          return
        }

        window.open(paystackUrl, '_blank')

      }).catch(() => {
        alert("Unable to Initial Payment")
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
            <option value="tier1" className="bg-[#001740] text-white">
              Tier 1
            </option>
            <option value="tier2" className="bg-[#001740] text-white">
              Tier 2
            </option>
            <option value="tier3" className="bg-[#001740] text-white">
              Tier 3
            </option>
            <option value="tier4" className="bg-[#001740] text-white">
              Tier 4
            </option>
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

