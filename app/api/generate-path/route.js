
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Define systemPrompt
const systemPrompt = `
You are a career coach who looks at a candidate’s resume and recommends a job title. Your task is to provide one best-suited career title based on the candidate’s experience and skills on the resume along with a brief description of the best-suited career based on the candidate’s skills and experience on the resume. Each entry should include:
1. A career title.
2. A concise description of the career that highlights its primary responsibilities, required skills, and potential career outlook.

The goal is to offer a clear and informative description and a fitting job title.
1. Conciseness: Keep descriptions brief and to the point to provide a quick overview.
2. Clarity: Use straightforward language to ensure the information is easily understood.
3- 

Return the list in the following JSON format:
{
    "careerpath":[
        {
            "title": "str",
            "description": "str"
        }
    ]
};
If users other information other than resume and relating to experience use this JSON format:
{
    "careerpath": [
      {
        "title": "N/A",
        "description": "Please provide more information about the candidate's experience and skills for job title recommendations."
      }
    ]
  }
  
Respond with JSON only. Never include any extra characters,  non-whitespace characters, comments, or explanations.
`;

export async function POST(req) {
    const openai = new OpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",
    });

    try {
        const data = await req.text();

        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: data },
            ],
            model: 'openai/gpt-3.5-turbo',
        });

const careerpath = JSON.parse(completion.choices[0].message.content);

return NextResponse.json(careerpath);

} catch (error) {
console.error("Error during API request:", error.message);
console.error("Stack trace:", error.stack);
return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
}
}