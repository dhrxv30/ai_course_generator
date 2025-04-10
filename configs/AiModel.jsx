const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  // const fs = require("node:fs");
  // const mime = require("mime-types");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [
    ],
    responseMimeType: "application/json",
  };
  

    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a Course Tutorial on Following Details with field as course Name , Description, along with chapter name , about: Category:'Programming', Topic:'Python', Level:'begineer', NoOfChapters\"5 in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Here's a thinking process that could lead to the JSON course structure:\n\n1.  **Understand the Request:** The user wants a JSON structure representing a beginner Python programming course. Key requirements are:\n    *   JSON format.\n    *   Fields: `courseName`, `description`.\n    *   Nested structure for `chapters`.\n    *   Each chapter needs a `chapterName` and `about` (description).\n    *   Specific details: Category 'Programming', Topic 'Python', Level 'Beginner', Number of Chapters '5'.\n\n2.  **Identify the Main JSON Structure:** The top level needs to be a JSON object `{}`. This object will contain the main course details and the list of chapters.\n\n3.  **Define Top-Level Fields:** Based on the request, the top-level fields are:\n    *   `courseName`: A descriptive name for the course. Something like \"Introduction to Python Programming\" or \"Python for Beginners\". Let's go with \"Python for Absolute Beginners\".\n    *   `description`: A short explanation of what the course covers and who it's for. It should mention the target audience (beginners) and the goal (learning fundamental Python concepts).\n    *   `category`: Directly from the request: \"Programming\".\n    *   `topic`: Directly from the request: \"Python\".\n    *   `level`: Directly from the request: \"Beginner\".\n    *   `numberOfChapters`: Directly from the request: 5. (Though the structure will implicitly show 5 chapters, including this field explicitly matches the request).\n    *   `chapters`: This will be an array `[]` containing the chapter objects.\n\n4.  **Plan the Chapters (Content Strategy):** Since it's a 5-chapter beginner course, the content needs a logical progression.\n    *   **Chapter 1: Introduction:** Start with the absolute basics. What is Python? Why learn it? How to set it up? First simple program (\"Hello, World!\").\n    *   **Chapter 2: Core Data Types & Variables:** Introduce fundamental building blocks: numbers, strings, booleans. How to store data using variables. Basic operations.\n    *   **Chapter 3: Basic Data Structures:** Move to collections of data. Lists are essential for beginners. Maybe touch on tuples briefly. How to access and manipulate items.\n    *   **Chapter 4: Control Flow:** How to make decisions (if/elif/else) and repeat actions (for/while loops). This is crucial for writing non-trivial programs.\n    *   **Chapter 5: Functions:** Introduce modularity. How to define and call functions. Basic concepts like parameters and return values. Why functions are important.\n\n5.  **Define the Chapter Structure:** Each element within the `chapters` array will be a JSON object `{}`. Based on the request, each chapter object needs:\n    *   `chapterNumber`: Although not explicitly requested, adding a number helps maintain order and clarity (e.g., 1, 2, 3, 4, 5).\n    *   `chapterName`: A concise title for the chapter based on the content planned in step 4.\n    *   `about`: A short description of what the student will learn in that specific chapter.\n\n6.  **Flesh out Each Chapter Object:** Now, combine steps 4 and 5.\n\n    *   **Chapter 1:**\n        *   `chapterNumber`: 1\n        *   `chapterName`: \"Getting Started with Python\"\n        *   `about`: \"Introduction to Python, setting up the environment (installation, IDEs/editors), and writing your very first 'Hello, World!' program.\"\n    *   **Chapter 2:**\n        *   `chapterNumber`: 2\n        *   `chapterName`: \"Variables and Basic Data Types\"\n        *   `about`: \"Learn about fundamental data types like integers, floats, strings, and booleans. Understand how to store data using variables and perform basic operations.\"\n    *   **Chapter 3:**\n        *   `chapterNumber`: 3\n        *   `chapterName`: \"Introduction to Lists\"\n        *   `about`: \"Explore your first data structure: lists. Learn how to create lists, access elements, add/remove items, and perform common list operations.\"\n    *   **Chapter 4:**\n        *   `chapterNumber`: 4\n        *   `chapterName`: \"Control Flow: Making Decisions and Repeating Code\"\n        *   `about`: \"Understand how to control the flow of your program using conditional statements (if, elif, else) and loops (for, while).\"\n    *   **Chapter 5:**\n        *   `chapterNumber`: 5\n        *   `chapterName`: \"Introduction to Functions\"\n        *   `about`: \"Learn how to write reusable blocks of code using functions. Understand defining functions, calling functions, parameters, and return values.\"\n\n7.  **Assemble the Final JSON:** Combine the top-level fields and the array of chapter objects into a single JSON structure. Ensure correct syntax (curly braces for objects, square brackets for arrays, commas between elements, quotes around keys and string values).\n\n8.  **Review and Validate:** Read through the generated JSON.\n    *   Is it valid JSON? (Check commas, brackets, braces, quotes).\n    *   Does it meet all the user's requirements? (Fields, category, topic, level, number of chapters, nested structure).\n    *   Is the content logical for a beginner Python course?\n    *   Are the descriptions clear and concise?\n\n    *Self-Correction during review*: Initially, I might have forgotten the `numberOfChapters` field requested explicitly, so I'd add it in. Or maybe the chapter descriptions were too vague, so I'd refine them. I also decided to add `chapterNumber` for better structure, even though it wasn't strictly required by the prompt. I'll ensure the number of chapters in the array matches the `numberOfChapters` field.\n\nThis systematic process ensures all requirements are met, the structure is correct, and the content is logical and appropriate for the specified level."},
            {text: "```json\n{\n  \"courseName\": \"Python for Absolute Beginners\",\n  \"description\": \"Start your programming journey with Python! This course covers the fundamental concepts of Python programming, requiring no prior coding experience. Learn syntax, data types, control flow, and basic problem-solving techniques.\",\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Beginner\",\n  \"numberOfChapters\": 5,\n  \"chapters\": [\n    {\n      \"chapterNumber\": 1,\n      \"chapterName\": \"Introduction to Python and Setup\",\n      \"about\": \"What is Python? Why learn it? Setting up your development environment (installing Python, choosing an editor/IDE), and writing your first simple 'Hello, World!' program.\"\n    },\n    {\n      \"chapterNumber\": 2,\n      \"chapterName\": \"Variables, Data Types, and Operators\",\n      \"about\": \"Learn how to store information using variables. Explore fundamental data types like integers, floats, strings, and booleans. Understand basic arithmetic and comparison operators.\"\n    },\n    {\n      \"chapterNumber\": 3,\n      \"chapterName\": \"Basic Data Structures: Lists\",\n      \"about\": \"Introduction to collections of data using Lists. Learn how to create lists, access elements using indexing, add/remove items, and iterate through list elements.\"\n    },\n    {\n      \"chapterNumber\": 4,\n      \"chapterName\": \"Control Flow: Conditional Statements and Loops\",\n      \"about\": \"Learn how to make decisions in your code using 'if', 'elif', and 'else' statements. Understand how to repeat actions using 'for' and 'while' loops.\"\n    },\n    {\n      \"chapterNumber\": 5,\n      \"chapterName\": \"Introduction to Functions\",\n      \"about\": \"Discover how to write reusable blocks of code using functions. Learn how to define your own functions, pass arguments (parameters), and return values to make your code more organized and efficient.\"\n    }\n  ]\n}\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Generate a Course Tutorial on Following Details with field as course Name , Description, along with chapter name , about: Category:'Programming', Topic:'Python', Level:'begineer', Duration:2 hours,NoOfChapters\"5 in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "The user wants a JSON object representing a Python beginner course tutorial.\nThe JSON object needs the following top-level fields:\n- `courseName`: A suitable name for a beginner Python course.\n- `description`: A brief overview of the course content and target audience.\n- `category`: Provided as 'Programming'.\n- `topic`: Provided as 'Python'.\n- `level`: Provided as 'Beginner'.\n- `duration`: Provided as '2 hours'.\n- `numberOfChapters`: Provided as 5.\n- `chapters`: An array of chapter objects.\n\nEach chapter object within the `chapters` array needs:\n- `chapterNumber`: The sequential number of the chapter (1 to 5).\n- `chapterName`: A relevant name for the chapter's content.\n- `about`: A short description of what the chapter covers.\n\nThe chapter content should logically progress for a beginner Python course and be feasible to cover within a roughly 2-hour total duration (meaning each chapter is relatively short, focusing on core concepts).\n\nPlan:\n1.  Define the main course details (`courseName`, `description`, `category`, `topic`, `level`, `duration`, `numberOfChapters`).\n2.  Create an array for `chapters`.\n3.  For each of the 5 chapters:\n    *   Assign `chapterNumber`.\n    *   Define a concise `chapterName` appropriate for a beginner level and a short duration.\n    *   Write a brief `about` description for each chapter, keeping the 2-hour total duration in mind (focus on essentials).\n    *   Chapter 1: Setup, \"Hello World\", basic concepts.\n    *   Chapter 2: Variables, Data Types (int, float, str, bool), simple input/output.\n    *   Chapter 3: Basic Operators (arithmetic, comparison), Intro to Lists (creation, indexing).\n    *   Chapter 4: Control Flow (if/else statements, simple loops like `for`).\n    *   Chapter 5: Introduction to Functions (defining basic functions, calling them).\n4.  Assemble these parts into the final JSON structure.\n5.  Ensure the JSON is well-formatted and valid."},
            {text: "```json\n{\n  \"courseName\": \"Python Quickstart for Beginners\",\n  \"description\": \"A fast-paced introduction to Python programming fundamentals. This 2-hour course covers the absolute basics, from setting up your environment to writing simple scripts with variables, conditions, and loops. Ideal for those with no prior coding experience looking for a quick overview.\",\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Beginner\",\n  \"duration\": \"2 hours\",\n  \"numberOfChapters\": 5,\n  \"chapters\": [\n    {\n      \"chapterNumber\": 1,\n      \"chapterName\": \"Getting Started with Python\",\n      \"about\": \"Introduction to Python, setting up the Python interpreter and a simple code editor. Writing and running your first basic Python script ('Hello, World!'). Understanding basic syntax.\"\n    },\n    {\n      \"chapterNumber\": 2,\n      \"chapterName\": \"Variables and Basic Data Types\",\n      \"about\": \"Learn how to store data using variables. Introduction to core data types: integers, floating-point numbers, strings, and booleans. Simple input and output operations.\"\n    },\n    {\n      \"chapterNumber\": 3,\n      \"chapterName\": \"Operators and Introduction to Lists\",\n      \"about\": \"Explore basic arithmetic (+, -, *, /) and comparison operators (==, !=, <, >). Introduction to lists for storing ordered collections of items and accessing elements.\"\n    },\n    {\n      \"chapterNumber\": 4,\n      \"chapterName\": \"Making Decisions and Repeating Code\",\n      \"about\": \"Learn to control the flow of your program using conditional 'if' and 'else' statements. Introduction to 'for' loops for iterating over sequences like lists.\"\n    },\n    {\n      \"chapterNumber\": 5,\n      \"chapterName\": \"Defining Simple Functions\",\n      \"about\": \"Understand the concept of functions for code reusability. Learn how to define a basic function and call it to execute a block of code.\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // // TODO: Following code needs to be updated for client-side apps.
    // const candidates = result.response.candidates;
    // for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    //   for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
    //     const part = candidates[candidate_index].content.parts[part_index];
    //     if(part.inlineData) {
    //       try {
    //         const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
    //         fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
    //         console.log(`Output written to: ${filename}`);
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     }
    //   }
    // }
    // console.log(result.response.text());

  
