import { NextResponse } from "next/server";
import OpenAI from "openai";

// Define the prompt for generating a roadmap
const roadmapSystemPrompt = `
You are a career coach who provides a detailed roadmap for a person to achieve success in a given career. Given the following career title and weaknesses, generate a roadmap that includes:
1. Key steps to reach the career goal.
2. Recommended courses or skills to improve on weaknesses.
3. Resources that will be helpful for the candidate.

The format of the response should be JSON as follows:
{
  "roadmap": {
    "steps": ["Step 1", "Step 2", ...],
    "courses": ["Course 1", "Course 2", ...],
    "resources": ["Resource 1", "Resource 2", ...]
  }
}
`;

export async function POST(req) {
  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  try {
    const { title, weaknesses } = await req.json();

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: roadmapSystemPrompt },
        { role: 'user', content: `Title: ${title}, Weaknesses: ${weaknesses}` },
      ],
      model: 'openai/gpt-3.5-turbo',
    });

    const roadmap = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(roadmap);

  } catch (error) {
    console.error("Error during roadmap generation:", error.message);
    return NextResponse.json({ error: "An error occurred while generating the roadmap." }, { status: 500 });
  }
}
