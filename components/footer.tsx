'use client'

export default function Footer() {
  return (
    <footer className="bg-[#001740] py-6 text-center text-sm text-gray-300">
      © {new Date().getFullYear()} Knowledge Chain. All rights reserved.
    </footer>
  )
}