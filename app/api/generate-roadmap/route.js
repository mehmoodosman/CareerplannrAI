import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const roadmapSystemPrompt = `
You are a career coach who provides a detailed roadmap for a person to achieve success in a given career. Given the received career title data, generate a roadmap that includes:
1. Key steps to reach the career goal.

The format of the response should be JSON as follows:
{
  "steps": ["Step 1", "Step 2", ...]
}
`;

export async function POST(request) {
    const openai = new OpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",
    });

    try {
        const data = await request.json();
        console.log("Received data:", data);

        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: roadmapSystemPrompt },
                { role: 'user', content: JSON.stringify(data) },
            ],
            model: 'gpt-3.5-turbo',
        });


        console.log("OpenAI response:", completion);

       
        const content = completion.choices[0].message.content;
        console.log("Message content:", content);

        
        const roadmap = JSON.parse(content);

        return NextResponse.json(roadmap);
    } catch (error) {
        console.error("Error during API request:", error.message);
        console.error("Stack trace:", error.stack);
        return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
    }
}
