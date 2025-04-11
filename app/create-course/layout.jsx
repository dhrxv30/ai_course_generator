"use client"
import React, { useState } from 'react'
import Header from '../dashboard/_components/Header'
import { UserInpuContext } from '../_context/UserInputContext'

const CreateCourseLayout = ({children}) => {
  const [userCourseInput,setUserCourseInput] = useState([])
  return (
    <div>
    <UserInpuContext.Provider value={{userCourseInput,setUserCourseInput}}>
        <>
          {/* <Header/> */}
          {children}
        </>
    </UserInpuContext.Provider>
    </div>
  )
}

export default CreateCourseLayout