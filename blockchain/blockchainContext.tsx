// "use client"
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { ethers, parseUnits, hexlify } from 'ethers';
// import { nftTokenAbi } from './abi/tokenAbi';
// import { createAccount, getUserAccount } from '@/api/user';
// import { toast } from "react-toastify";
// import EthereumProvider from "@walletconnect/ethereum-provider"; // ✅ ADDED

// interface BlockchainContextProps {
//     provider: ethers.BrowserProvider | null;
//     signer: ethers.Signer | null;
//     walletAddress: string | null;
//     connectWallet: () => Promise<void>;
//     disconnectWallet: () => void;
//     nftTokenContractFunction: (contractAdress: string, methodName: string, args: any[]) => Promise<any>;
//     isConnected: boolean
// }

// const BlockchainContext = createContext<BlockchainContextProps | undefined>(undefined);

// export const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

//     const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
//     const [signer, setSigner] = useState<ethers.Signer | null>(null);
//     const [walletAddress, setWalletAddress] = useState<string | null>(null);
//     const [contract, setContract] = useState<ethers.Contract | null>(null);

//     const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
//     const CONTRACT_ABI: any = [];
//     const TOKON_ABI: any = nftTokenAbi;

//     const connectWallet = async () => {
//       try {

//         // ✅ NEW: detect injected or fallback to WalletConnect
//         let injectedProvider: any = window.ethereum;

//         if (!injectedProvider) {
//           try {
//             const wcProvider = await EthereumProvider.init({
//               projectId: "6b55b46e9468f5017cfa846fea340211", // 🔥 replace this
//               chains: [137], // Polygon
//               showQrModal: true,

//               metadata: {
//                 name: "TKC",
//                 description: "The knowledge chain",
//                 url: "https://www.theknowledgechain.com", // ⚠️ MUST match your app
//                 icons: ["https://ipfs.io/ipfs/bafybeihodi2i7cg5fkgzx56m3arwibpleki56wxxxgxotrjyausgnrwprm"], // can be any valid image URL
//               },
//             });

//             await wcProvider.connect();
//             if (wcProvider.session) {
//               console.log("WalletConnect session established");
//             }
//             injectedProvider = wcProvider;

//           } catch (err) {
//             alert("No wallet found. Please install MetaMask or use a wallet app.");
//             return;
//           }
//         }

//         // ✅ SAME LOGIC (just using injectedProvider instead)
//         const accounts = await injectedProvider.request({
//           method: "eth_requestAccounts"
//         });

//         const polygonChainIdHex = "0x89";

//         try {
//           await injectedProvider.request({
//             method: "wallet_switchEthereumChain",
//             params: [{ chainId: polygonChainIdHex }],
//           });
//         } catch (switchError: any) {
//           if (switchError.code === 4902) {
//             await injectedProvider.request({
//               method: "wallet_addEthereumChain",
//               params: [
//                 {
//                   chainId: polygonChainIdHex,
//                   chainName: "Polygon Mainnet",
//                   rpcUrls: ["https://polygon-rpc.com"],
//                   nativeCurrency: {
//                     name: "MATIC",
//                     symbol: "MATIC",
//                     decimals: 18,
//                   },
//                   blockExplorerUrls: ["https://polygonscan.com"],
//                 },
//               ],
//             });
//           } else {
//             alert("Unable to connect your wallet");
//             throw switchError;
//           }
//         }

//         const walletAddress = accounts[0];
//         console.log('walletAddress connected:', walletAddress);
//         localStorage.setItem('walletAddress', walletAddress)

//         const web3Provider = new ethers.BrowserProvider(injectedProvider);
//         const web3Signer = await web3Provider.getSigner();
//         const wallet = await web3Signer.getAddress();

//         // getUserAccount({ walletAddress: wallet }).then((res: any) => {
//           // if (!res.data.status) {
//             createAccount({ walletAddress: wallet }).then((res: any) => {
//               setProvider(web3Provider);
//               setSigner(web3Signer);
//               setWalletAddress(wallet);
//               localStorage.setItem('walletConnected', 'true');
//               // ✅ store token
//               localStorage.setItem('knowledge-token', res.data.token)
//               localStorage.setItem('walletAddress', walletAddress)
//               console.log("token", res.data.token)
//               // localStorage.setItem('walletAddress', walletAddress)
//             }).catch(() => {
//               alert("Unable to connect your wallet");
//             });
//           // } else {
//           //   setProvider(web3Provider);
//           //   setSigner(web3Signer);
//           //   setWalletAddress(wallet);
//           // }

//           // localStorage.setItem('walletConnected', 'true');

//         // }).catch(() => {
//         //   alert("Unable to connect your wallet");
//         // });

//       } catch (error) {
//         alert("Unable to connect your wallet");
//         console.error('Failed to connect wallet:', error);
//       }
//     };

//     const disconnectWallet = () => {
//         setProvider(null);
//         setSigner(null);
//         setWalletAddress(null);
//         setContract(null);
//         localStorage.removeItem('walletConnected');

//         if (window.ethereum?.removeAllListeners) {
//             window.ethereum.removeAllListeners();
//         }
//     };

//     // useEffect(() => {
//     //   const wasConnected = localStorage.getItem('walletConnected');

//     //   if (wasConnected && window.ethereum) {
//     //     connectWallet();
//     //   }
//     // }, []);

//     const nftTokenContractFunction = async (contractAdress: string, methodName: string, args: any[]) => {
//         if (!signer) {
//           connectWallet();
//         } 
//         try {
//           const contractInstance = new ethers.Contract(contractAdress, TOKON_ABI, signer);
//           const result = await contractInstance[methodName](...args);
//           return result;
//         } catch (error) {
//           console.error(`Error calling ${methodName}:`, error);
//           throw error;
//         }
//     };

//     return (
//       <BlockchainContext.Provider
//         value={{
//           provider,
//           signer,
//           walletAddress,
//           connectWallet,
//           disconnectWallet,
//           nftTokenContractFunction,
//           isConnected: !!walletAddress,
//         }}
//       >
//         {children}
//       </BlockchainContext.Provider>
//     );
// };

// export const useBlockchain = (): BlockchainContextProps => {
//     const context = useContext(BlockchainContext);
//     if (!context) {
//       throw new Error('useBlockchain must be used within a BlockchainProvider');
//     }
//     return context;
// };


"use client"
import React, { createContext, useState, useContext } from 'react';
import { ethers } from 'ethers';
import { nftTokenAbi } from './abi/tokenAbi';
import { createAccount } from '@/api/user';
import EthereumProvider from "@walletconnect/ethereum-provider";

interface BlockchainContextProps {
    provider: ethers.BrowserProvider | null;
    signer: ethers.Signer | null;
    walletAddress: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    nftTokenContractFunction: (
      contractAdress: string,
      methodName: string,
      args: any[]
    ) => Promise<any>;
    isConnected: boolean
}

const BlockchainContext = createContext<BlockchainContextProps | undefined>(undefined);

export const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
    const CONTRACT_ABI: any = [];
    const TOKON_ABI: any = nftTokenAbi;

    const connectWallet = async () => {
      try {

        let injectedProvider: any = window.ethereum;

        if (!injectedProvider) {
          try {
            const wcProvider = await EthereumProvider.init({
              projectId: "6b55b46e9468f5017cfa846fea340211",

              // ✅ HARDHAT
              chains: [31337],

              showQrModal: true,

              metadata: {
                name: "TKC",
                description: "The knowledge chain",
                url: "https://www.theknowledgechain.com",
                icons: [
                  "https://ipfs.io/ipfs/bafybeihodi2i7cg5fkgzx56m3arwibpleki56wxxxgxotrjyausgnrwprm"
                ],
              },
            });

            await wcProvider.connect();

            if (wcProvider.session) {
              console.log("WalletConnect session established");
            }

            injectedProvider = wcProvider;

          } catch (err) {
            alert("No wallet found. Please install MetaMask or use a wallet app.");
            return;
          }
        }

        const accounts = await injectedProvider.request({
          method: "eth_requestAccounts"
        });

        // ✅ HARDHAT LOCAL
        const HARDHAT_CHAIN_ID = "0x7A69";

        try {
          await injectedProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: HARDHAT_CHAIN_ID }],
          });

        } catch (switchError: any) {

          if (switchError.code === 4902) {

            await injectedProvider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: HARDHAT_CHAIN_ID,
                  chainName: "Hardhat Local",

                  rpcUrls: [
                    "http://127.0.0.1:8545"
                  ],

                  nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                },
              ],
            });

          } else {
            alert("Unable to connect your wallet");
            throw switchError;
          }
        }

        const walletAddress = accounts[0];

        console.log(
          'walletAddress connected:',
          walletAddress
        );

        localStorage.setItem(
          'walletAddress',
          walletAddress
        );

        const web3Provider =
          new ethers.BrowserProvider(
            injectedProvider
          );

        const web3Signer =
          await web3Provider.getSigner();

        const wallet =
          await web3Signer.getAddress();

        createAccount({
          walletAddress: wallet
        })
          .then((res: any) => {

            setProvider(web3Provider);
            setSigner(web3Signer);
            setWalletAddress(wallet);

            localStorage.setItem(
              'walletConnected',
              'true'
            );

            localStorage.setItem(
              'knowledge-token',
              res.data.token
            );

            localStorage.setItem(
              'walletAddress',
              walletAddress
            );

            localStorage.setItem(
              'userType',
              res.data.user.userType
            );
            
          })
          .catch(() => {
            alert(
              "Unable to connect your wallet"
            );
          });

      } catch (error) {

        alert("Unable to connect your wallet");

        console.error(
          'Failed to connect wallet:',
          error
        );
      }
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setWalletAddress(null);
        setContract(null);

        localStorage.removeItem(
          'walletConnected'
        );

        if (
          window.ethereum?.removeAllListeners
        ) {
            window.ethereum.removeAllListeners();
        }
    };

    const nftTokenContractFunction = async (
      contractAdress: string,
      methodName: string,
      args: any[]
    ) => {

        if (!signer) {
          connectWallet();
        }

        try {

          const contractInstance =
            new ethers.Contract(
              contractAdress,
              TOKON_ABI,
              signer
            );

          const result =
            await contractInstance[
              methodName
            ](...args);

          return result;

        } catch (error) {

          console.error(
            `Error calling ${methodName}:`,
            error
          );

          throw error;
        }
    };

    return (
      <BlockchainContext.Provider
        value={{
          provider,
          signer,
          walletAddress,
          connectWallet,
          disconnectWallet,
          nftTokenContractFunction,
          isConnected: !!walletAddress,
        }}
      >
        {children}
      </BlockchainContext.Provider>
    );
};

export const useBlockchain = (): BlockchainContextProps => {

    const context =
      useContext(BlockchainContext);

    if (!context) {
      throw new Error(
        'useBlockchain must be used within a BlockchainProvider'
      );
    }

    return context;
};
