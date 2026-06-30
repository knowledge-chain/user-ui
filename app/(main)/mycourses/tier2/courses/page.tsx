'use client'


import Navbar from '@/components/navbar'
import  MyTier2Courses from "./courses";
import Footer from "@/components/footer";

export default function MyTier2CoursesPage() {
  return (<>
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
      <Navbar />

      < MyTier2Courses />

      <Footer />
    </main>
  </>)
}