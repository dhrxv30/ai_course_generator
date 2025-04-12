import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

const CourseBasicInfo = ({course}) => {
    const [fileSelected, setFileSelected] = useState(null);
    const onFileSelected = (event) => {
        const file = event.target.files[0];
        setFileSelected(URL.createObjectURL(file));
    }
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
            <h2 className='font-bold text-2xl'>{course?.courseOutput?.courseName}</h2>
            <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.description}</p>
            <h2>{course?.courseOutput?.category}</h2>
            {/* Updated link to use proper Next.js routing */}
            <Link href={`/course/${course?.courseId}/start`}>
              <Button className="w-full mt-5">Start</Button>
            </Link>
            </div>
        <div>
        <label htmlFor="upload-image" className='cursor-pointer'>
          <Image src={fileSelected?fileSelected:'/placeholder.jpg'} alt='Course Image' width={300} height={300} className='w-full rounded-xl h-[250px] object-cover'/>
          </label>
          <input type="file" id='upload-image' className='opacity-0' onChange={onFileSelected}/>
        </div>
      </div>
    </div>
  )
}

export default CourseBasicInfo