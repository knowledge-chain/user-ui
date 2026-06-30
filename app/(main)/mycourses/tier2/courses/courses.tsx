// 'use client'

// import { useEffect, useState } from 'react'
// import { GetMyTier2Courses } from '@/api/api'
// import Link from 'next/link'

// export default function MyTier2CoursesPage() {
//   const [courses, setCourses] = useState<any[]>([])
//   const [loading, setLoading] = useState(false)

//   const [page, setPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)

//   const [search, setSearch] = useState('')

//   // ==========================
//   // FETCH COURSES
//   // ==========================
//   const fetchCourses = async (currentPage = 1, searchText = '') => {
//     try {
//       setLoading(true)

//       const res = await GetMyTier2Courses({
//         page: String(currentPage),
//         limit: '10',
//         search: searchText,
//       })

//       setCourses(res.data.data)
//       setPage(res.data.page)
//       setTotalPages(res.data.totalPages)
//     } catch (err: any) {
//       console.log(err)
//       alert(err?.response?.data?.message || 'Error fetching courses')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // initial load
//   useEffect(() => {
//     fetchCourses(1, '')
//   }, [])

//   // ==========================
//   // SEARCH
//   // ==========================
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value
//     setSearch(value)
//     fetchCourses(1, value)
//   }

//   // ==========================
//   // PAGINATION
//   // ==========================
//   const nextPage = () => {
//     if (page < totalPages) {
//       fetchCourses(page + 1, search)
//     }
//   }

//   const prevPage = () => {
//     if (page > 1) {
//       fetchCourses(page - 1, search)
//     }
//   }

//   return (
//     <main className="min-h-screen bg-[#001740] text-white px-6 py-10">

//       <h1 className="text-3xl font-bold mb-6">
//         My Tier 2 Courses
//       </h1>

//       {/* SEARCH */}
//       <input
//         value={search}
//         onChange={handleSearch}
//         placeholder="Search courses..."
//         className="w-full max-w-md px-4 py-3 mb-8 rounded-xl text-[#001740]"
//       />

//       {/* LOADING */}
//       {loading && <p>Loading...</p>}

//       {/* COURSES GRID */}
//       {/* <div className="grid md:grid-cols-2 gap-6"> */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//         {courses.map((course) => (
//           <div
//             key={course._id}
//             className="bg-[#001a4d] border border-[#002766] rounded-2xl p-5"
//           >
//             <img
//               src={course.picture}
//               className="w-full h-40 object-cover rounded-xl"
//             />

//             <h2 className="text-xl font-bold mt-4">
//               {course.title}
//             </h2>

//             <p className="text-gray-300 text-sm mt-2">
//               {course.description.slice(0, 120)}...
//             </p>

//             <div className="mt-4 flex justify-between text-gray-400 text-sm">
//               <span>{course.totalLessons} lessons</span>
//               <span>{course.totalDuration} mins</span>
//             </div>

//             <Link
//               href={`/mycourses/tier2/${course._id}`}
//               className="block mt-4 bg-[#fbc816] text-[#001740] text-center py-2 rounded-xl font-bold"
//             >
//               Continue
//             </Link>
//           </div>
//         ))}
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-center items-center gap-6 mt-10">
//         <button
//           onClick={prevPage}
//           disabled={page === 1}
//           className="px-4 py-2 bg-gray-700 rounded-xl disabled:opacity-40"
//         >
//           Prev
//         </button>

//         <span>
//           Page {page} of {totalPages}
//         </span>

//         <button
//           onClick={nextPage}
//           disabled={page === totalPages}
//           className="px-4 py-2 bg-gray-700 rounded-xl disabled:opacity-40"
//         >
//           Next
//         </button>
//       </div>

//     </main>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import { GetMyTier2Courses } from '@/api/api'
import Link from 'next/link'

export default function MyTier2CoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)

  // ==========================
  // FETCH COURSES
  // ==========================
  const fetchCourses = async (currentPage = 1, searchText = '') => {
    try {
      setLoading(true)
      setError(null)

      const res = await GetMyTier2Courses({
        page: String(currentPage),
        limit: '10',
        search: searchText,
      })

      setCourses(res.data.data)
      setPage(res.data.page)
      setTotalPages(res.data.totalPages)
    } catch (err: any) {
      const message =
        err?.response?.data?.message || 'Something went wrong'

      setError(message)
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses(1, '')
  }, [])

  // ==========================
  // SEARCH
  // ==========================
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    fetchCourses(1, value)
  }

  // ==========================
  // PAGINATION
  // ==========================
  const nextPage = () => {
    if (page < totalPages) {
      fetchCourses(page + 1, search)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      fetchCourses(page - 1, search)
    }
  }

  return (
    <main className="min-h-screen bg-[#001740] text-white px-6 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        My Tier 2 Courses
      </h1>

      {/* SEARCH */}
      <input
        value={search}
        onChange={handleSearch}
        placeholder="Search courses..."
        className="w-full max-w-md px-4 py-3 mb-8 rounded-xl text-[#001740]"
      />

      {/* LOADING */}
      {loading && (
        <p className="text-gray-300">Loading...</p>
      )}

      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-300 p-4 rounded-xl mb-6">
          <p className="font-semibold">⚠️ {error}</p>

          {error.toLowerCase().includes('mint') && (
            <Link
              href="/mint"
              className="inline-block mt-3 bg-[#fbc816] text-black px-4 py-2 rounded-xl font-bold"
            >
              Mint Tier 2 NFT
            </Link>
          )}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && courses.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          No courses found
        </div>
      )}

      {/* COURSES GRID */}
      {!error && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-[#001a4d] border border-[#002766] rounded-2xl p-5"
            >
              <img
                src={course.picture}
                className="w-full h-40 object-cover rounded-xl"
              />

              <h2 className="text-xl font-bold mt-4">
                {course.title}
              </h2>

              <p className="text-gray-300 text-sm mt-2">
                {course.description.slice(0, 120)}...
              </p>

              <div className="mt-4 flex justify-between text-gray-400 text-sm">
                <span>{course.totalLessons} lessons</span>
                <span>{course.totalDuration} mins</span>
              </div>

              <Link
                href={`/mycourses/tier2/${course._id}`}
                className="block mt-4 bg-[#fbc816] text-[#001740] text-center py-2 rounded-xl font-bold"
              >
                Continue
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {!error && courses.length > 0 && (
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 rounded-xl disabled:opacity-40"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-700 rounded-xl disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

    </main>
  )
}