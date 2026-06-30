// 'use client'

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import { GetSingleTireTwoCourse } from "@/api/api";

// interface Lesson {
//   _id: string;
//   title: string;
//   wordContent: string;
//   videoUrl: string;
// }

// interface Section {
//   _id: string;
//   title: string;
//   lessons: Lesson[];
// }

// interface Course {
//   _id: string;
//   title: string;
//   description: string;
//   picture: string;
//   price: number;
//   totalLessons: number;
//   totalDuration: number;
//   sections: Section[];
// }

// export default function SingleCoursePage() {
//   const { courseId } = useParams();

//   const [course, setCourse] = useState<Course | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

//   const fetchCourse = async () => {
//     try {
//       const res = await GetSingleTireTwoCourse(courseId as string);
//       const data = res.data;

//       setCourse(data);

//       // default first lesson
//       const first =
//         data?.sections?.[0]?.lessons?.[0] || null;

//       setActiveLesson(first);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (courseId) fetchCourse();
//   }, [courseId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#001740] flex items-center justify-center">
//         <p className="text-[#fbc816]">Loading course...</p>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen bg-[#001740] flex items-center justify-center">
//         <p className="text-red-500">Course not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#001740] text-white">

//       {/* TOP SECTION */}
//       <div className="bg-[#002766] border-b border-[#003a8c]">
//         <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-6">

//           {/* LEFT */}
//           <div>
//             <h1 className="text-3xl font-bold text-[#fbc816]">
//               {course.title}
//             </h1>

//             <p className="text-gray-300 mt-3">
//               {course.description}
//             </p>

//             <div className="mt-4 text-sm text-gray-400">
//               <p>Lessons: {course.totalLessons}</p>
//               <p>Duration: {course.totalDuration} hrs</p>
//             </div>
//           </div>

//           {/* RIGHT VIDEO */}
//           <div className="rounded-xl overflow-hidden bg-black">
//             {activeLesson?.videoUrl ? (
//               <video
//                 src={activeLesson.videoUrl}
//                 controls
//                 className="w-full h-64 object-cover"
//               />
//             ) : (
//               <Image
//                 src={course.picture}
//                 alt={course.title}
//                 width={600}
//                 height={300}
//                 className="w-full h-64 object-cover"
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* BODY */}
//       <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-6">

//         {/* LEFT SIDEBAR (CURRICULUM) */}
//         <div className="md:col-span-1 space-y-4">

//           <h2 className="text-xl font-bold text-[#fbc816]">
//             Course Content
//           </h2>

//           {course.sections.map((section) => (
//             <div
//               key={section._id}
//               className="bg-[#002766] rounded-xl p-4"
//             >
//               <h3 className="font-semibold text-white mb-2">
//                 {section.title}
//               </h3>

//               <div className="space-y-2">
//                 {section.lessons.map((lesson) => (
//                   <button
//                     key={lesson._id}
//                     onClick={() => setActiveLesson(lesson)}
//                     className="text-left w-full text-sm text-gray-300 hover:text-[#fbc816]"
//                   >
//                     ▶ {lesson.title}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="md:col-span-2 bg-[#002766] p-6 rounded-xl">

//           <h2 className="text-2xl font-bold text-[#fbc816]">
//             {activeLesson?.title}
//           </h2>

//           <p className="text-gray-300 mt-4 leading-relaxed">
//             {activeLesson?.wordContent}
//           </p>

//           {activeLesson?.videoUrl && (
//             <div className="mt-6">
//               <video
//                 src={activeLesson.videoUrl}
//                 controls
//                 className="w-full rounded-xl"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { GetSingleTireTwoCourse } from "@/api/api";
import { ICourseDetail, ILesson } from "@/api/api.interface";

export default function SingleCoursePage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState<ICourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<ILesson | null>(null);

  const fetchCourse = async () => {
    try {
      const res = await GetSingleTireTwoCourse(courseId as string);
      const data = res.data;

      setCourse(data);

      // default first lesson
      const first = data?.sections?.[0]?.lessons?.[0] || null;
      setActiveLesson(first);
      setOpenSection(data?.sections?.[0]?._id || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001740] flex items-center justify-center">
        <p className="text-[#fbc816]">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#001740] flex items-center justify-center">
        <p className="text-red-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001740] text-white">

      {/* HERO SECTION (Udemy style) */}
      <div className="bg-[#002766] border-b border-[#003a8c]">
        <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-[#fbc816]">
              {course.title}
            </h1>

            <p className="text-gray-300 mt-4">
              {course.description}
            </p>

            <div className="mt-4 flex gap-6 text-sm text-gray-400">
              <span>{course.totalLessons} lessons</span>
              <span>{course.totalDuration} hours</span>
              <span>Full lifetime access</span>
            </div>
          </div>

          {/* RIGHT CARD (like Udemy sidebar) */}
          <div className="bg-[#001740] rounded-xl overflow-hidden border border-[#003a8c]">
            <Image
              src={course.picture}
              alt={course.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <p className="text-2xl font-bold text-[#fbc816]">
                {course.price === 0 ? "Free" : `$${course.price}`}
              </p>

              <button className="w-full mt-4 bg-[#fbc816] text-[#001740] py-3 rounded-xl font-bold">
                Buy Course
              </button>

              <p className="text-xs text-gray-400 mt-3 text-center">
                Pay once, learn forever
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">

        {/* CURRICULUM */}
        <div className="md:col-span-2 space-y-4">

          <h2 className="text-2xl font-bold text-[#fbc816]">
            Course Content
          </h2>

          {course.sections.map((section) => {
            const isOpen = openSection === section._id;

            return (
              <div key={section._id} className="bg-[#002766] rounded-xl">

                {/* SECTION HEADER */}
                <button
                  onClick={() =>
                    setOpenSection(isOpen ? null : section._id)
                  }
                  className="w-full text-left p-4 font-semibold flex justify-between"
                >
                  <span>
                    {section.title}
                  </span>

                  <span className="text-gray-400">
                    {section.lessons.length} lessons
                  </span>
                </button>

                {/* LESSONS */}
                {isOpen && (
                  <div className="border-t border-[#003a8c]">
                    {section.lessons.map((lesson) => (
                      <button
                        key={lesson._id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full text-left px-4 py-3 text-sm flex justify-between hover:bg-[#001740] ${
                          activeLesson?._id === lesson._id
                            ? "text-[#fbc816]"
                            : "text-gray-300"
                        }`}
                      >
                        <span>▶ {lesson.title}</span>

                        {/* duration */}
                        <span className="text-xs text-gray-500">
                          {lesson.duration} min
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* LESSON DETAILS (NO VIDEO) */}
        <div className="md:col-span-1 bg-[#002766] rounded-xl p-5 h-fit">

          <h2 className="text-xl font-bold text-[#fbc816]">
            {activeLesson?.title}
          </h2>

          <p className="text-gray-300 mt-4 leading-relaxed text-sm">
            {activeLesson?.wordContent}
          </p>

          {/* PAYWALL INDICATOR */}
          <div className="mt-6 border-t border-[#003a8c] pt-4">
            <p className="text-xs text-gray-400">
              🔒 Full lesson access requires purchase
            </p>

            <button className="w-full mt-3 bg-[#fbc816] text-[#001740] py-2 rounded-lg font-semibold">
              Unlock Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}