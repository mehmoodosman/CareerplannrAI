'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Box, Button, Container, Divider, Paper, Stack, Typography, TextField, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import Image from 'next/image';
import Footer from "@/components/Footer";
import BoltIcon from '@mui/icons-material/Bolt';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import HandymanIcon from '@mui/icons-material/Handyman';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CareerPage() {
  const [resume, setResume] = useState('');
  const [careerPath, setCareerPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null)

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: resume,
      });

      if (!response.ok) {
        console.error('Network error: ' + response)
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('API response:', data);
      setCareerPath(data.careerpath[0]);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const selectedFile = event.target.files[0];
    console.log(`Uploading ${selectedFile}`);
    if (selectedFile) {
      setFile(selectedFile);
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile); // Change file to selectedFile instead of file state

      const response = await fetch(`/api/loader`, {
        method: "POST",
        body: formData,
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Error fetching file`);
      }

      const data = await response.json();
      console.log("loader response: ", data);
      
      // Assuming `pageContent` is the text content of the file
      const loadedContent = data.map((page) => page.pageContent).join('\n'); // Combine all pages
      setResume(loadedContent); // Set the resume content to be displayed in the TextField

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Box sx={{ flexGrow: 1, bgcolor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
      <Container maxWidth="md" sx={{ bgcolor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
        <Box sx={{
            mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
        {/* Home Icon */}
        <Button onClick={() => router.push('/')} sx={{ mb: 4 }}>
          <Image 
              src="/CareerSwipe.svg"  
              alt="CareerSwipe Logo"
              width={100}  
              height={100}
              style={{ objectFit: 'contain', cursor: 'pointer' }}
          />
        </Button>
        <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold', textShadow: '0 0 10px #e91e63' }}>
            Career Recommendation
        </Typography>
          <Paper sx={{ p: 4, width: '100%', bgcolor: '#2c2c2c', borderRadius: '8px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <TextField
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste resume text here"
              multiline
              rows={8}
              variant="outlined"
              sx={{
                bgcolor: '#2c2c2c',
                width: '100%',
                borderRadius: '8px',
                color: '#ffffff',
                '& .MuiInputBase-input': {
                  color: '#ffffff', 
                },
                '& .MuiInputBase-input::placeholder': { color: '#ffffff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e91e63' },
                  '&:hover fieldset': { borderColor: '#c2185b' },
                  '&.Mui-focused fieldset': { borderColor: '#e91e63' },
                },
              }}
            />
            <Typography align='center' color='#d81b60' gutterBottom>
                --- or ---
            </Typography>
            <Box mb={6} display='flex' justifyContent='center'>
                {/* Button with file upload */}
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{
                        backgroundColor: '#d81b60',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#c2185b', // Slightly darker shade for hover effect
                        }
                    }}
                >
                Upload resume
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleUpload}
                />
              </Button>
            </Box>

            <Button 
              type="submit"
              fullWidth
              disabled={!resume.trim()} 
              variant="contained" 
              sx={{
                bgcolor: '#e91e63',
                color: '#ffffff',
                borderRadius: '25px',
                ':hover': { bgcolor: '#d81b60' },
                ':disabled': { bgcolor: '#b0bec5', color: '#ffffff' }
            }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'GET RECOMMENDATION'}
            </Button>
          </form>
          </Paper>
        </Box>

        {error && <Typography sx={{ color: 'red', marginTop: 2 }}>{error}</Typography>}

{careerPath && (
  <Box sx={{ textAlign: 'center', margin: 2, bgcolor: '#2c2c2c', padding: 3, borderRadius: '12px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)' }}>
    <Typography variant="h5" fontWeight="bold" sx={{ color: '#e91e63' }} gutterBottom>
      Recommended Career Path
    </Typography>
    <Typography variant="subtitle" sx={{ color: '#e91e63' }} gutterBottom> for {careerPath.name}</Typography>
    <Typography variant="h6" sx={{ marginTop: 4, color: '#ffffff' }}>Title: {careerPath.title}</Typography>
    <Box sx={{ textAlign: 'left', paddingBottom: 2,}}>
      <Typography sx={{ color: '#bbbbbb', textAlign: 'center', marginBottom: 4, marginX: 4 }} gutterBottom>
        {careerPath.description}
      </Typography>
      <Stack direction='row' >
        <HandymanIcon sx={{ color: '#bbb' }} />
        <Typography sx={{ color: '#bbbbbb', paddingLeft: 2}} gutterBottom> 
          {careerPath.skills}
        </Typography>
      </Stack>
      <Stack direction='row' >
        <CallMissedOutgoingIcon />
        <Typography sx={{ color: '#bbbbbb', paddingLeft: 2}} gutterBottom> 
          {careerPath.outlook}
        </Typography>
      </Stack>
      <Stack direction='row' >
        <BoltIcon sx={{ color: '#bbb' }} />
        <Typography sx={{ color: '#bbbbbb', paddingLeft: 2}} gutterBottom> 
          {careerPath.strengths}
        </Typography>
      </Stack>
      <Stack direction='row' >
        <BrokenImageOutlinedIcon />
        <Typography sx={{ color: '#bbbbbb', paddingLeft: 2}} gutterBottom> 
          {careerPath.weaknesses}
        </Typography>
      </Stack>
    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 14, marginRight: 1 }}>Get detailed report</Typography>
      <Link href='/report' ><ArrowForwardRoundedIcon sx={{ color: '#e91e63' }} /></Link>
    </Box>

  </Box>
)}

        <Footer />
      </Container>
    </Box>
    </> 
  );
}



