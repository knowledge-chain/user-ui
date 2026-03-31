// import { ethers } from 'ethers'

// const HARDHAT_CHAIN_ID = '0x7A69' // 31337 in hex

// export const connectWallet = async (): Promise<{
//   provider: ethers.BrowserProvider
//   signer: ethers.Signer
//   walletAddress: string
// }> => {
//   if (!window.ethereum) {
//     throw new Error('MetaMask is not installed')
//   }

//   try {
//     // 1️⃣ Request wallet connection
//     await window.ethereum.request({
//       method: 'eth_requestAccounts',
//     })

//     // 2️⃣ Ensure Hardhat network
//     const currentChainId = await window.ethereum.request({
//       method: 'eth_chainId',
//     })

//     if (currentChainId !== HARDHAT_CHAIN_ID) {
//       try {
//         // Try switching network
//         await window.ethereum.request({
//           method: 'wallet_switchEthereumChain',
//           params: [{ chainId: HARDHAT_CHAIN_ID }],
//         })
//       } catch (switchError: any) {
//         // 3️⃣ If network not added, add it
//         if (switchError.code === 4902) {
//           await window.ethereum.request({
//             method: 'wallet_addEthereumChain',
//             params: [
//               {
//                 chainId: HARDHAT_CHAIN_ID,
//                 chainName: 'Hardhat Local',
//                 rpcUrls: ['http://127.0.0.1:8545'],
//                 nativeCurrency: {
//                   name: 'ETH',
//                   symbol: 'ETH',
//                   decimals: 18,
//                 },
//               },
//             ],
//           })
//         } else {
//           throw switchError
//         }
//       }
//     }

//     // 4️⃣ Create provider & signer
//     const provider = new ethers.BrowserProvider(window.ethereum)
//     const signer = await provider.getSigner()
//     const walletAddress = await signer.getAddress()

//     return { provider, signer, walletAddress }
//   } catch (err) {
//     console.error('Wallet connection failed:', err)
//     throw new Error('Wallet connection rejected')
//   }
// }


import { ethers } from 'ethers'

const POLYGON_CHAIN_ID = '0x89' // 137 in hex

export const connectWallet = async (): Promise<{
  provider: ethers.BrowserProvider
  signer: ethers.Signer
  walletAddress: string
}> => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed')
  }

  try {
    // 1️⃣ Request wallet connection
    await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    // 2️⃣ Check current network
    const currentChainId = await window.ethereum.request({
      method: 'eth_chainId',
    })

    if (currentChainId !== POLYGON_CHAIN_ID) {
      try {
        // 3️⃣ Switch to Polygon
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: POLYGON_CHAIN_ID }],
        })
      } catch (switchError: any) {
        // 4️⃣ If Polygon network not added, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: POLYGON_CHAIN_ID,
                chainName: 'Polygon Mainnet',
                rpcUrls: ['https://polygon-rpc.com'],
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://polygonscan.com'],
              },
            ],
          })
        } else {
          throw switchError
        }
      }
    }

    // 5️⃣ Create provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const walletAddress = await signer.getAddress()

    return { provider, signer, walletAddress }
  } catch (err) {
    console.error('Wallet connection failed:', err)
    throw new Error('Wallet connection rejected')
  }
}