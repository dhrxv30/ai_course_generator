// app/course/[courseId]/page.jsx
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo';
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails';
// import CourseBasicInfo from '@/components/CourseBasicInfo';
// import CourseDetails from '@/components/CourseDetails';

export default function CourseOverviewPage() {
  const params = useParams();
  const { courseId } = params;
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) throw new Error('Failed to fetch course');
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (loading) {
    return <div className="container mx-auto p-8">Loading course information...</div>;
  }

  if (!course) {
    return <div className="container mx-auto p-8">Course not found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Course Layout</h1>
      <CourseBasicInfo course={course} />
      <CourseDetails course={course} />
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Chapters</h2>
        <div className="space-y-2">
          {course.courseOutput.chapters?.map((chapter, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
              <div className="flex items-center">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <h3 className="font-medium">{chapter.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}