import { useState } from 'react';
import { firestore } from '../../firebase/config';  // Ensure your Firebase config is correctly set up
import { Box, TextField, Button, Typography } from '@mui/material';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    careerPreferences: '',
    skills: '',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRef = firestore.collection('users').doc(); // Creates a new document for the user
      await userRef.set(profile);
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile: ', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#121212',  
        color: '#ffffff',  
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          fontFamily: 'Roboto, sans-serif',
          marginBottom: 4,
          color: '#ffffff',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
        }}
      >
        Complete Your Profile
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          maxWidth: '500px',
          bgcolor: '#1e1e1e',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
        }}
      >
        <TextField
          fullWidth
          name="name"
          label="Name"
          variant="outlined"
          value={profile.name}
          onChange={handleChange}
          InputProps={{
            style: { color: '#ffffff' },
          }}
          InputLabelProps={{
            style: { color: '#b0b0b0' },
          }}
          sx={{
            bgcolor: '#333333',
            borderRadius: '5px',
          }}
        />
        <TextField
          fullWidth
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          value={profile.email}
          onChange={handleChange}
          InputProps={{
            style: { color: '#ffffff' },
          }}
          InputLabelProps={{
            style: { color: '#b0b0b0' },
          }}
          sx={{
            bgcolor: '#333333',
            borderRadius: '5px',
          }}
        />
        <TextField
          fullWidth
          name="careerPreferences"
          label="Career Preferences"
          multiline
          rows={4}
          variant="outlined"
          value={profile.careerPreferences}
          onChange={handleChange}
          InputProps={{
            style: { color: '#ffffff' },
          }}
          InputLabelProps={{
            style: { color: '#b0b0b0' },
          }}
          sx={{
            bgcolor: '#333333',
            borderRadius: '5px',
          }}
        />
        <TextField
          fullWidth
          name="skills"
          label="Skills"
          multiline
          rows={4}
          variant="outlined"
          value={profile.skills}
          onChange={handleChange}
          InputProps={{
            style: { color: '#ffffff' },
          }}
          InputLabelProps={{
            style: { color: '#b0b0b0' },
          }}
          sx={{
            bgcolor: '#333333',
            borderRadius: '5px',
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            bgcolor: '#1a73e8',
            '&:hover': {
              bgcolor: '#155ab2',
            },
            borderRadius: '5px',
          }}
        >
          Save Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
