import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a career coach who helps candidates by reviewing their resume, analyzing their experience and skills, and suggesting career paths. You will receive the candidate's resume as a text input, and based on that, generate 15 flashcards. The front of each flashcard should contain a career title that is well-suited to the candidate, while the back of the flashcard should contain a brief description of the role, and an explanation of why the candidates skills and experience make them suitable for that career.

For each flashcard:

Front: Display the career title.
Back: Provide a brief description of the career and explain why it aligns with the candidates background.
Make sure the suggested roles are diverse and aligned with the candidate's strengths and experiences.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
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

const flashcards = JSON.parse(completion.choices[0].message.content);

return NextResponse.json(flashcards.flashcards);

} catch (error) {
console.error("Error during API request:", error.message);
console.error("Stack trace:", error.stack);
return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
}
}