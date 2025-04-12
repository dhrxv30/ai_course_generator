import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInpuContext } from "@/app/_context/UserInputContext";

const SelectOptions = () => {

  const{userCourseInput,setUserCourseInput}=useContext(UserInpuContext)
  const handleSelectChange=((inputName,value)=>{
    setUserCourseInput((prev)=>({
      ...prev,
      [inputName]:value
    }))
  })

  return (
    <div className="px-10 md:px-20 lg:px-44 mt-10">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium">Difficulty Level</label>
          <Select defaultValue={userCourseInput?.difficulty} onValueChange={(value)=>handleSelectChange('difficulty',value)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Begineer">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Pro">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Course Duration</label>
          <Select defaultValue={userCourseInput?.duration} onValueChange={(value)=>handleSelectChange('duration',value)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hour">2 Hour</SelectItem>
              <SelectItem value="More than 2">More than 2 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm">
            <label className="text-sm font-medium">Enter Number of chapter</label>
            <Input defaultValue={userCourseInput?.noOfChapters} type={Number} onChange={(e)=>handleSelectChange('noOfChapters',e.target.value)}/>
        </div>
      </div>
    </div>
  );
};

export default SelectOptions;
