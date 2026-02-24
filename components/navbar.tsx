'use client'

import { useState } from 'react'
import Link from 'next/link'
import WalletButton from '@/components/walletButton'
import { HiMenu, HiX } from 'react-icons/hi'
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#001740] px-4 sm:px-6 md:px-8 py-4 md:py-6 border-b border-[#002766]">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Knowledge Chain Logo"
            width={160}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">

          <Link 
            href="/about" 
            className="hover:text-[#fbc816] transition"
          >
            About
          </Link>

          <Link 
            href="/contact" 
            className="hover:text-[#fbc816] transition"
          >
            Contact
          </Link>

          <Link 
            href="/verify" 
            className="hover:text-[#fbc816] transition"
          >
            Profile
          </Link>

          <WalletButton />

          <Link
            href="/mint"
            className="bg-[#fbc816] text-[#001740] px-5 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Mint NFT
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen 
              ? <HiX className="w-7 h-7" /> 
              : <HiMenu className="w-7 h-7" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col mt-6 md:hidden gap-6 text-gray-300">

          <Link 
            href="/about" 
            className="hover:text-[#fbc816] transition"
          >
            About
          </Link>

          <Link 
            href="/contact" 
            className="hover:text-[#fbc816] transition"
          >
            Contact
          </Link>

          <Link 
            href="/verify" 
            className="hover:text-[#fbc816] transition"
          >
            Profile
          </Link>

          <WalletButton />

          <Link
            href="/mint"
            className="bg-[#fbc816] text-[#001740] px-5 py-2 rounded-xl font-semibold text-center shadow-lg hover:scale-105 transition"
          >
            Mint NFT
          </Link>

        </div>
      )}
    </nav>
  )
}
