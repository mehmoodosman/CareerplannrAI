'use client'
import {Box, Card, CardContent, CardHeader, Chip, Avatar, Collapse, Button, Divider, Stack, CardActions, 
    Container, Grid, Grid2, CardMedia, Typography, Paper
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import BoltIcon from '@mui/icons-material/Bolt';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import HandymanIcon from '@mui/icons-material/Handyman';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Face2Icon from '@mui/icons-material/Face2';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import PaidIcon from '@mui/icons-material/Paid';

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

const mentors = [
    {"name": "Alice Johnson",
    "title": "Software Engineer",
    "company": "TechCorp Inc.",
    "duration": "3 years"
    },
    {"name": "Michael Smith",
    "title": "Marketing Manager",
    "company": "Creative Media Co.",
    "duration": "5 years"
    },
    {"name": "Laura Brown",
    "title": "Project Manager",
    "company": "BuildRight Construction",
    "duration": "4 years"
    },
]

const steps = [
    'Step 1: Gain a strong foundation in computer science by completing a degree in Computer Science',
    'Step 2: Learn front-end development technologies such as HTML, CSS, and JavaScript.',
    'Step 3: Get proficient in back-end development by learning languages like Node.js, Python, or Java',
    'more to come'
]

export default function Report() {
    function handleSave () {
        console.log('TODO: Implement this')
    }

    function handleDelete () {
        console.log('TODO: Implement this')
    }

    return (
        <>
<Container maxWidth="lg">
    <Typography variant="h1" color='#bbb'>This is a sample</Typography>

      {/* Action container */}
      <Box 
        display="flex" 
        justifyContent="flex-end" 
        spacing={5} 
        sx={{ padding: 2, mb: 2 }}
        >
            <Button
                component="label"
                onClick={handleSave}
                variant="contained"
                endIcon={<SaveIcon />}
                sx={{
                    mr: 2,
                    backgroundColor: '#d81b60',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#c2185b', // Slightly darker shade for hover effect
                    }
                }}
            > Save </Button>

            <Button
                component="label"
                onClick={handleDelete}
                variant="contained"
                endIcon={<DeleteIcon />} 
                sx={{
                    mr: 2,
                    backgroundColor: '#d81b60',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#c2185b', // Slightly darker shade for hover effect
                    }
                }}
            > Delete </Button>
        </Box>

      {/* Top Container */}
      <Box sx={{mt:2, mb: 4 }}>
        <Grid container spacing={2}>
          {/* Top Left Box */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
                height: 200, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                padding: 4,
                borderRadius: '20px',
                bgcolor: '#c2185b',
                color: '#ffffff',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 25px rgba(0, 0, 0, 0.5)' }
            }}>
                <CardContent>
                <Typography variant="h4" color="white" align="center">
                    {careerPath.title}
                </Typography>
                </CardContent>
            </Card>
          </Grid>
          {/* Right Box */}
          <Grid item xs={12} md={8}>
            <Card sx={{ 
                    height: 200, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',

                    padding: 4,
                    borderRadius: '20px',
                    bgcolor: '#2c2c2c',
                    color: '#ffffff',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 25px rgba(0, 0, 0, 0.5)' }
                }}>

                <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: '#c2185b', }}>
                    Description
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }} gutterBottom>
                {careerPath.description}
                </Typography>
                <Stack direction="row" spacing={1} marginTop={3}>
                    {
                        careerPath.skills.slice(0,4).map((skill, index) => (
                        <Chip key={index} label={skill} variant="outlined" sx={{color: '#bbb'}}/>
                        ))
                    }
                    
                </Stack>
                </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Middle Container */}
      <Box sx={{mt:2, mb: 2 }}>
      <Grid container spacing={2}>
        {/* Left Box */}
        <Grid item xs={12} md={4}>
          <Stack
            sx={{
              height: '100%',
            }}
          >
            {/* Top of Left Box (4/5 height) */}
            <Card
            sx={{
                height: 250,
                flexGrow: 4, // Occupies 4/5 of the available height if needed
                display: 'flex',

                marginBottom: 1,
                borderRadius: '20px',
                bgcolor: '#2c2c2c',
                color: '#ffffff',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 25px rgba(0, 0, 0, 0.5)' }
            }} >

            
            <CardContent>
                <Typography variant="h6" sx={{ textAlign: 'left', mb: 2, color: '#c2185b', }}>
                    Employment Outlook
                </Typography>
                <CardMedia
                    component="img"
                    height="194"
                    image="/presentation.png"
                    alt="projection"
                />

                <Stack
                sx={{
                    minHeight: 200,
                }}>
                <Typography variant="h6" color="white">
                Left Top Box
                </Typography>
                </Stack>
            </CardContent>
            </Card>

            {/* Bottom of Left Box (1/5 height) */}
            <Card
              sx={{
                flexGrow: 1, // Occupies 1/5 of the available height
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50px', // Ensures the bottom box fits the content
                textAlign: 'center',
                borderRadius: '20px',
                bgcolor: '#2c2c2c',
                color: '#ffffff',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 25px rgba(0, 0, 0, 0.5)' }

              }}
            >
                <Box display="flex" align='left'>
                    <PaidIcon sx={{ mr: 1, color: '#e91e63' }} />
                    <Typography sx={{  fontSize: 14, }} color="white">
                        Annual average salary: $ xx,000.00
                    </Typography>
                </Box>
                
            </Card>
          </Stack>
        </Grid>

        {/* Middle Box */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
            height: 310,
            display: 'flex',

            borderRadius: '20px',
            bgcolor: '#2c2c2c',
            color: '#ffffff',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 25px rgba(0, 0, 0, 0.5)' }
          }}>
            <CardContent>
            <Typography variant="h6" sx={{ textAlign: 'left', mb: 2, color: '#c2185b', }}>
                Road Map
            </Typography>
            <CardMedia
                component="img"
                height="520"
                image="/plan.jpg"
                alt="plan"
            />
            </CardContent>
          </Card>
        </Grid>

        {/* Ask-a-mentor Box */}
        <Grid item xs={12} md={4}>
            <Card
                sx={{
                height: 310,
                borderRadius: '20px',
                bgcolor: '#2c2c2c',
                color: '#ffffff',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 25px rgba(0, 0, 0, 0.5)' }
            }}>
                <CardContent>
                    <Typography variant="h6" sx={{ textAlign: 'left', mb: 2, color: '#c2185b', }}>
                    Ask a Mentor
                    </Typography>

                    {/* Display the list of possible mentors */}
                    {mentors.slice(0, 3).map(({ name, title, company, duration }, index) => (
                    <Box key={index} >
                    <Stack 
                        direction="row" 
                        spacing={2}
                        sx={{ width: '100%', alignItems: 'center', mb: 1 }} // Added full width and alignment
                    >
                        {/* <Avatar alt={name} src="" /> */}
                        <Face2Icon alt={name} />
                        <Stack direction="column" width='100%'>
                            <Typography>{name}</Typography>
                            <Typography sx={{ fontSize: 14, color: '#bbb' }}>{title} ({duration})</Typography>
                            <Typography sx={{ fontSize: 14, color: '#bbb' }}>{company}</Typography>
                        </Stack>
                        <SendIcon sx={{ color: '#bbb', fontSize: 16, cursor: 'pointer' }}/>
                        
                    </Stack>
                    <Divider sx={{mb: 1, borderBottomWidth: 2, color: 'red'}} />
                    </Box>
                    ))}
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </Box>

    {/* Bottom Container */}
    <Box sx={{mt:4, mb: 2 }}>
        <Card 
        sx={{ 

            borderRadius: '20px',
            bgcolor: '#2c2c2c',
            color: '#ffffff',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 25px rgba(0, 0, 0, 0.5)' }
        }}
        >
            <CardContent sx={{padding: 3}}>
                {/* Top-left aligned "Analysis" */}
                <Typography variant="h6" sx={{ textAlign: 'left', mb: 2, color: '#c2185b', }}>
                Analysis
                </Typography>

                {/* Stack for centered content */}
                    <Stack
                    sx={{
                        minHeight: 200,
                    }}
                    >
                    <Stack direction='row' >
                        <AssignmentTurnedInIcon sx={{ color: '#bbb' }} />
                        <Typography sx={{color: 'white', ml: 2 }} gutterBottom>
                            Responsibilities:
                        </Typography>
                    </Stack>
                    <Typography sx={{color: 'white', ml: 5,  mb: 2 }} >
                        {careerPath.responsibilities}
                    </Typography>

                    <Stack direction='row' >
                        <BoltIcon sx={{ color: '#bbb' }} />
                        <Typography sx={{color: 'white', ml: 2 }} gutterBottom>
                            Strengths:
                        </Typography>
                    </Stack>
                    <Typography sx={{color: 'white', ml: 5,  mb: 2 }} >
                        {careerPath.strengths}
                    </Typography>


                    <Stack direction='row' >
                        <BrokenImageOutlinedIcon sx={{ color: '#bbb' }}/>
                        <Typography sx={{color: 'white', ml: 2 }} gutterBottom>
                            Weaknesses:
                        </Typography>
                    </Stack>
                    <Typography sx={{color: 'white', ml: 5,  mb: 2 }} >
                        {careerPath.weaknesses}
                    </Typography>

                </Stack>
            </CardContent>
            </Card>
        </Box>
    </Container>

        </>
    )
}




