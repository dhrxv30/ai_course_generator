"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema";
import { eq } from "drizzle-orm";

export default function CourseStartPage() {
  const params = useParams();
  const { courseId } = params;

  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const courseResult = await db
          .select()
          .from(CourseList)
          .where(eq(CourseList.courseId, courseId));

        if (courseResult.length === 0) {
          setError("Course not found.");
          return;
        }

        setCourse(courseResult[0]);

        const chapterResult = await db
          .select()
          .from(Chapters)
          .where(eq(Chapters.courseId, courseId));

        if (chapterResult.length === 0) {
          setError("No chapters found for this course.");
          return;
        }

        setChapters(chapterResult);
      } catch (err) {
        console.error("❌ Error fetching course:", err);
        setError("Something went wrong while loading the course.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchData();
  }, [courseId]);

  const handleNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-2xl font-bold animate-pulse">Loading course content...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4 text-red-400">{error}</h2>
        <Link href="/courses">
          <Button className="bg-primary hover:bg-primary/80">Back to Courses</Button>
        </Link>
      </div>
    );
  }

  const currentChapterData = chapters[currentChapter];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Link href={`/create-course/${courseId}`}>
            <Button className="bg-primary text-white mb-4">← Back to Overview</Button>
          </Link>
          <h1 className="text-4xl font-bold">{course.courseOutput?.courseName || course.name}</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Chapter {currentChapter + 1} of {chapters.length}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Side - Video + Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${currentChapterData.videoId}`}
                title={currentChapterData.content?.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <div className="bg-gradient-to-br from-indigo-700 to-purple-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-3 text-white">
                {currentChapterData.content?.title}
              </h2>
              <p className="text-gray-200">{currentChapterData.content?.description}</p>
            </div>

            <div className="flex justify-between">
              <Button
                onClick={handlePreviousChapter}
                disabled={currentChapter === 0}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                ← Previous
              </Button>
              <Button
                onClick={handleNextChapter}
                disabled={currentChapter === chapters.length - 1}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Next →
              </Button>
            </div>
          </div>

          {/* Right Side - Chapter List */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Chapters</h3>
            <div className="space-y-3">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.chapterId || index}
                  onClick={() => setCurrentChapter(index)}
                  className={`p-4 rounded-md cursor-pointer transition duration-200 ${
                    index === currentChapter
                      ? "bg-white text-black font-semibold"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <span className="text-sm">
                    Chapter {index + 1}: {chapter.content?.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
