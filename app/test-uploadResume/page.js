'use client';
import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, TextField, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import Image from 'next/image';

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

export default function InputFileUpload() {
  const [resume, setResume] = useState('');
  const [careerPath, setCareerPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null)
  const [loadedFile, setLoadedFile] = useState()

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

  useEffect(() => {
    const loadPDF = async (file) => {
      if (!file) return
      
      try{
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(`/api/loader`, {
          method: "POST",
          body: formData,
        })

        // Check if the response is okay
        if (!response.ok) {
          throw new Error(`Error fetching file`);
        }

        // Return a Document object from the response
        // Document = [{pageContent: "contents of the resume",
        //   metadata: {loc: {}, pdf: {}, source: "YasinEhsan.pdf", pageNumber: 1} }]
        const data = await response.json();
        console.log("data: ", data);
        setLoadedFile(data);
        return data;
      
      } catch(error) {
        console.error('Error fetching files:', error);
        return;
      }
    }

    // Trigger loadPDF when the file is set
    if (file) {
      loadPDF(file)
    }
  }, [file])
  

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(e.target.files[0])
      console.log("Upload: ", file)
    }

    // Store to firebase
    // TODO:

    console.log("Uploading file: ", selectedFile.name)

    // Send to generate-path
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#121212', minHeight: '100vh', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <Typography> ------ or ------</Typography>

          <Button
            component="label"

            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={handleUpload}
            />
          </Button>

          {/* Button with margin */}
          <Button 
            type="submit" 
            disabled={loading} 
            variant="contained" 
            sx={{
              backgroundColor: '#e91e63', 
              color: 'white', 
              textTransform: 'none', 
              fontWeight: 'bold', 
              borderRadius: '25px',
              padding: '10px 40px', 
              marginTop: '20px',
              boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
              ':hover': { backgroundColor: '#c2185b', boxShadow: '0 8px 25px rgba(233, 30, 99, 0.6)' }
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Get Recommendation'}
          </Button>
        </form>
    </Box>
  );
}
