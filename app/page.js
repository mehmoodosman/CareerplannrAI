import { Container, Typography, Button, Grid, Card, CardContent, AppBar, Toolbar, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import GitHubIcon from '@mui/icons-material/GitHub';
import CareerRecommender from './components/CareerRecommender'; // Import the CareerRecommender component

export default function HomePage() {
  // Example user profile, replace with real data
  const userProfile = {
    name: "John Doe",
    interests: ["Technology", "Data Science", "Marketing"],
    skills: ["JavaScript", "Python", "SEO"]
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#1e1e1e', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)', borderBottom: '4px solid #e91e63' }}>
        <Toolbar>
          <Typography variant="h4" sx={{
            flexGrow: 1, color: '#ffffff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif',
            textShadow: '0 0 10px rgba(233, 30, 99, 0.7)'
          }}>
            Careerplannr AI
          </Typography>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <UserButton afterSignOutUrl="/" />
            <Link href="/sign-in" passHref>
              <Button color="inherit" sx={{
                color: '#ffffff', textTransform: 'none', marginRight: 2, fontWeight: 'bold', borderRadius: '20px',
                ':hover': { color: '#e91e63', textShadow: '0 0 10px rgba(233, 30, 99, 0.5)' }
              }}>
                Log In
              </Button>
            </Link>
            <Link href="/sign-up" passHref>
              <Button variant="contained" sx={{
                backgroundColor: '#e91e63', color: 'white', textTransform: 'none', fontWeight: 'bold', borderRadius: '25px',
                padding: '10px 20px', boxShadow: '0 4px 15px rgba(233, 30, 99, 0.4)',
                ':hover': { backgroundColor: '#c2185b', boxShadow: '0 6px 20px rgba(233, 30, 99, 0.6)' }
              }}>
                Create Account
              </Button>
            </Link>
          </SignedOut>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: 8 }}>
        <Typography variant="h2" gutterBottom sx={{
          fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', color: '#ffffff', letterSpacing: '2px',
          textShadow: '0 0 15px rgba(255, 255, 255, 0.6)'
        }}>
          Welcome to Careerplannr AI
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom sx={{
          fontFamily: 'Roboto, sans-serif', color: '#bbbbbb',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
        }}>
          Your ultimate tool for career exploration and planning. Unlock your potential today!
        </Typography>
        <Box
          component="img"
          src="/Image.png"
          alt="Careerplannr AI"
          sx={{
            maxWidth: '100%', height: 'auto', borderRadius: '25px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
            marginTop: 4, marginBottom: 4, transition: 'transform 0.5s', ':hover': { transform: 'scale(1.05)' }
          }}
        />
        <Button variant="contained" size="large" sx={{
          backgroundColor: '#e91e63', color: 'white', textTransform: 'none', fontWeight: 'bold', borderRadius: '50px',
          padding: '14px 40px', marginBottom: 8, boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
          ':hover': { backgroundColor: '#c2185b', boxShadow: '0 8px 25px rgba(233, 30, 99, 0.6)' }
        }}>
          Start Your Career Exploration
        </Button>
      </Container>

      {/* Career Recommender Section */}
      <Container maxWidth="lg" sx={{ marginY: 8 }}>
        <CareerRecommender userProfile={userProfile} />
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ marginBottom: 12 }}>
        <Grid container spacing={6} textAlign="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{
              bgcolor: '#1e1e1e', borderRadius: '15px', padding: 4, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)' }
            }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{
                color: '#e91e63', fontFamily: 'Roboto, sans-serif', textShadow: '0 0 8px rgba(233, 30, 99, 0.6)'
              }}>
                Personalized Recommendations
              </Typography>
              <Typography color="textSecondary" sx={{
                color: '#bbbbbb', fontFamily: 'Roboto, sans-serif', textShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
              }}>
                Get career suggestions tailored to your skills and interests.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{
              bgcolor: '#1e1e1e', borderRadius: '15px', padding: 4, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)' }
            }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{
                color: '#e91e63', fontFamily: 'Roboto, sans-serif', textShadow: '0 0 8px rgba(233, 30, 99, 0.6)'
              }}>
                Comprehensive Career Paths
              </Typography>
              <Typography color="textSecondary" sx={{
                color: '#bbbbbb', fontFamily: 'Roboto, sans-serif', textShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
              }}>
                Explore detailed career paths and what it takes to achieve your goals.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{
              bgcolor: '#1e1e1e', borderRadius: '15px', padding: 4, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)' }
            }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{
                color: '#e91e63', fontFamily: 'Roboto, sans-serif', textShadow: '0 0 8px rgba(233, 30, 99, 0.6)'
              }}>
                Expert Advice
              </Typography>
              <Typography color="textSecondary" sx={{
                color: '#bbbbbb', fontFamily: 'Roboto, sans-serif', textShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
              }}>
                Get insights and tips from industry experts to boost your career.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Subscription Plans */}
      <Container maxWidth="lg" sx={{ marginBottom: 10 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          marginBottom={6}
          sx={{
            fontFamily: 'Roboto, sans-serif',
            color: '#ffffff',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
        >
          Our Subscription Plans
        </Typography>
        
        <Grid container spacing={6} justifyContent="center">
          {/* Subscription Cards */}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{
        bgcolor: '#1e1e1e', padding: 3, borderTop: '4px solid #e91e63', position: 'relative', bottom: 0, width: '100%',
      }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            © {new Date().getFullYear()} Careerplannr AI. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton component="a" href="https://github.com/mehmoodosman" target="_blank" sx={{ color: '#ffffff' }}>
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href="https://github.com/BarnabasNovak1" target="_blank" sx={{ color: '#ffffff' }}>
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href="https://github.com/hasantalib" target="_blank" sx={{ color: '#ffffff' }}>
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href="https://github.com/ayeshm3" target="_blank" sx={{ color: '#ffffff' }}>
              <GitHubIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
// app/sign-up/[...rest]/page.js

import { Box } from '@mui/material';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <SignUp
                routing="hash"
                afterSignUpUrl="/profile"  
            />
        </Box>
    );
}
