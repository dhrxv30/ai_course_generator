import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInpuContext } from "@/app/_context/UserInputContext";

const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInpuContext);
  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({ ...prev, [fieldName]: value }));
  };
  return (
    <div className="mx-20 lg:mx-44">
      {/* Input Topic */}
      <div className="mt-5">
        <label>
          Write the topic for Which you want to generate the Course (eg: Python,
          React, SQL):{" "}
        </label>
        <Input
          defaultValue={userCourseInput?.topic}
          placeholder={"Input Your Topic"}
          onChange={(e) => handleInputChange("topic", e.target.value)}
        />
      </div>
      {/* Text area Description */}
      <div className="mt-5">
        <label>Tell more about the topic(Optional) </label>
        <Textarea
          defaultValue={userCourseInput?.description}
          placeholder={"About your Course"}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TopicDescription;
