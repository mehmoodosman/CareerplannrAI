'use client';
import {
    Box,
    Grid,
    Typography,
  } from '@mui/material'

import { useState, useEffect, useRef } from "react";
export default function Mentors() {
    const [mentors, setMentors] = useState({})


    return ( <>
        Mentors
          {mentors && mentors.length > 0 && (
            <Grid item>
              <Typography variant='h4' color={coral} gutterBottom>Top {mentors?.length} Mentors</Typography>
              <Box p={2}>
                {mentors?.map((mentor, index) => (
                  <Box key={index} p={2} m={1} sx={{borderRadius: 4, border: '1px solid #ccc', backgroundColor: 'white'}}>
                    <Typography variant='body1' color={green} fontWeight={700}>{mentor.name}</Typography>
                    <Typography variant='body2'>{mentor.location}</Typography>
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