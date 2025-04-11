import React from "react";
import { HiOutlineChartBar } from "react-icons/hi";
import { FaClock } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";

const CourseDetails = ({ course }) => {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-3">
        <div className="flex gap-2">
          <HiOutlineChartBar className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Skill Level </h2>
            <h2 className="font-medium text-lg">{course?.difficulty}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <FaClock className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Duration</h2>
            <h2 className="font-medium text-lg">{course?.courseOutput?.duration}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <IoBookSharp className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">No of Chapters</h2>
            <h2 className="font-medium text-lg">{course?.courseOutput?.numberOfChapters}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
