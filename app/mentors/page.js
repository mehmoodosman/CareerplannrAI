import {
    Box,
    Grid,
    Typography,
  } from '@mui/material'


export default function Mentors() {


    return ( <>
          {recommendations && recommendations.length > 0 && (
            <Grid item>
              <Typography variant='h4' color={coral} gutterBottom>Top {recommendations?.length} Candidates</Typography>
              <Box p={2}>
                {recommendations?.map((candidate, index) => (
                  <Box key={index} p={2} m={1} sx={{borderRadius: 4, border: '1px solid #ccc', backgroundColor: 'white'}}>
                    <Typography variant='body1' color={green} fontWeight={700}>{candidate.name}</Typography>
                    <Typography variant='body2'>{candidate.location}</Typography>
                    <Typography variant='body2'>
                    { candidate.tech_stacks
                        .map((stack) => stack.split(':')[0].trim())  // Extract the tech names
                        .join(', ')  // Join the stack names into a single string
                    }
                    </Typography>

                    <Typography variant='body2'>{candidate.comment}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          )}
    </> )
}