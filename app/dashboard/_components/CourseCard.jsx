import { CourseList } from "@/configs/schema";
import { db } from "@/configs/db"; // ✅ Import the db instance
import { eq } from "drizzle-orm"; // ✅ Import eq for condition
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBookOpen } from "react-icons/fa";
import { FaRegChartBar } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";

const CourseCard = ({ course }) => {
  const deleteCourse = async () => {
    try {
      const response = await db
        .delete(CourseList)
        .where(eq(CourseList.id, course?.id));
      console.log("✅ Course deleted:", response);
      // Optionally refresh the course list from parent or trigger re-render
    } catch (error) {
      console.error("❌ Error deleting course:", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <Link href={`/course/${course?.courseId}`}>
        <Image
          src="/placeholder.jpg"
          alt={course?.courseOutput?.courseName || "Course Image"}
          width={200}
          height={200}
          className="rounded-lg w-full h-40 object-cover"
        />
      </Link>
      <div className="hover:scale-100 transition-all cursor-pointer duration-300 mt-2">
        <h3 className="font-medium text-md mb-2">
          {course?.courseOutput?.courseName || "Untitled Course"}
        </h3>

        <div className="flex flex-col gap-2  rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2 text-primary text-sm">
            <FaBookOpen className="text-lg" />
            <span>{course?.courseOutput?.numberOfChapters || 0} Chapters</span>
          </div>
          <div className="flex items-center gap-2 text-primary text-sm">
            <FaRegChartBar className="text-lg" />
            <span>{course?.difficulty || "Unknown"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
