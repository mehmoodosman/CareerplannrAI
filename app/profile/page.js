import { useState } from 'react';
import { firestore } from '../../firebase/config';  // Make sure your Firebase config is correctly set up
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
        color: '#fff',  
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom>Complete Your Profile</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          maxWidth: '500px',
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
            style: { color: '#fff' }, 
          }}
          InputLabelProps={{
            style: { color: '#fff' },
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
            style: { color: '#fff' }, 
          }}
          InputLabelProps={{
            style: { color: '#fff' },  
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
            style: { color: '#fff' },  
          }}
          InputLabelProps={{
            style: { color: '#fff' }, 
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
            style: { color: '#fff' },  
          }}
          InputLabelProps={{
            style: { color: '#fff' },  
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;

