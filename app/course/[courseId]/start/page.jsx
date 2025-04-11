"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { db } from '@/configs/db'; // Make sure this path is correct
import { CourseList, Chapters } from '@/configs/schema'; // Make sure this path is correct
import { eq } from 'drizzle-orm';

export default function CourseStartPage() {
  const params = useParams();
  const { courseId } = params;
  
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data as a fallback
    const mockChapters = [
      {
        chapterId: "chapter1",
        content: {
          title: "What is Python and Why Learn It?",
          description: "An introduction to Python and its importance in today's programming landscape."
        },
        videoId: "Y8Tko2YC5hA"
      },
      {
        chapterId: "chapter2",
        content: {
          title: "Setting Up Your Python Environment",
          description: "Learn how to install Python and set up your development environment."
        },
        videoId: "YYXdXT2l-Gg"
      },
      {
        chapterId: "chapter3",
        content: {
          title: "Basic Syntax and Your First Program",
          description: "Understanding Python syntax and writing your first program."
        },
        videoId: "kqtD5dpn9C8"
      },
      {
        chapterId: "chapter4",
        content: {
          title: "Variables and Data Types",
          description: "Learn about different data types and how to use variables in Python."
        },
        videoId: "cQT33yu9pY8"
      }
    ];

    const mockCourse = {
      courseId: courseId,
      name: "Beginner Python Programming in 2 Hours",
      courseOutput: {
        courseName: "Beginner Python Programming in 2 Hours",
        description: "A fast-paced introduction to the fundamentals of Python programming.",
        numberOfChapters: 4
      }
    };

    // Use mock data for now
    setCourse(mockCourse);
    setChapters(mockChapters);
    setLoading(false);

    // Later, you can replace with actual database queries
    // For example:
    // async function fetchData() {
    //   try {
    //     // Your database queries here
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //     setError("Failed to load course data");
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    //
    // fetchData();
    
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Loading course content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl font-bold mb-4">Error: {error}</div>
        <Link href="/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  if (!course || chapters.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl font-bold mb-4">Course not found</div>
        <Link href="/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  const currentChapterData = chapters[currentChapter];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href={`/course/${courseId}`}>
          <Button variant="outline" className="mb-4">
            ← Back to Course Overview
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{course.courseOutput.courseName}</h1>
        <p className="text-gray-500 mt-2">Chapter {currentChapter + 1} of {chapters.length}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video and Content Section */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-xl overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${currentChapterData.videoId}`}
              title={currentChapterData.content.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">{currentChapterData.content.title}</h2>
            <div className="prose max-w-none">
              <p>{currentChapterData.content.description}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousChapter}
              disabled={currentChapter === 0}
            >
              Previous Chapter
            </Button>
            <Button 
              onClick={handleNextChapter}
              disabled={currentChapter === chapters.length - 1}
            >
              Next Chapter
            </Button>
          </div>
        </div>

        {/* Chapters List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Chapters</h2>
          <div className="space-y-2">
            {chapters.map((chapter, index) => (
              <div 
                key={chapter.chapterId || index}
                className={`p-3 rounded-lg cursor-pointer ${
                  index === currentChapter 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setCurrentChapter(index)}
              >
                <div className="flex items-center gap-2">
                  <div className={`rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold ${
                    index === currentChapter ? "bg-white text-primary" : "bg-primary text-white"
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-medium">{chapter.content.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}