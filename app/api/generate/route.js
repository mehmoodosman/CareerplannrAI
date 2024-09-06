import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard generator specialized in creating career path recommendations based on a user's experience and skill set. You will receive a text description of the user's professional background and skillset, and your task is to generate 10 flashcards. Each flashcard should suggest a relevant job title on the front and provide a brief personalized explanation on the back detailing why the user is a good fit for that role based on their experience and skills.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req){
    const openai = new OpenAI(process.env.OPENAI_API_KEY)
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: systemPrompt},
            {role: "user", content: data}
        ],
        model: "gpt-4o-mini",
        response_format: {type: 'json_object'},
    })
    
    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)
}