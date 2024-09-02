import { Container, Typography, Button, Grid, Card, CardContent, AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function HomePage() {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8f9fa' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '2px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, color: '#333', fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>
            Careerplannr AI
          </Typography>
          <Button color="inherit" sx={{ color: '#333', textTransform: 'none', marginRight: 2, fontWeight: 'bold', ':hover': { color: '#007bff' } }}>Log In</Button>
          <Button variant="contained" sx={{
            backgroundColor: '#007bff', color: 'white', textTransform: 'none', fontWeight: 'bold', borderRadius: '20px',
            ':hover': { backgroundColor: '#0056b3' }
          }}>Create Account</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: 6 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif', color: '#333' }}>
          Welcome to Careerplannr AI
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', color: '#555' }}>
          Your ultimate tool for career exploration and planning. Unlock your potential today!
        </Typography>
        <Box
          component="img"
          src="/image.png" // Replace with your actual image path
          alt="Careerplannr AI"
          sx={{ maxWidth: '100%', height: 'auto', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', marginTop: 4, marginBottom: 4 }}
        />
        <Button variant="contained" size="large" sx={{
          backgroundColor: '#007bff', color: 'white', textTransform: 'none', fontWeight: 'bold', borderRadius: '30px',
          padding: '12px 36px', marginBottom: 8, ':hover': { backgroundColor: '#0056b3' }
        }}>
          Start Your Career Exploration
        </Button>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ marginBottom: 10 }}>
        <Grid container spacing={6} textAlign="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#333', fontFamily: 'Montserrat, sans-serif' }}>
              Personalized Recommendations
            </Typography>
            <Typography color="textSecondary" sx={{ color: '#555', fontFamily: 'Montserrat, sans-serif' }}>
              Get career suggestions tailored to your skills and interests.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#333', fontFamily: 'Montserrat, sans-serif' }}>
              Comprehensive Career Paths
            </Typography>
            <Typography color="textSecondary" sx={{ color: '#555', fontFamily: 'Montserrat, sans-serif' }}>
              Explore detailed career paths and what it takes to achieve your goals.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#333', fontFamily: 'Montserrat, sans-serif' }}>
              Expert Advice
            </Typography>
            <Typography color="textSecondary" sx={{ color: '#555', fontFamily: 'Montserrat, sans-serif' }}>
              Learn from industry experts and gain insights to advance your career.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Subscription Plans */}
      <Container maxWidth="lg" sx={{ marginBottom: 10 }}>
        <Typography variant="h3" fontWeight="bold" textAlign="center" marginBottom={6} sx={{ fontFamily: 'Montserrat, sans-serif', color: '#333' }}>
          Our Subscription Plans
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: 'center', padding: 4, borderRadius: '15px', boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: 'Montserrat, sans-serif', color: '#333' }}>
                  Basic Plan
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', color: '#007bff' }}>
                  FREE
                </Typography>
                <Typography color="textSecondary" sx={{ color: '#555', fontFamily: 'Montserrat, sans-serif', marginBottom: 4 }}>
                  Access to limited features
                  <br />
                  Limited Career path suggestions
                  <br />
                  No Career Roadmaps access
                </Typography>
                <Button variant="contained" sx={{
                  backgroundColor: '#007bff', color: 'white', textTransform: 'none', fontWeight: 'bold', borderRadius: '20px',
                  ':hover': { backgroundColor: '#0056b3' }
                }}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: 'center', padding: 4, borderRadius: '15px', boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: 'Montserrat, sans-serif', color: '#333' }}>
                  Standard Plan
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', color: '#007bff' }}>
                  $5/month
                </Typography>
                <Typography color="textSecondary" sx={{ color: '#555', fontFamily: 'Montserrat, sans-serif', marginBottom: 4 }}>
                  Access to all features
                  <br />
                  Unlimited Career path suggestions
                  <br />
                  Limited Career Roadmaps access
                </Typography>
                <Button variant="contained" sx={{
                  backgroundColor: '#007bff', color: 'white', textTransform: 'none', fontWeight: 'bold', borderRadius: '20px',
                  ':hover': { backgroundColor: '#0056b3' }
                }}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: 'center', padding: 4, borderRadius: '15px', boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: 'Montserrat, sans-serif', color: '#333' }}>
                  Pro Plan
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', color: '#007bff' }}>
                  $10/month
                </Typography>
                <Typography color="textSecondary" sx={{ color: '#555', fontFamily: 'Montserrat, sans-serif', marginBottom: 4 }}>
                  Access to all features
                  <br />
                  Unlimited Career path suggestions
                  <br />
                  Unlimited Career Roadmaps access
                </Typography>
                <Button variant="contained" sx={{
                  backgroundColor: '#007bff', color: 'white', textTransform: 'none', fontWeight: 'bold', borderRadius: '20px',
                  ':hover': { backgroundColor: '#0056b3' }
                }}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
