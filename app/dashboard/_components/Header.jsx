import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='p-5 shadow-sm w-full'>
      <Image src='/logo.svg' alt='Logo' width={40} height={40} className='mb-5'/>
    </div>
  )
}

export default Header
