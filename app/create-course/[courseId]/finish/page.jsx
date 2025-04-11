"use client";
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { FaRegCopy } from "react-icons/fa6";

const FinishScreen = ({ params }) => {
  const [course, setCourse] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (params?.courseId) {
      getCourse();
    }
  }, [params]);

  const getCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, params.courseId));

    if (result.length > 0) {
      setCourse(result[0]);
    }

    console.log("📦 Fetched Course:", result[0]);
  };

  return (
    <div className='px-10 md:px-20 lg:px-40 my-10'>
      <h2 className='text-center font-bold text-2xl my-3 text-primary'>Your Course is Ready</h2>

      <CourseBasicInfo course={course} />
      <h2 className='flex gap-5 items-center justify-between text-center text-gray-500 border p-2 rounded'>
  {`${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`}
  <FaRegCopy
    className='cursor-pointer'
    onClick={() =>
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`
      )
    }
  />
</h2>

    </div>
  );
};

export default FinishScreen;
