import axios from "axios";

// YouTube API Config
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

// Gemini API Config
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// 🔹 Fetch YouTube videos based on a query
export const fetchYouTubeVideos = async (query, maxResults = 5) => {
  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults:1,
        key: YOUTUBE_API_KEY,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};

// 🔹 Generate chapter content using Gemini
export const generateChapterContent = async (topic, chapter) => {
  const prompt = `
You are an expert educator creating course content.

Generate a structured JSON with the following keys:
- "title": a short engaging title for the chapter
- "description": a concise 2-3 sentence summary of the chapter
- "codeExample": a relevant and beginner-friendly Python code snippet (wrapped inside a <pre><code>...</code></pre> block)
- "keyPoints": 3-5 bullet points summarizing the key takeaways
- "quiz": 3 beginner-friendly multiple choice questions, each with 4 options and one correct answer marked

Topic: ${topic}
Chapter: ${chapter}

Respond ONLY with a valid JSON object.
`;

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const textResponse = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return JSON.parse(textResponse);
  } catch (error) {
    console.error("Error generating chapter content with Gemini:", error);
    return null;
  }
};
