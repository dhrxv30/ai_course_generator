"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HiMiniCircleStack,
  HiMiniLightBulb,
  HiMiniClipboardDocumentCheck,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOptions from "./_components/SelectOptions";
import { UserInpuContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialouge from "./_components/LoadingDialouge";
import uuid4 from "uuid4";
import { useRouter } from "next/navigation";

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
    console.log("Current input state:", userCourseInput);
  }, [userCourseInput]);

  const checkStatus = () => {
    if (!userCourseInput) return true;
    if (activeIndex === 0 && !userCourseInput.Category) return true;
    if (activeIndex === 1 && !userCourseInput.topic) return true;
    return false;
  };

  const saveCourseLayoutToDb = async (courseLayout) => {
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
        console.log("✅ Course saved to DB");
        return id;
      } else {
        console.error("❌ DB Error:", res.error);
      }
    } catch (error) {
      console.error("❌ Request failed:", error);
    }
    setLoading(false);
    return null;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const prompt = `Generate a Course Tutorial on Following Details with fields as course Name, Description, and chapters. ` +
      `Category: ${userCourseInput?.Category}, Topic: ${userCourseInput?.topic}, ` +
      `Level: ${userCourseInput?.difficulty}, Duration: ${userCourseInput?.duration}, ` +
      `NoOfChapters: ${userCourseInput?.noOfChapters} in JSON format`;

    try {
      const result = await GenerateCourseLayout_AI.sendMessage(prompt);
      const rawText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) throw new Error("No AI response content found");

      const parsedLayout = JSON.parse(rawText);
      console.log("Parsed Layout:", parsedLayout);

      const courseId = await saveCourseLayoutToDb(parsedLayout);
      if (courseId) {
        router.replace(`/create-course/${courseId}`);
      }
    } catch (error) {
      console.error("❌ Error generating layout:", error.message);
      alert("AI response could not be parsed. Try again.");
    }

    setLoading(false);
  };

  const renderStepComponent = () => {
    if (activeIndex === 0) return <SelectCategory />;
    if (activeIndex === 1) return <TopicDescription />;
    return <SelectOptions />;
  };

  return (
    <div>
      {/* Stepper UI */}
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create a Course</h2>
        <div className="flex">
          {StepperOptions.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px] mt-6">
                <div
                  className={`text-white bg-gray-200 text-2xl p-3 rounded-full transition-colors duration-300 ${
                    activeIndex >= index && "bg-primary"
                  }`}
                >
                  {item.icon  }
                </div>
                <h3 className="hidden md:block md:text-sm">{item.name}</h3>
              </div>
              {index !== StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full transition-colors duration-300 ${
                    activeIndex - 1 >= index && "bg-primary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Body */}
      <div className="px-10 md:px-20 lg:px-40 mt-10">
        {renderStepComponent()}

        <div className="flex items-center justify-between mt-10">
          {/* <Button
            // disabled={activeIndex === 0}
            variant="outline"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Back
          </Button> */}
          <Button onClick={() => setActiveIndex(activeIndex - 1)}>Back</Button>
          {activeIndex < StepperOptions.length - 1 ? (
            <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>
              Next
            </Button>
          ) : (
            <Button onClick={GenerateCourseLayout}>
              Create Course
            </Button>
          )}
        </div>
      </div>

      <LoadingDialouge loading={loading} />
    </div>
  );
};

export default CreateCourse;
