import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const AddCourse = () => {
  return (
    <div className='flex justify-between items-center '>
        <div className=''>
            <h2 className='text-4xl'>Hello,<span className='font-bold'>User</span></h2>
            <p className='text-sm text-gray-500' >Create New Course with AI and share it with your friend</p>
        </div>
        <Link href='/create-course'>
        <Button className=' text-white mt-5'>Create Course</Button>
        </Link>
    </div>
  )
}

export default AddCourse