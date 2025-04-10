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
import { CourseList } from "@/configs/schema";
import { db } from "@/configs/db";

// 🧠 Server Action (must be at the top, outside the component)
export async function saveCourseLaoyoutdb(courseInput, courseLayout) {
  "use server";

  try {
    const { topic, difficulty, Category, createdBy = "anonymous", userName = "guest" } = courseInput;

    await db.insert(CourseList).values({
      courseId: crypto.randomUUID(),
      name: topic,
      difficulty,
      Category,
      courseOutput: courseLayout,
      createdBy,
      userName,
    });

    console.log("✅ Course saved to DB.");
    return { success: true };
  } catch (error) {
    console.error("❌ Error saving course:", error);
    return { success: false, error: error.message };
  }
}

const CreateCourse = () => {
  const StepperOptions = [
    { id: 1, name: "Category", icon: <HiMiniCircleStack /> },
    { id: 2, name: "Topics", icon: <HiMiniLightBulb /> },
    { id: 3, name: "Options", icon: <HiMiniClipboardDocumentCheck /> },
  ];

  const { userCourseInput, setUserCourseInput } = useContext(UserInpuContext);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const checkStatus = () => {
    if (userCourseInput?.length == 0) return true;

    if ((activeIndex == 0 && !userCourseInput?.Category) ||
        (activeIndex == 1 && !userCourseInput?.topic)) {
      return true;
    }

    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);

    const BASIC_PROMPT =
      "Generate a Course Tutorial on Following Details with field as course Name , Description, along with chapter name , about:";
    const USER_INPUT_PROMPT =
      "Category:" +
      userCourseInput?.Category +
      ", Topic:" +
      userCourseInput?.topic +
      ", Level:" +
      userCourseInput?.difficulty +
      ", Duration:" +
      userCourseInput?.duration +
      ", NoOfChapters:" +
      userCourseInput?.noOfChapters +
      " in JSON format";

    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

    console.log("📤 Sending Prompt:", FINAL_PROMPT);

    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    result.response.text =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("📩 Raw Text Response:", result.response?.text);

    let parsedLayout;
    try {
      parsedLayout = JSON.parse(result.response?.text);
      console.log("✅ Parsed JSON:", parsedLayout);
    } catch (e) {
      console.error("❌ Failed to parse JSON:", e.message);
      setLoading(false);
      return;
    }

    // 📥 Save to DB via server action
    const saveResult = await saveCourseLaoyoutdb(userCourseInput, parsedLayout);
    if (!saveResult.success) {
      console.error("❌ DB Save Failed:", saveResult.error);
    }

    setLoading(false);
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
          <Button
            className="cursor-pointer"
            disabled={activeIndex === 0}
            variant="outline"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Back
          </Button>

          {activeIndex < 2 ? (
            <Button className="cursor-pointer" onClick={() => setActiveIndex(activeIndex + 1)}>
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
