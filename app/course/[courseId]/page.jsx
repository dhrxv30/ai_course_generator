"use client"
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails'
import React, { useEffect, useState } from 'react'

const Course = ({params}) => {
    const [course, setCourse] = useState(null)
    useEffect(() => {
        params&&getCourse()
    }, [params])
    const getCourse = async () => {
    const result = await db.select().from(CourseList).where(eq(CourseList.id, params.courseId));
    setCourse(result[0]);
    console.log("📚 Course fetched:", result);
    }
  return (
    <div>
        <div className='px-10 p-10 md:px-20 lg:px-40'>
        <CourseBasicInfo course={course} />
        <CourseDetails course={course} />
        <ChapterList course={course} />
        </div>
        
    </div>
  )
}

export default Course