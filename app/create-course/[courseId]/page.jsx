"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema"; // 🛠️ Added Chapters here
import { eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialouge from "../_components/LoadingDialouge";
import { fetchYouTubeVideos } from "@/configs/Service";
import { useRouter } from "next/navigation"; // ✅ App router fix

const CourseLayout = ({ params }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (params?.courseId) {
      getCourse();
    }
  }, [params]);

  const getCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, params?.courseId));
    if (result.length > 0) {
      setCourse(result[0]);
    }
    console.log("📦 Fetched Course:", result[0]);
  };

  const GenerateChapterContent = async () => {
    if (!course) return;

    const chapters = course?.courseOutput?.chapters;
    if (!chapters || chapters.length === 0) return;

    setLoading(true);

    for (let index = 0; index < chapters.length; index++) {
      const chapter = chapters[index];

      const PROMPT = `Explain the concept in detail on Topic: ${course?.name}, Chapter: ${chapter?.chapterName} in JSON format with fields: title, description (in detail), and code example (HTML code format if applicable).`;

      console.log(`\n🧠 Chapter ${index + 1} Prompt:\n${PROMPT}`);

      if (index < 3) {
        try {
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
          const content = await result.response.text();
          const parsedContent = JSON.parse(content);

          console.log(`✅ AI Response for Chapter ${index + 1}:\n`, parsedContent);

          const videos = await fetchYouTubeVideos(course?.name + " " + chapter?.chapterName);
          console.log("🎥 YouTube Videos:", videos);

          const videoId = videos[0]?.id?.videoId || "";
          console.log(`▶️ First Video ID for ${chapter.chapterName}:`, videoId);

          // 🧠 Save to DB
          await db.insert(Chapters).values({
            chapterId: `chapter-${index + 1}`,
            courseId: course.courseId,
            content: parsedContent,
            videoId: videoId,
          });

        } catch (error) {
          console.error(`❌ Error generating content for Chapter ${index + 1}:`, error);
        }
      }
    }

    setLoading(false);
    router.replace(`/create-course/${course?.courseId}/finish`);
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-40">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      <LoadingDialouge loading={loading} />

      <CourseBasicInfo course={course} />
      <CourseDetails course={course} />
      <ChapterList course={course} />

      <Button onClick={GenerateChapterContent} className="my-10">
        Generate Course Content...
      </Button>
    </div>
  );
};

export default CourseLayout;
