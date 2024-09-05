'use client';
import { useState } from 'react';
import { Box, Button, Container, Typography, TextField, CircularProgress } from '@mui/material';

export default function CareerPage() {
  const [resume, setResume] = useState('');
  const [careerPath, setCareerPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#121212', minHeight: '100vh', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center', bgcolor: '#1e1e1e', borderRadius: '20px', padding: 4, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)' }}>
        <Typography variant="h3" gutterBottom sx={{
          fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', color: '#ffffff', letterSpacing: '2px',
          textShadow: '0 0 15px rgba(255, 255, 255, 0.6)'
        }}>
          Career Recommendation
        </Typography>
        
        <form>
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
        input: { color: '#ffffff' }, 
        '& .MuiInputBase-input::placeholder': { color: '#ffffff' }, 
          '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: '#e91e63' },
            '&:hover fieldset': { borderColor: '#c2185b' }, 
            '&.Mui-focused fieldset': { borderColor: '#e91e63' }, 
          },
        }}
      />

          <Button type="submit" disabled={loading} variant="contained" sx={{
            backgroundColor: '#e91e63', color: 'white', textTransform: 'none', fontWeight: 'bold', borderRadius: '25px',
            padding: '10px 40px', boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
            ':hover': { backgroundColor: '#c2185b', boxShadow: '0 8px 25px rgba(233, 30, 99, 0.6)' }
          }}>
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Get Recommendation'}
          </Button>
        </form>

        {error && <Typography sx={{ color: 'red', marginTop: 2 }}>{error}</Typography>}

        {careerPath && (
          <Box sx={{ textAlign: 'center', marginTop: 4, bgcolor: '#2c2c2c', padding: 3, borderRadius: '12px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)' }}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#e91e63' }}>
              Recommended Career Path
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2, color: '#ffffff' }}>Title: {careerPath.title}</Typography>
            <Typography sx={{ color: '#bbbbbb' }}>Description: {careerPath.description}</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
