import { NextResponse } from "next/server"
import { OpenAI } from "openai"

const systemprompt = `
You are tasked with extracting structured information from resumes. 
Focus on capturing key details, ensuring the output is organized 
into clearly defined sections. 

The sections you should identify and extract are:

Personal Information:
Name
Email
Phone Number (if available)
Links (LinkedIn, GitHub, Portfolio, or other personal links)

Skills:
Technical skills (e.g., programming languages, software tools)
Soft skills (e.g., leadership, teamwork, communication)
Certifications (e.g., AWS, Google Cloud)

Experience:
Position
Company/Organization Name
Location (if available)
Dates of Employment
Key Responsibilities (focus on action verbs and quantifiable achievements)

Education:
School Name
Degree (e.g., Bachelors, Masters)
Graduation Year (if available)
Notable Accomplishments (e.g., GPA, honors, relevant coursework)
Projects (if available):

Brief Summary of the other information

Return in the following JSON format:
{
  "name": "",
  "email": "",
  "links": [],
  "skills": [],
  "experience": [
    {
      "position": "",
      "company": "",
      "location": "",
      "years": "",
      "description": ""
    }
  ],
  "education": [
    {
      "school": "",
      "degree": "",
      "courses": [],
      "graduationYear": "",
      "accomplishments": [],
      "honors": [],
      "gpa": ""
    }
  ],
}
`

const openai = new OpenAI()

export async function POST(req) {
    
    const data = await req.text()

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemprompt,
                },
                {
                    role: 'user',
                    content: data,
                }
            ],
            model: 'gpt-4o',
            temperature: 0.1,
            // max_tokens: 1000,
            stream: false,
            response_format: {type: 'json_object'},
        })
    
        console.log("Processing request for the parser model: ")
        const resumeJSON = JSON.parse(completion.choices[0].message.content)
        console.log("Json object successfully created with length: ", resumeJSON)
    
        return NextResponse.json(resumeJSON)

    }
    catch (err) {
        return NextResponse.json({error: 'Failed to generate flashcards'},{status: 500})
    }

}










/* Start ================================================================================================================= 
    Add this function to the request handler
-----------------------------------------------------------------
 
import { useState, useEffect } from 'react';

const [parsedData, setParsedData] = useState('')

  // PARSER: Convert loaded data to JSON format
  useEffect(() => {
    if (!loadedData) return;  // Don't try to parse if there's no data

    const parseToJSON = async () => {
      try {
        const response = await fetch('/api/parser', {
          method: 'POST',
          body: JSON.stringify(loadedData),  // Ensure the loadedData is in a suitable format
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to generate JSON');
        }

        const parsedData = await response.json();
        setParsedData(parsedData);
      } catch (error) {
        console.error('Error generating JSON:', error);
      }
    };

    parseToJSON();
  }, [loadedData]);  // Trigger parseToJSON whenever loadedData changes


/* End ================================================================================================================= */