"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HiMiniCircleStack, HiMiniLightBulb, HiMiniClipboardDocumentCheck } from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOptions from "./_components/SelectOptions";
import { UserInpuContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialouge from "./_components/LoadingDialouge";
import uuid4 from "uuid4";
import { useRouter } from "next/navigation"; // ✅ useRouter from next/navigation for app router

const CreateCourse = () => {
  const StepperOptions = [
    { id: 1, name: "Category", icon: <HiMiniCircleStack /> },
    { id: 2, name: "Topics", icon: <HiMiniLightBulb /> },
    { id: 3, name: "Options", icon: <HiMiniClipboardDocumentCheck /> },
  ];

  const { userCourseInput } = useContext(UserInpuContext);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const checkStatus = () => {
    if (!userCourseInput) return true;
    if (activeIndex === 0 && !userCourseInput?.Category) return true;
    if (activeIndex === 1 && !userCourseInput?.topic) return true;
    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);

    const prompt =
      `Generate a Course Tutorial on Following Details with field as course Name, Description, along with chapter name. ` +
      `Category: ${userCourseInput?.Category}, Topic: ${userCourseInput?.topic}, ` +
      `Level: ${userCourseInput?.difficulty}, Duration: ${userCourseInput?.duration}, ` +
      `NoOfChapters: ${userCourseInput?.noOfChapters} in JSON format`;

    try {
      const result = await GenerateCourseLayout_AI.sendMessage(prompt);
      const rawText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      const parsedLayout = JSON.parse(rawText);
      console.log("Parsed Layout:", parsedLayout);

      const courseId = await saveCourseLaoyoutdb(parsedLayout); // ✅ get returned id
      if (courseId) {
        router.replace(`/create-course/${courseId}`); // ✅ route to dynamic page
      }
    } catch (e) {
      console.error("Error parsing layout JSON:", e.message);
    }

    setLoading(false);
  };

  const saveCourseLaoyoutdb = async (courseLayout) => {
    setLoading(true);
    try {
      const id = uuid4();
      const response = await fetch("/api/save-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          courseInput: userCourseInput,
          courseLayout,
        }),
      });

      const res = await response.json();
      if (res.success) {
        console.log("✅ Course saved to database");
        return id; // ✅ return ID
      } else {
        console.error("❌ DB Error:", res.error);
      }
    } catch (error) {
      console.error("❌ Error sending request:", error);
    }
    setLoading(false);
    return null;
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create a Course</h2>
        <div className="flex">
          {StepperOptions.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px] mt-6">
                <div
                  className={`text-white bg-gray-200 text-2xl p-3 rounded-full ${
                    activeIndex >= index && "bg-primary"
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="hidden md:block md:text-sm">{item.name}</h3>
              </div>
              {index !== StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] ${
                    activeIndex - 1 >= index && "bg-primary"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-40 mt-10">
        {activeIndex === 0 ? (
          <SelectCategory />
        ) : activeIndex === 1 ? (
          <TopicDescription />
        ) : (
          <SelectOptions />
        )}

        <div className="flex items-center justify-between mt-10">
          <Button disabled={activeIndex === 0} variant="outline" onClick={() => setActiveIndex(activeIndex - 1)}>
            Back
          </Button>
          {activeIndex < 2 ? (
            <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>
              Next
            </Button>
          ) : (
            <Button onClick={GenerateCourseLayout}>Create Course</Button>
          )}
        </div>
      </div>

      <LoadingDialouge loading={loading} />
    </div>
  );
};

export default CreateCourse;
