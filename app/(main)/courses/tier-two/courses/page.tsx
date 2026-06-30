'use client'


import Navbar from '@/components/navbar'
import Tier2Courses from "./courses";
import Footer from "@/components/footer";

export default function Tier2CoursesPage() {
  return (<>
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
      <Navbar />

      <Tier2Courses />

      <Footer />
    </main>
  </>)
}