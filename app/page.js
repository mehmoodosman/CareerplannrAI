
import { Container, Typography, Button, Grid, Card, CardContent, AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'; // Assuming you're using Clerk for auth
export default function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
            Careerplannr AI
          </Typography>
          
            {/* Show UserButton when signed in, and Log In / Sign Up buttons when signed out */}
            <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ color: 'black', textTransform: 'none', marginRight: 2 }}>Log In</Button>
            <Button variant="contained" color="primary" href="/sign-up" sx={{ textTransform: 'none' }}>Create Account</Button>
          </SignedOut>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to Careerplannr AI
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Your ultimate tool for career exploration and planning. Unlock your potential today!
        </Typography>
        <Box
          component="img"
          src="/image.png" // Replace with your actual image path
          alt="Careerplannr AI"
          sx={{ maxWidth: '100%', height: 'auto', mb: 4 }}
        />
        <Button variant="contained" color="primary" size="large" sx={{ textTransform: 'none', marginBottom: 8 }}>
          Start Your Career Exploration
        </Button>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ marginBottom: 8 }}>
        <Grid container spacing={4} textAlign="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Personalized Recommendations
            </Typography>
            <Typography color="textSecondary">
              Get career suggestions tailored to your skills and interests.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Comprehensive Career Paths
            </Typography>
            <Typography color="textSecondary">
              Explore detailed career paths and what it takes to achieve your goals.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Expert Advice
            </Typography>
            <Typography color="textSecondary">
              Learn from industry experts and gain insights to advance your career.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Subscription Plans */}
      <Container maxWidth="lg" sx={{ marginBottom: 8 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" marginBottom={4}>
          Our Subscription Plans
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: 'center', padding: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Basic Plan
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  FREE
                </Typography>
                <Typography color="textSecondary">
                  Access to limited features
                  <br />
                  Limited Career path suggestions
                  <br />
                  No Career Roadmaps access
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2, textTransform: 'none' }}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: 'center', padding: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Standard Plan
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  $5/month
                </Typography>
                <Typography color="textSecondary">
                  Access to all features
                  <br />
                  Unlimited Career path suggestions
                  <br />
                  Limited Career Roadmaps access
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2, textTransform: 'none' }}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: 'center', padding: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Pro Plan
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  $10/month
                </Typography>
                <Typography color="textSecondary">
                  Access to all features
                  <br />
                  Unlimited Career path suggestions
                  <br />
                  Unlimited Career Roadmaps access
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2, textTransform: 'none' }}>
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
