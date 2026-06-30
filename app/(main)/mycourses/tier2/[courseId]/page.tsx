'use client'


import Navbar from '@/components/navbar'
import  MyTier2Course from "./course";
import Footer from "@/components/footer";

export default function MyTier2CoursePage() {
  return (<>
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
      <Navbar />

      < MyTier2Course />

      <Footer />
    </main>
  </>)
}