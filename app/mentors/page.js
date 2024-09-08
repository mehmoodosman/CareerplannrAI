'use client';
import {
    Box,
    Grid,
    Typography,
  } from '@mui/material'

import { useState, useEffect, useRef } from "react";

const careerPath = {
    title: 'Senior Product Manager',
    description: `Senior Product Managers are responsible for overseeing the development 
    and success of a product throughout its lifecycle, from ideation to launch and beyond.`,
    skills: ['Programming languages', 'Software development', 'Version control', 'Project management', 
        'Team collaboration'],
    responsibilities: `The primary responsibilities include leading product development 
    lifecycles, defining product vision and scope, conducting market research, overseeing marketing strategies, 
    and collaborating with engineering and design teams.`,
    outlook: `The outlook for Senior Product Managers is promising, with the role offering opportunities 
    for career growth into executive positions such as Chief Product Officer or VP of Product.`,
    strengths: `John's experience in leading product development at various levels, 
    conducting market research, and driving product success align well with the responsibilities of a Senior Product
     Manager. Additionally, his strong technical background and leadership skills make him a suitable candidate 
    for this role.`,
    weaknesses: `John may benefit from further honing skills in UI/UX design, data analytics, 
    and Agile methodologies to enhance their product management capabilities.`
}

const sample = [
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

export default function Mentors() {
    const [mentors, setMentors] = useState({})
    


    return ( <>
          {mentors && mentors.length > 0 && (
            <Grid item>
              <Typography variant='h4' color={coral} gutterBottom>Top {mentors?.length} Mentors</Typography>
              <Box p={2}>
                {mentors?.map((mentor, index) => (
                  <Box key={index} p={2} m={1} sx={{borderRadius: 4, border: '1px solid #ccc', backgroundColor: 'white'}}>
                    <Typography variant='body1' color={green} fontWeight={700}>{mentor.name}</Typography>
                    <Typography variant='body2'>{mentor.title}</Typography>
                    <Typography variant='body2'>{mentor.company}</Typography>
                    <Typography variant='body2'>{mentor.email}</Typography>
                    <Typography variant='body2'>
                    { mentor.tech_stacks
                        .map((stack) => stack.split(':')[0].trim())  // Extract the tech names
                        .join(', ')  // Join the stack names into a single string
                    }
                    </Typography>

                    <Typography variant='body2'>{mentor.comment}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          )}
    </> )
}