'use client'

import Navbar from '@/components/navbar'
import  EditProfile from "./profile";
import Footer from "@/components/footer";

export default function EditProfilePage() {
  return (<>
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
      <Navbar />

      < EditProfile />

      <Footer />
    </main>
  </>)
}