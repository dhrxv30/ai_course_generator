"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList as CourseTable } from "@/configs/schema"; // 🧠 Rename schema to avoid conflict
import { eq } from "drizzle-orm";
import CourseCard from "./CourseCard";

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await db.select().from(CourseTable);
      setCourses(result);
      console.log("📚 Courses fetched:", result);
    };

    fetchCourses();
  }, []);

  return (
    <div className="mt-10 px-6">
      <h2 className="font-bold text-lg">My AI Course</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseListPage;
