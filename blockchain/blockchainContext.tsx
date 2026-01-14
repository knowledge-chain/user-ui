"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers, parseUnits, hexlify } from 'ethers';
import { tokenAbi } from './abi/tokenAbi';
import { chainId, currencyDecimal, currencyName, currencySymbol, factoryContractAddress, networkName, routerContractAddress, rpc } from './constant';
import { createAccount, getUserAccount } from '@/api/user';
import { toast } from "react-toastify";

interface BlockchainContextProps {
    // provider: ethers.providers.Web3Provider | null;
    // provider: ethers.JsonRpcProvider | null;
    provider: ethers.BrowserProvider | null; //goo
    signer: ethers.Signer | null;
    walletAddress: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    tokenContractFunction: (contractAdress: string, methodName: string, args: any[]) => Promise<any>;
}

const BlockchainContext = createContext<BlockchainContextProps | undefined>(undefined);

export const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null);
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);//goooo
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
  
    // Smart contract details
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
    const CONTRACT_ABI: any = [ /* Add your ABI here */ ];
    const TOKON_ABI: any = tokenAbi
  
    const connectWallet = async () => {
      
      // toast.error("Enter amount", {
      //   position: toast.POSITION.TOP_RIGHT
      // });

      // toast.success("Wallet connected 🎉");

      // toast.error("MetaMask not installed");

      try {
        if (!window.ethereum) {
          alert('MetaMask is not installed. Please install it.');
          return;
        }

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }); //goooooo

        const polygonChainIdHex = "0x89"; // 137

        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: polygonChainIdHex }],
          });
        } catch (switchError: any) {
          // 2️⃣ If Polygon is not added, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: polygonChainIdHex,
                  chainName: "Polygon Mainnet",
                  rpcUrls: ["https://polygon-rpc.com"],
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://polygonscan.com"],
                },
              ],
            });
          } else {
            alert("Unable to connect your wallet")
            throw switchError;
            return
          }
        }

        const walletAddress = accounts[0]; //gooooo
        console.log('walletAddress connected:', walletAddress); ///

        // const web3Provider = new ethers.JsonRpcProvider(rpc)
        const web3Provider = new ethers.BrowserProvider(window.ethereum); //gooo
        console.log('web3Provider', web3Provider)
     
        const web3Signer = await web3Provider.getSigner();
        const wallet = await web3Signer.getAddress();

        getUserAccount({walletAddress: wallet}).then((res: any) => {
          if (!res.data.status) {
            createAccount({walletAddress: wallet}).then((res) => {
              setProvider(web3Provider);
              setSigner(web3Signer);
              setWalletAddress(wallet);
            }).catch((e: any) => {
              alert("Unable to connect your wallet")
            })
          }else{
            setProvider(web3Provider);
            setSigner(web3Signer);
            setWalletAddress(wallet);
          }

        }).catch((e: any) => {
          alert("Unable to connect your wallet")
        })
  
      } catch (error) {
        alert("Unable to connect your wallet")
        console.error('Failed to connect wallet:', error);
      }
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setWalletAddress(null);
        setContract(null);
        if (window.ethereum?.removeAllListeners) {
            window.ethereum.removeAllListeners();
        }
    };

    const tokenContractFunction = async (contractAdress: string, methodName: string, args: any[]) => {
        if (!signer) {
          connectWallet()
        } 
        try {
          // const web3Provider = new ethers.JsonRpcProvider(rpc)
          const contractInstance = new ethers.Contract(contractAdress, TOKON_ABI, signer);
          const result = await contractInstance[methodName](...args);
          return result;
        } catch (error) {
          console.error(`Error calling ${methodName}:`, error);
          throw error;
        }
    };

    
    return (
      <BlockchainContext.Provider
        value={{ provider, signer, walletAddress, connectWallet, disconnectWallet, tokenContractFunction, }}
      >
        {children}
      </BlockchainContext.Provider>
    );
};

export const useBlockchain = (): BlockchainContextProps => {
    const context = useContext(BlockchainContext);
    if (!context) {
      throw new Error('useBlockchain must be used within a BlockchainProvider');
    }
    return context;
};

0x8E0dFf1DCd32ACC82B7Bd5a5351CAa3b182339D4