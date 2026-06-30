
// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import {
//   GetNextLesson,
//   GetCompletedLessons,
//   GetNotCompletedLessons,
//   CompleteLesson,
//   MintCertificate,
//   GetCertificate
// } from '@/api/api'

// interface Lesson {
//   _id: string
//   title: string
//   wordContent: string
//   videoUrl: string
// }

// export default function MyTier2CoursePage() {
//   const params = useParams()
//   const courseId = params?.courseId as string

//   const [lesson, setLesson] = useState<Lesson | null>(null)
//   const [completedLessons, setCompletedLessons] = useState<Lesson[]>([])
//   const [notCompletedLessons, setNotCompletedLessons] = useState<Lesson[]>([])
//   const [loading, setLoading] = useState(false)

//   const [certLoading, setCertLoading] = useState(false)
//   const [certificateUrl, setCertificateUrl] = useState<string | null>(null)

//   // ======================
//   // VIDEO HELPERS
//   // ======================

//   const getYoutubeEmbedUrl = (url: string) => {
//     const regExp =
//       /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/

//     const match = url.match(regExp)

//     return match && match[1]
//       ? `https://www.youtube.com/embed/${match[1]}`
//       : null
//   }

//   const getVimeoEmbedUrl = (url: string) => {
//     const match = url.match(/vimeo\.com\/(\d+)/)

//     return match?.[1]
//       ? `https://player.vimeo.com/video/${match[1]}`
//       : null
//   }

//   const renderVideo = (videoUrl: string) => {
//     if (!videoUrl) return null

//     const youtubeUrl = getYoutubeEmbedUrl(videoUrl)
//     if (youtubeUrl) {
//       return (
//         <iframe
//           src={youtubeUrl}
//           className="w-full h-[500px] rounded-xl"
//           allowFullScreen
//         />
//       )
//     }

//     const vimeoUrl = getVimeoEmbedUrl(videoUrl)
//     if (vimeoUrl) {
//       return (
//         <iframe
//           src={vimeoUrl}
//           className="w-full h-[500px] rounded-xl"
//           allowFullScreen
//         />
//       )
//     }

//     return (
//       <video src={videoUrl} controls className="w-full rounded-xl" />
//     )
//   }

//   // ======================
//   // LOAD DATA
//   // ======================

//   const loadCourseData = async (id: string) => {
//     try {
//       setLoading(true)

//       const [nextRes, completedRes, notCompletedRes] =
//         await Promise.all([
//           GetNextLesson(id),
//           GetCompletedLessons(id),
//           GetNotCompletedLessons(id)
//         ])

//       setLesson(nextRes.data.data)
//       setCompletedLessons(completedRes.data.data)
//       setNotCompletedLessons(notCompletedRes.data.data)
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (courseId) loadCourseData(courseId)
//   }, [courseId])

//   // ======================
//   // COURSE COMPLETED CHECK
//   // ======================

//   const isCourseCompleted =
//     notCompletedLessons.length === 0 &&
//     completedLessons.length > 0

//   // ======================
//   // FETCH CERTIFICATE
//   // ======================

//   const fetchCertificate = async () => {
//     try {
//       const res = await GetCertificate(courseId)
//       const cert = res.data.checkCertificate

//       if (cert?.certificatePdfUrl) {
//         setCertificateUrl(cert.certificatePdfUrl)
//       }
//     } catch (err) {
//       // ignore if not found
//     }
//   }

//   useEffect(() => {
//     if (isCourseCompleted) {
//       fetchCertificate()
//     }
//   }, [isCourseCompleted])

//   // ======================
//   // COMPLETE LESSON
//   // ======================

//   const handleComplete = async () => {
//     if (!courseId || !lesson) return

//     try {
//       const res = await CompleteLesson({
//         courseId,
//         lessonId: lesson._id
//       })

//       const next = res.data.nextLesson

//       if (next) {
//         setLesson(next)
//         loadCourseData(courseId)
//       } else {
//         alert('🎉 Course Completed!')
//         loadCourseData(courseId)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   // ======================
//   // MINT CERTIFICATE
//   // ======================

//   const handleMintCertificate = async () => {
//     try {
//       setCertLoading(true)

//       const res = await MintCertificate({ courseId })

//       const pdfUrl = res.data.certificatePdfUrl

//       if (pdfUrl) {
//         setCertificateUrl(pdfUrl)
//         window.open(pdfUrl, '_blank')
//       }
//     } catch (err: any) {
//       console.log(err)

//       // fallback: already minted
//       try {
//         const res = await GetCertificate(courseId)

//         const url = res.data.checkCertificate?.certificatePdfUrl

//         if (url) {
//           setCertificateUrl(url)
//           window.open(url, '_blank')
//         }
//       } catch (e) {
//         alert('Failed to load certificate')
//       }
//     } finally {
//       setCertLoading(false)
//     }
//   }

//   const isCompletedLesson =
//     lesson &&
//     completedLessons.some((l) => l._id === lesson._id)

//   // ======================
//   // UI
//   // ======================

//   return (
//     <div className="min-h-screen bg-[#001740] text-white p-4 md:p-8">

//       <h1 className="text-2xl font-bold mb-6">
//         Course Learning Page
//       </h1>

//       {loading && (
//         <p className="text-gray-300">Loading course...</p>
//       )}

//       {/* ======================
//           COURSE COMPLETED STATE
//       ====================== */}
//       {!loading &&
//         !lesson &&
//         completedLessons.length > 0 && (
//           <div className="grid md:grid-cols-3 gap-6">

//             <div className="md:col-span-2 bg-[#001a4d] rounded-xl p-8 text-center">

//               <h2 className="text-2xl font-bold text-green-400">
//                 🎉 Course Completed
//               </h2>

//               <p className="text-gray-300 mt-3">
//                 You have completed all lessons in this course.
//               </p>

//               {/* ✅ CERTIFICATE BUTTON */}
//               <div className="mt-6">
//                 {certificateUrl ? (
//                   <a
//                     href={certificateUrl}
//                     target="_blank"
//                     className="bg-green-600 px-6 py-3 rounded-xl font-bold inline-block"
//                   >
//                     🎓 View Certificate
//                   </a>
//                 ) : (
//                   <button
//                     onClick={handleMintCertificate}
//                     disabled={certLoading}
//                     className="bg-[#2417d3] px-6 py-3 rounded-xl font-bold"
//                   >
//                     {certLoading
//                       ? 'Generating Certificate...'
//                       : '🎓 Mint Certificate'}
//                   </button>
//                 )}
//               </div>

//             </div>

//             <div className="bg-[#001a4d] p-4 rounded-xl">
//               <h3 className="font-bold mb-3 text-green-400">
//                 Completed Lessons
//               </h3>

//               {completedLessons.map((l) => (
//                 <div
//                   key={l._id}
//                   onClick={() => setLesson(l)}
//                   className="cursor-pointer p-3 hover:bg-[#002766] rounded-lg"
//                 >
//                   ✅ {l.title}
//                 </div>
//               ))}
//             </div>

//           </div>
//         )}

//       {/* ======================
//           LESSON VIEW
//       ====================== */}
//       {lesson && (
//         <div className="grid md:grid-cols-3 gap-6">

//           <div className="md:col-span-2 bg-[#001a4d] p-4 rounded-xl">

//             {renderVideo(lesson.videoUrl)}

//             <h2 className="text-xl font-bold mt-4">
//               {lesson.title}
//             </h2>

//             <p className="mt-3 text-gray-300 whitespace-pre-wrap">
//               {lesson.wordContent}
//             </p>

//             {isCompletedLesson ? (
//               <div className="mt-5 bg-green-600 px-4 py-3 rounded-xl inline-block font-semibold">
//                 ✅ Completed Lesson
//               </div>
//             ) : (
//               <button
//                 onClick={handleComplete}
//                 className="mt-5 bg-[#fbc816] text-black px-6 py-2 rounded-xl font-bold"
//               >
//                 Mark as Completed & Next Lesson
//               </button>
//             )}
//           </div>

//           <div className="space-y-4">

//             <div className="bg-[#001a4d] p-4 rounded-xl">
//               <h3 className="text-green-400 font-bold mb-3">
//                 Completed Lessons
//               </h3>

//               {completedLessons.map((l) => (
//                 <div
//                   key={l._id}
//                   onClick={() => setLesson(l)}
//                   className="cursor-pointer p-3 hover:bg-[#002766] rounded-lg"
//                 >
//                   ✅ {l.title}
//                 </div>
//               ))}
//             </div>

//             <div className="bg-[#001a4d] p-4 rounded-xl">
//               <h3 className="text-red-400 font-bold mb-3">
//                 Locked Lessons
//               </h3>

//               {notCompletedLessons.map((l) => (
//                 <div
//                   key={l._id}
//                   className="p-3 text-gray-400"
//                 >
//                   🔒 {l.title}
//                 </div>
//               ))}
//             </div>

//           </div>

//         </div>
//       )}
//     </div>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  GetNextLesson,
  GetCompletedLessons,
  GetNotCompletedLessons,
  CompleteLesson,
  MintCertificate,
  GetCertificate
} from '@/api/api'

interface Lesson {
  _id: string
  title: string
  wordContent: string
  videoUrl: string
}

export default function MyTier2CoursePage() {
  const params = useParams()
  const courseId = params?.courseId as string

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [completedLessons, setCompletedLessons] = useState<Lesson[]>([])
  const [notCompletedLessons, setNotCompletedLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(false)

  const [certLoading, setCertLoading] = useState(false)
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null)

  // ======================
  // VIDEO HELPERS
  // ======================

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/

    const match = url.match(regExp)

    return match && match[1]
      ? `https://www.youtube.com/embed/${match[1]}`
      : null
  }

  const getVimeoEmbedUrl = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/)

    return match?.[1]
      ? `https://player.vimeo.com/video/${match[1]}`
      : null
  }

  // ✅ Google Drive Support
  const getGoogleDriveEmbedUrl = (url: string) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)

    return match?.[1]
      ? `https://drive.google.com/file/d/${match[1]}/preview`
      : null
  }

  const renderVideo = (videoUrl: string) => {
    if (!videoUrl) return null

    // YouTube
    const youtubeUrl = getYoutubeEmbedUrl(videoUrl)
    if (youtubeUrl) {
      return (
        <iframe
          src={youtubeUrl}
          className="w-full h-[500px] rounded-xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }

    // Vimeo
    const vimeoUrl = getVimeoEmbedUrl(videoUrl)
    if (vimeoUrl) {
      return (
        <iframe
          src={vimeoUrl}
          className="w-full h-[500px] rounded-xl"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      )
    }

    // ✅ Google Drive
    const googleDriveUrl = getGoogleDriveEmbedUrl(videoUrl)
    if (googleDriveUrl) {
      return (
        <iframe
          src={googleDriveUrl}
          className="w-full h-[500px] rounded-xl"
          allow="autoplay"
          allowFullScreen
        />
      )
    }

    // Direct MP4/video URL
    return (
      <video
        src={videoUrl}
        controls
        controlsList="nodownload"
        className="w-full rounded-xl"
      />
    )
  }

  // ======================
  // LOAD DATA
  // ======================

  const loadCourseData = async (id: string) => {
    try {
      setLoading(true)

      const [nextRes, completedRes, notCompletedRes] =
        await Promise.all([
          GetNextLesson(id),
          GetCompletedLessons(id),
          GetNotCompletedLessons(id)
        ])

      setLesson(nextRes.data.data)
      setCompletedLessons(completedRes.data.data)
      setNotCompletedLessons(notCompletedRes.data.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (courseId) loadCourseData(courseId)
  }, [courseId])

  // ======================
  // COURSE COMPLETED CHECK
  // ======================

  const isCourseCompleted =
    notCompletedLessons.length === 0 &&
    completedLessons.length > 0

  // ======================
  // FETCH CERTIFICATE
  // ======================

  const fetchCertificate = async () => {
    try {
      const res = await GetCertificate(courseId)
      const cert = res.data.checkCertificate

      if (cert?.certificatePdfUrl) {
        setCertificateUrl(cert.certificatePdfUrl)
      }
    } catch (err) {}
  }

  useEffect(() => {
    if (isCourseCompleted) {
      fetchCertificate()
    }
  }, [isCourseCompleted])

  // ======================
  // COMPLETE LESSON
  // ======================

  const handleComplete = async () => {
    if (!courseId || !lesson) return

    try {
      const res = await CompleteLesson({
        courseId,
        lessonId: lesson._id
      })

      const next = res.data.nextLesson

      if (next) {
        setLesson(next)
        loadCourseData(courseId)
      } else {
        alert('🎉 Course Completed!')
        loadCourseData(courseId)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // ======================
  // MINT CERTIFICATE
  // ======================

  const handleMintCertificate = async () => {
    try {
      setCertLoading(true)

      const res = await MintCertificate({ courseId })

      const pdfUrl = res.data.certificatePdfUrl

      if (pdfUrl) {
        setCertificateUrl(pdfUrl)
        window.open(pdfUrl, '_blank')
      }
    } catch (err) {
      try {
        const res = await GetCertificate(courseId)

        const url = res.data.checkCertificate?.certificatePdfUrl

        if (url) {
          setCertificateUrl(url)
          window.open(url, '_blank')
        }
      } catch {
        alert('Failed to load certificate')
      }
    } finally {
      setCertLoading(false)
    }
  }

  const isCompletedLesson =
    lesson &&
    completedLessons.some((l) => l._id === lesson._id)

  // ======================
  // UI
  // ======================

  return (
    <div className="min-h-screen bg-[#001740] text-white p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">
        Course Learning Page
      </h1>

      {loading && (
        <p className="text-gray-300">Loading course...</p>
      )}

      {!loading && !lesson && completedLessons.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#001a4d] rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-green-400">
              🎉 Course Completed
            </h2>

            <p className="text-gray-300 mt-3">
              You have completed all lessons in this course.
            </p>

            <div className="mt-6">
              {certificateUrl ? (
                <a
                  href={certificateUrl}
                  target="_blank"
                  className="bg-green-600 px-6 py-3 rounded-xl font-bold inline-block"
                >
                  🎓 View Certificate
                </a>
              ) : (
                <button
                  onClick={handleMintCertificate}
                  disabled={certLoading}
                  className="bg-[#2417d3] px-6 py-3 rounded-xl font-bold"
                >
                  {certLoading
                    ? 'Generating Certificate...'
                    : '🎓 Mint Certificate'}
                </button>
              )}
            </div>
          </div>

          <div className="bg-[#001a4d] p-4 rounded-xl">
            <h3 className="font-bold mb-3 text-green-400">
              Completed Lessons
            </h3>

            {completedLessons.map((l) => (
              <div
                key={l._id}
                onClick={() => setLesson(l)}
                className="cursor-pointer p-3 hover:bg-[#002766] rounded-lg"
              >
                ✅ {l.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {lesson && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#001a4d] p-4 rounded-xl">
            {renderVideo(lesson.videoUrl)}

            <h2 className="text-xl font-bold mt-4">
              {lesson.title}
            </h2>

            <p className="mt-3 text-gray-300 whitespace-pre-wrap">
              {lesson.wordContent}
            </p>

            {isCompletedLesson ? (
              <div className="mt-5 bg-green-600 px-4 py-3 rounded-xl inline-block font-semibold">
                ✅ Completed Lesson
              </div>
            ) : (
              <button
                onClick={handleComplete}
                className="mt-5 bg-[#fbc816] text-black px-6 py-2 rounded-xl font-bold"
              >
                Mark as Completed & Next Lesson
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-[#001a4d] p-4 rounded-xl">
              <h3 className="text-green-400 font-bold mb-3">
                Completed Lessons
              </h3>

              {completedLessons.map((l) => (
                <div
                  key={l._id}
                  onClick={() => setLesson(l)}
                  className="cursor-pointer p-3 hover:bg-[#002766] rounded-lg"
                >
                  ✅ {l.title}
                </div>
              ))}
            </div>

            <div className="bg-[#001a4d] p-4 rounded-xl">
              <h3 className="text-red-400 font-bold mb-3">
                Locked Lessons
              </h3>

              {notCompletedLessons.map((l) => (
                <div
                  key={l._id}
                  className="p-3 text-gray-400"
                >
                  🔒 {l.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}