"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // 👈 useParams hook
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

const CourseStart = () => {
    const [course, setCourse] = useState(null);
  const params = useParams();
  const courseId = params?.courseId;

  useEffect(() => {
    if (courseId) {
      getCourse();
    }
  }, [courseId]);

  const getCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, courseId));
    console.log("📘 Loaded course", result[0]);
    setCourse(result[0]);
  };

  return (
    <div className="p-10">
      <div className="md:w-64 h-screen bg-blue-200">
        <h2 className="font-medium text-lg bg-primary p-3 ">{course?.courseOutput?.courseName}</h2>
        <h2>{course?.courseOutput?.Chapters?.className.map((chapter,index)=>(
            <div key={index} className="flex gap-2 items-center p-3 bg-primary text-white my-2 rounded-md">
                <h2>{chapter?.chapterName}</h2>
            </div>
        ))}</h2>
      </div>
      <div className="md:ml-64">

      </div>
    </div>
  );
};

export default CourseStart;
