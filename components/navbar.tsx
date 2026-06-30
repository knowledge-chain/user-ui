'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiMenu, HiX, HiChevronDown, HiOutlineDuplicate } from 'react-icons/hi'
import Image from "next/image"

export default function Navbar() {
  const [walletAddress, setWalletAddress] = useState('')

  const [showRightSidebar, setShowRightSidebar] = useState(false)
  const [showLeftSidebar, setShowLeftSidebar] = useState(false)

  // TOP NAV STATES
  const [topCoursesOpen, setTopCoursesOpen] = useState(false)
  const [topMyCoursesOpen, setTopMyCoursesOpen] = useState(false)
  const [topPlanOpen, setTopPlanOpen] = useState(false)

  // LEFT SIDEBAR STATES
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false)
  const [mobileMyCoursesOpen, setMobileMyCoursesOpen] = useState(false)
  const [mobilePlanOpen, setMobilePlanOpen] = useState(false)
  const [mobileBillOpen, setMobileBillOpen] = useState(false)

  // RIGHT SIDEBAR STATES
  const [rightCoursesOpen, setRightCoursesOpen] = useState(false)
  const [rightMyCoursesOpen, setRightMyCoursesOpen] = useState(false)
  const [rightPlanOpen, setRightPlanOpen] = useState(false)
  const [rightBillOpen, setRightBillOpen] = useState(false)

  useEffect(() => {
    const wallet = localStorage.getItem('walletAddress')
    if (wallet) setWalletAddress(wallet)
  }, [])

  const shortWallet = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : ''

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      alert('Wallet copied ✅')
    } catch (err) {
      console.log(err)
    }
  }

  const logoutWallet = () => {
    localStorage.removeItem('walletAddress')
    localStorage.removeItem('knowledge-token')
    window.location.href = '/auth/login'
  }

  // ================= LINKS =================

  const coursesLinks = [
    { name: 'Tier 1', href: '/test' },
    { name: 'Tier 2', href: '/courses/tier-two/courses' },
    // { name: 'Tier 3', href: '/courses/tier-three/courses' },
    // { name: 'Tier 4', href: '/courses/tier4' },
  ]

  const myCoursesLinks = [
    { name: 'Tier 1', href: '/test' },
    { name: 'Tier 2', href: '/mycourses/tier2/courses' },
    // { name: 'Tier 3', href: '/my-courses/tier3' },
    // { name: 'Tier 4', href: '/my-courses/tier4' },
  ]

  const planLinks = [
    // { name: 'Tier 1', href: '/plan/tier1' },
    { name: 'Tier 2', href: '/plan/tier2/plans' },
    // { name: 'Tier 3', href: '/plan/tier3' },
    // { name: 'Tier 4', href: '/plan/tier4' },
  ]

    const billLinks = [
    // { name: 'Tier 1', href: '/plan/tier1' },
    { name: 'Tier 2', href: '/plan/tier2/bills' },
    // { name: 'Tier 3', href: '/plan/tier3' },
    // { name: 'Tier 4', href: '/plan/tier4' },
  ]

  const sidebarLinks = [
    { name: 'Mint NFT', href: '/mint' },
    { name: 'Profile', href: '/verify' },
    { name: 'Edit Profile', href: '/profile' },
    // { name: 'Cart', href: '/cart' },
    // { name: 'Course', href: '/courses' },
    // { name: 'My Learning', href: '/my-courses' },
  ]

  return (
    <nav className="bg-[#001740] px-4 md:px-8 py-4 border-b border-[#002766] relative">

      <div className="flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={160} height={40} />
        </Link>

        {/* ================= TOP NAVBAR ================= */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">

          {/* COURSES */}
          <div className="relative">
            <button onClick={() => setTopCoursesOpen(v => !v)} className="flex items-center gap-1 hover:text-[#fbc816]">
              Courses <HiChevronDown />
            </button>

            {topCoursesOpen && (
              <div className="absolute top-10 bg-[#001a4d] w-52 rounded-xl overflow-hidden">
                {coursesLinks.map((c) => (
                  <Link key={c.name} href={c.href} className="block px-5 py-3 hover:bg-[#002766]">
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* MY COURSES */}
          <div className="relative">
            <button onClick={() => setTopMyCoursesOpen(v => !v)} className="flex items-center gap-1 hover:text-[#fbc816]">
              My Courses <HiChevronDown />
            </button>

            {topMyCoursesOpen && (
              <div className="absolute top-10 bg-[#001a4d] w-52 rounded-xl overflow-hidden">
                {myCoursesLinks.map((c) => (
                  <Link key={c.name} href={c.href} className="block px-5 py-3 hover:bg-[#002766]">
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* WALLET */}
          <button
            onClick={() => setShowRightSidebar(true)}
            className="bg-[#001a4d] border border-[#fbc816] text-[#fbc816] px-4 py-2 rounded-xl"
          >
            {shortWallet}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden text-white">
          <button onClick={() => setShowLeftSidebar(true)}>
            <HiMenu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* ================= RIGHT SIDEBAR ================= */}
      {showRightSidebar && (
        <div className="fixed right-0 top-0 w-80 h-full bg-[#001a4d] z-50 p-6 text-white overflow-y-auto">

          <button onClick={() => setShowRightSidebar(false)}>
            <HiX className="w-6 h-6" />
          </button>

          <p className="mt-4 text-sm text-gray-400">Wallet</p>
          <p className="break-all mb-4">{walletAddress}</p>

          <button onClick={copyWallet} className="block mb-3"><HiOutlineDuplicate className="w-5 h-5 cursor-pointer" /></button>

          {/* COURSES */}
          <div className="border-t border-gray-600 pt-4">
            <button onClick={() => setRightCoursesOpen(v => !v)} className="w-full flex justify-between">
              Courses <HiChevronDown />
            </button>
            {rightCoursesOpen && (
              <div className="mt-3 flex flex-col gap-3 pl-4">
                {coursesLinks.map((c) => (
                  <Link key={c.name} href={c.href}>{c.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* MY COURSES */}
          <div className="mt-3 border-t border-gray-600 pt-4">
            <button onClick={() => setRightMyCoursesOpen(v => !v)} className="w-full flex justify-between">
              My Courses <HiChevronDown />
            </button>
            {rightMyCoursesOpen && (
              <div className="mt-3 flex flex-col gap-3 pl-4">
                {myCoursesLinks.map((c) => (
                  <Link key={c.name} href={c.href}>{c.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* PLAN */}
          <div className="mt-3 border-t border-gray-600 pt-4">
            <button onClick={() => setRightPlanOpen(v => !v)} className="w-full flex justify-between">
              Plan <HiChevronDown />
            </button>
            {rightPlanOpen && (
              <div className="mt-3 flex flex-col gap-3 pl-4">
                {planLinks.map((p) => (
                  <Link key={p.name} href={p.href}>{p.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* BILL */}
          <div className="mt-3 border-t border-gray-600 pt-4">
            <button onClick={() => setRightBillOpen(v => !v)} className="w-full flex justify-between">
              Bill <HiChevronDown />
            </button>
            {rightBillOpen && (
              <div className="mt-3 flex flex-col gap-3 pl-4">
                {billLinks.map((b) => (
                  <Link key={b.name} href={b.href}>{b.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* LINKS */}
          <div>
            {sidebarLinks.map((l) => (
              <div className="mt-3 flex flex-col gap-4 border-t border-gray-600 pt-4">
                <Link key={l.name} href={l.href}>{l.name}</Link>
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="mt-6 border-t border-gray-600 pt-4">
            <button onClick={logoutWallet} className="w-full flex justify-between text-red-400">
              Logout 
            </button>
          </div>

        </div>
      )}

      {/* ================= LEFT SIDEBAR ================= */}
      {showLeftSidebar && (
        <div className="fixed left-0 top-0 w-80 h-full bg-[#001a4d] z-50 p-6 text-white overflow-y-auto">

          <button onClick={() => setShowLeftSidebar(false)}>
            <HiX className="w-6 h-6" />
          </button>

          <p className="break-all mb-4">{walletAddress}</p>

          <button onClick={copyWallet} className="block mb-3"><HiOutlineDuplicate className="w-5 h-5 cursor-pointer" /></button>

          {/* COURSES */}
          <div className="mt-6 border-b border-gray-600 pb-4">
            <button onClick={() => setMobileCoursesOpen(v => !v)} className="w-full flex justify-between">
              Courses <HiChevronDown />
            </button>
            {mobileCoursesOpen && (
              <div className="mt-3 flex flex-col gap-3 pl-4">
                {coursesLinks.map((c) => (
                  <Link key={c.name} href={c.href}>{c.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* MY COURSES */}
          <div className="mt-3 border-b border-gray-600 pb-4">
            <button onClick={() => setMobileMyCoursesOpen(v => !v)} className="w-full flex justify-between">
              My Courses <HiChevronDown />
            </button>
            {mobileMyCoursesOpen && (
              <div className="mt-3 flex flex-col gap-3 pl-4">
                {myCoursesLinks.map((c) => (
                  <Link key={c.name} href={c.href}>{c.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* PLAN */}
          <div className="mt-3 border-b border-gray-600 pb-4">
            <button onClick={() => setMobilePlanOpen(v => !v)} className="w-full flex justify-between">
              Plan <HiChevronDown />
            </button>
            {mobilePlanOpen && (
              <div className="mt-3 flex flex-col gap-3 pl-4">
                {planLinks.map((p) => (
                  <Link key={p.name} href={p.href}>{p.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* PLAN */}
          <div className="mt-3 border-b border-gray-600 pb-4">
            <button onClick={() => setMobileBillOpen(v => !v)} className="w-full flex justify-between">
              Bill <HiChevronDown />
            </button>
            {mobileBillOpen && (
              <div className="mt-3 flex flex-col gap-3 pl-4">
                {billLinks.map((b) => (
                  <Link key={b.name} href={b.href}>{b.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* OTHER LINKS */}
          <div>
            {sidebarLinks.map((l) => (
              <div className="mt-3 border-gray-600 pb-4">
                <Link key={l.name} href={l.href}>{l.name}</Link>
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="mt-6 border-t border-gray-600 pt-4">
            <button onClick={logoutWallet} className="w-full flex justify-between text-red-400">
              Logout 
            </button>
          </div>

        </div>
      )}

    </nav>
  )
}