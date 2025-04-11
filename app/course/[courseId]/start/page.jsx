// In your app/course/[courseId]/start/page.jsx
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CourseStartPage() {
  const params = useParams();
  const router = useRouter();
  const { courseId } = params;
  
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        console.log('Fetching course with ID:', courseId);
        
        // Fetch chapters first
        const chaptersResponse = await fetch(`/api/courses/${courseId}/chapters`);
        console.log('Chapters response status:', chaptersResponse.status);
        
        if (!chaptersResponse.ok) {
          const errorText = await chaptersResponse.text();
          console.error('Failed to fetch chapters', errorText);
          setError(`Failed to fetch chapters: ${chaptersResponse.status}`);
          setLoading(false);
          return;
        }
        
        const chaptersData = await chaptersResponse.json();
        console.log('Chapters data:', chaptersData);
        
        if (!chaptersData || chaptersData.length === 0) {
          setError("No chapters found for this course");
          setLoading(false);
          return;
        }
        
        setChapters(chaptersData);
        
        // Try to fetch course details
        try {
          const courseResponse = await fetch(`/api/courses/${courseId}`);
          console.log('Course response status:', courseResponse.status);
          
          if (courseResponse.ok) {
            const courseData = await courseResponse.json();
            console.log('Course data:', courseData);
            setCourse(courseData);
          } else {
            console.warn('Course data not found, continuing with chapters only');
            // Create minimal course object
            setCourse({
              courseId: courseId,
              name: "Course Content",
              courseOutput: {
                courseName: "Course Content",
                description: "Video content for this course"
              }
            });
          }
        } catch (courseError) {
          console.warn('Error fetching course:', courseError);
          // Continue with chapters only
          setCourse({
            courseId: courseId,
            name: "Course Content",
            courseOutput: {
              courseName: "Course Content",
              description: "Video content for this course"
            }
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error in main fetch process:", error);
        setError(`Error loading course: ${error.message}`);
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
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

  // We'll continue if we have chapters, even if course data is minimal
  if (chapters.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl font-bold mb-4">No content available for this course</div>
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
        <h1 className="text-3xl font-bold">{course?.courseOutput?.courseName || "Course Content"}</h1>
        <p className="text-gray-500 mt-2">Chapter {currentChapter + 1} of {chapters.length}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video and Content Section */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-xl overflow-hidden">
            {currentChapterData.videoId ? (
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${currentChapterData.videoId}`}
                title={currentChapterData.content?.title || `Chapter ${currentChapter + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full aspect-video bg-gray-800 flex items-center justify-center text-white">
                No video available for this chapter
              </div>
            )}
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">
              {currentChapterData.content?.title || `Chapter ${currentChapter + 1}`}
            </h2>
            <div className="prose max-w-none">
              {currentChapterData.content?.description ? (
                <p>{currentChapterData.content.description}</p>
              ) : (
                <p>No description available for this chapter.</p>
              )}
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
                  <span className="font-medium">
                    {chapter.content?.title || `Chapter ${index + 1}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}