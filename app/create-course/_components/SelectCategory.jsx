import { UserInpuContext } from '@/app/_context/UserInputContext'
import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React, { useContext } from 'react'

const SelectCategory = () => {
  const{userCourseInput,setUserCourseInput}=useContext(UserInpuContext)
  const handleCategoryChange=(Category)=>{
    setUserCourseInput(prev=>({...prev,Category:Category}))
  }
  return (
    <div className='grid grid-cols-3 gap-10 px-10 md:px-20'>  
        {CategoryList.map((item,index)=>(
            <div key={index} className={`flex flex-col p-5 border items-center rounded-xl hover:bg-gray-50 hover:border-primary cursor-pointer transition-all duration-300 ease-in-out ${userCourseInput?.Category==item.name&&'bg-blue-250 border-primary'}`}
            onClick={()=>handleCategoryChange(item.name)}
            >
                <Image alt={item.alt} src={item.icon} width={50} height={50} />
                <h2>{item.name}</h2>
            </div>
        ))}
    </div>
  )
}

export default SelectCategory