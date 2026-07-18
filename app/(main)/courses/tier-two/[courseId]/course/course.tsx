'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { GetSingleTireTwoCourse } from "@/api/api";
import { ICourseDetail, ILesson } from "@/api/api.interface";
import Link from "next/link";

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
                {/* Buy Course */}
                <Link  href="/courses/tier-two/courses">My Courses</Link>
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
        {/* <div className="md:col-span-1 bg-[#002766] rounded-xl p-5 h-fit">

          <h2 className="text-xl font-bold text-[#fbc816]">
            {activeLesson?.title}
          </h2>

          <p className="text-gray-300 mt-4 leading-relaxed text-sm">
            {activeLesson?.wordContent}
          </p>

          <div className="mt-6 border-t border-[#003a8c] pt-4">
            <p className="text-xs text-gray-400">
              🔒 Full lesson access requires purchase
            </p>

            <button className="w-full mt-3 bg-[#fbc816] text-[#001740] py-2 rounded-lg font-semibold">
              Unlock Course
            </button>
          </div>
        </div> */}

      </div>
    </div>
  );
}