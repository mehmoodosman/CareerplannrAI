'use client';
import { Container, Typography, Button, Grid, Card, CardContent, AppBar, Toolbar, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'; 
import GitHubIcon from '@mui/icons-material/GitHub';
import { Analytics } from "@vercel/analytics/react";
import Image from 'next/image';
import getStripe from "@/utils/get-stripe";
import Head from 'next/head';
import Footer from "@/components/Footer";

export default function Home() {
  
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }
  
  return <>
  <Box sx={{ flexGrow: 1, bgcolor: '#121212', minHeight: '100vh', color: '#ffffff' }}>

    {/* Navbar */}
    <AppBar position="static" sx={{ backgroundColor: '#1e1e1e', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)', borderBottom: '4px solid #e91e63' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {/* Logo wrapped in Link */}
          <Link href="/" passHref>

            <Image 
              src="/CareerSwipe.svg"  
              alt="CareerSwipe Logo"
              width={100}  
              height={100}
              style={{ objectFit: 'contain', cursor: 'pointer' }}
            />

          </Link>
        </Box>

        {/* User buttons on the right end */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" passHref legacyBehavior>
              <Button
                color="inherit"
                sx={{
                  color: '#ffffff',
                  textTransform: 'none',
                  marginRight: 2,
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  ':hover': { color: '#e91e63', textShadow: '0 0 10px rgba(233, 30, 99, 0.5)' },
                }}
              >
                Log In
              </Button>
            </Link>
            <Link href="/sign-up" passHref legacyBehavior>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#e91e63',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  padding: '10px 20px',
                  boxShadow: '0 4px 15px rgba(233, 30, 99, 0.4)',
                  ':hover': { backgroundColor: '#c2185b', boxShadow: '0 6px 20px rgba(233, 30, 99, 0.6)' },
                }}
              >
                Create Account
              </Button>
            </Link>
          </SignedOut>
        </Box>
      </Toolbar>
    </AppBar>


    {/* Hero Section */}
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: 8 }}>
      <Typography variant="h3" gutterBottom sx={{
        fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', color: '#ffffff', letterSpacing: '2px',
        textShadow: '0 0 15px rgba(255, 255, 255, 0.6)'
      }}>
        Welcome to CareerSwipe AI
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
      {/* <Button variant="contained" size="large" sx={{
        backgroundColor: '#e91e63', color: 'white', textTransform: 'none', fontWeight: 'bold', borderRadius: '50px',
        padding: '14px 40px', marginBottom: 8, boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
        ':hover': { backgroundColor: '#c2185b', boxShadow: '0 8px 25px rgba(233, 30, 99, 0.6)' }
      }}>
        Start Your Career Exploration
      </Button> */}
      <Link href="/test-upload" passHref legacyBehavior>
    <Button variant="contained" size="large" sx={{
      backgroundColor: '#e91e63', color: 'white', textTransform: 'none', fontWeight: 'bold', borderRadius: '50px',
      padding: '14px 40px', marginBottom: 8, boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
      ':hover': { backgroundColor: '#c2185b', boxShadow: '0 8px 25px rgba(233, 30, 99, 0.6)' }
    }}>
      Start Your Career Recommendations
    </Button>
  </Link>
  <Link href="/generate" passHref legacyBehavior>
    <Button variant="contained" size="large" sx={{
      backgroundColor: '#e91e63', color: 'white', textTransform: 'none', fontWeight: 'bold', borderRadius: '50px',
      padding: '14px 40px', marginBottom: 8, marginLeft: 8, boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
      ':hover': { backgroundColor: '#c2185b', boxShadow: '0 8px 25px rgba(233, 30, 99, 0.6)' }
    }}>
      Start Your Career Cards Exploration
    </Button>
  </Link>
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
              Career Cards
            </Typography>
            <Typography color="textSecondary" sx={{
              color: '#bbbbbb', fontFamily: 'Roboto, sans-serif', textShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
            }}>
              Discover personalized job titles and why you’re a top fit. Elevate your career path with ease.
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

      <Grid item xs={12} sm={4}>
          <Card
            sx={{
              textAlign: 'center',
              padding: 4,
              borderRadius: '20px',
              bgcolor: '#2c2c2c',
              color: '#ffffff',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 25px rgba(0, 0, 0, 0.5)' }
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#e91e63' }}>
                Basic Plan
              </Typography>
              <Typography variant="h6" gutterBottom>
                FREE
              </Typography>
              <Typography variant="body1" paragraph>
              Access to limited features
              <br />
              Limited Career path suggestions

              </Typography>
              <Button variant="contained" sx={{
                backgroundColor: '#e91e63', color: 'white', borderRadius: '25px',
                padding: '10px 20px', boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
                ':hover': { backgroundColor: '#c2185b', boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)' }
              }}>
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              textAlign: 'center',
              padding: 4,
              borderRadius: '20px',
              bgcolor: '#2c2c2c',
              color: '#ffffff',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 25px rgba(0, 0, 0, 0.5)' }
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#e91e63' }}>
                Standard Plan
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10 / month
              </Typography>
              <Typography variant="body1" paragraph>
                Access to basic features and career recommendations.
              </Typography>
              <Button variant="contained" onClick={handleSubmit} sx={{
                backgroundColor: '#e91e63', color: 'white', borderRadius: '25px',
                padding: '10px 20px', boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
                ':hover': { backgroundColor: '#c2185b', boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)' }
              }}>
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              textAlign: 'center',
              padding: 4,
              borderRadius: '20px',
              bgcolor: '#2c2c2c',
              color: '#ffffff',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 25px rgba(0, 0, 0, 0.5)' }
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#e91e63' }}>
                Pro Plan
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10 / month
              </Typography>
              <Typography variant="body1" paragraph>
                Unlock advanced features and personalized recommendations.
              </Typography>
              <Button variant="contained" onClick={handleSubmit} sx={{
                backgroundColor: '#e91e63', color: 'white', borderRadius: '25px',
                padding: '10px 20px', boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
                ':hover': { backgroundColor: '#c2185b', boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)' }
              }}>
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>


    {/* Footer */}
    <Footer />

  </Box>
  <Analytics/>
 </>;
}
