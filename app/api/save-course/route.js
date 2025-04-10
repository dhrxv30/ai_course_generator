import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, courseInput, courseLayout } = body;

    await db.insert(CourseList).values({
      courseId: id,
      name: courseInput?.topic,
      difficulty: courseInput?.difficulty,
      Category: courseInput?.Category,
      courseOutput: courseLayout,
      createdBy: "test-user", // Replace with real user if auth is added
      userName: "Test User",
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("DB insert error:", error);
    return Response.json({ success: false, error: error.message });
  }
}
