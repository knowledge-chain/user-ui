'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GetTier2Courses } from '@/api/api'

interface Course {
  _id: string
  title: string
  description: string
  picture: string
  price: number
  totalLessons: number
  totalDuration: number
}

export default function Tier2CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  const limit = 10

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const res = await GetTier2Courses({
        page: String(page),
        limit: String(limit),
        search,
      })

      setCourses(res.data.data)
      setTotalPages(res.data.totalPages)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [page, search])

  const handleSearch = () => {
    setPage(1)
    setSearch(searchInput)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001740] flex items-center justify-center">
        <p className="text-[#fbc816] text-lg font-semibold">
          Loading Tier 2 Courses...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#001740] p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-[#fbc816] mb-6">
          Tier 2 Courses
        </h1>

        {/* SEARCH */}
        <div className="flex gap-3 mb-8">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search courses..."
            className="w-full md:w-1/3 px-4 py-3 rounded-xl bg-white text-[#001740]"
          />

          <button
            onClick={handleSearch}
            className="bg-[#fbc816] text-[#001740] px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Search
          </button>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-[#002766] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
            >
              {/* IMAGE */}
              <div className="relative w-full h-48">
                <Image
                  src={course.picture}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="text-lg font-bold text-white">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex justify-between text-sm text-gray-300 mt-3">
                  <span>{course.totalLessons || 0} Lessons</span>
                  <span>{course.totalDuration || 0} mins</span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-[#fbc816] font-bold">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </span>

                  <Link
                    href={`/courses/tier-two/${course._id}/course`}
                    className="bg-[#fbc816] text-[#001740] px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-3 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-white rounded-xl disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-xl ${
                page === i + 1
                  ? 'bg-[#fbc816] text-[#001740]'
                  : 'bg-white'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-white rounded-xl disabled:opacity-40"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  )
}

