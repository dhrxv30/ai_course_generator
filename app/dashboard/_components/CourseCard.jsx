import { CourseList } from '@/configs/schema';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaBookOpen } from "react-icons/fa";
import { FaRegChartBar } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";

const CourseCard = ({ course }) => {
    const deleteCourse = async () => {
        const response = await db.delete(CourseList).where(eq(CourseList.id, course?.id));

    }
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
    <Link href={`/course/${course?.courseId}`}>
      <Image
        src="/placeholder.jpg"
        alt={course?.courseOutput?.courseName || 'Course Image'}
        width={200}
        height={200}
        className="rounded-lg w-full h-40 object-cover"
      />
      </Link>
      <div className="hover:scale-100 transition-all cursor-pointer duration-300 mt-2 flex justify-between items-center">
        <h3 className="font-medium text-md">
          {course?.courseOutput?.courseName || 'Untitled Course'}
        </h3>
        <div className=''>
            <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary'><FaBookOpen />{course?.courseOutput.numberOfChapters} Chapters</h2>
            <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary'><FaRegChartBar />{course?.difficulty}</h2>
            <p><IoTrashBinOutline onClick={deleteCourse()}/></p>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
