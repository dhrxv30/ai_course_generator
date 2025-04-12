// app/api/courses/[courseId]/chapters/route.js
import { db } from "@/configs/db";
import { Chapters } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const courseId = params.courseId;
    console.log("API: Fetching chapters for course", courseId);
    
    const chapters = await db.select().from(Chapters).where(eq(Chapters.courseId, courseId));
    console.log(`API: Found ${chapters.length} chapters`);
    
    // Make sure each chapter has at least a minimal content structure
    const processedChapters = chapters.map((chapter, index) => {
      if (!chapter.content) {
        chapter.content = { 
          title: `Chapter ${index + 1}`,
          description: "No description available"
        };
      }
      return chapter;
    });
    
    return NextResponse.json(processedChapters);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}