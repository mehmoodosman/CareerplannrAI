import {NextResponse} from 'next/server'
import {Pinecone} from '@pinecone-database/pinecone'
import OpenAI from 'openai'

const systemprompt = `
You are a career mentor generator tasked with recommending suitable mentors 
for a job candidate. Follow these steps:

Analyze the provided job title, skills, job description, 
and years of experience of the candidate.
<thinking> Document step by step how you identify the mentors based on alignment 
with the candidate’s field, skills, and career goals.
Generate at least three mentor recommendations, including their name, job title, 
company, and email.
Include a comment explaining why each mentor is a good fit for the candidate’s 
career advancement.

Output your response in the following JSON format:
{
  "mentors": [
    {
      "name": "string",
      "title": "string",
      "company": "string",
      "email": "email string",
      "comment": "string"
    },
    {
      "name": "string",
      "title": "string",
      "company": "string",
      "email": "email string",
      "comment": "string"
    },
    {
      "name": "string",
      "title": "string",
      "company": "string",
      "email": "email string",
      "comment": "string"
    }
  ]
}

One shot example:
Step-by-step approach (<thinking>):

Analyze the Job Title: Identify industry leaders or experienced professionals who have expertise in the candidate’s desired job field.
Evaluate Skills: Focus on mentors who excel in the candidate’s key skill areas (e.g., AI/ML, front-end development, optimization, etc.). These mentors should offer specific technical guidance and skill-building opportunities.
Match with Job Description: Look for mentors whose current responsibilities or projects align with the candidate’s long-term goals, offering insights into the day-to-day realities of those roles.
Consider Experience Level: Ensure mentors are more experienced but not too far ahead, so they can relate to the candidate’s current challenges while providing actionable advice.
Mentor Recommendations:
{
  "mentors": [
    {
      "name": "Alice Kim",
      "title": "Lead Machine Learning Engineer",
      "company": "OpenAI",
      "email": "alice.kim@openai.com",
      "comment": "Alice has extensive experience with generative AI and neural networks, which aligns with the candidate's AI/ML focus. She can provide deep insights into working with transformers and embedding systems."
    },
    {
      "name": "David Chen",
      "title": "Senior Frontend Engineer",
      "company": "Google",
      "email": "david.chen@google.com",
      "comment": "David has a strong background in front-end development and has worked with JavaScript, Next.js, and React, all of which match the candidate's current technical stack. He can offer advice on advancing in frontend roles and leading front-end projects."
    },
    {
      "name": "Jessica Patel",
      "title": "AI Ethics Researcher",
      "company": "DeepMind",
      "email": "jessica.patel@deepmind.com",
      "comment": "Jessica specializes in responsible AI and ethics, aligning with the candidate's goal of building ethical AI systems. She can help the candidate navigate the challenges of implementing responsible AI in practice."
    }
  ]
}

`

const pc = new Pinecone({
    apiKey: process.env.PINECODE_API_KEY,
})
const index = pc.index("rmp-ai").namespace('ns1')
const openai = new OpenAI()

export async function POST(req) {
    // Instantiate clients
    const pc = new Pinecone({
        apiKey: process.env.PINECODE_API_KEY,
    })
    const index = pc.index("rmp-ai").namespace('ns1')
    const openai = new OpenAI()

    try {
     
        // Step 1: READ DATA - Extract the user's query from the request body.
        console.log('Received query:', req)
        const data = await req.json()
    } catch (error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        return NextResponse.json('Error processing request ', { error: error.message }, { status: 500 });
    }


}