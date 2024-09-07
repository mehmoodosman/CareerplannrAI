import { 
    Box,
    Container,
    IconButton,
    Link,
    Typography,
  } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
import FeedbackIcon from '@mui/icons-material/Feedback';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export const Footer = () => {
    return (
    <>
   
   {/* Footer */}
    <Box sx={{
        bgcolor: '#1e1e1e', padding: 1, borderTop: '4px solid #e91e63', position: 'relative', bottom: 0, width: '100%', color: '#fff'
      }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>

          {/* Feedback form */}
          <Box display='flex' justifyContent='center' alignItems='center' sx={{ marginBottom: 2 }}>
            <Link 
              href='https://tally.so/r/3XYWx4' 
              target='_blank' 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: 'inherit', 
                textDecoration: 'none', 
                padding: '8px 16px',
                fontSize: '0.875rem', // Smaller font size
                '&:hover': { textDecoration: 'none', color: 'inherit' },
                '&:focus': { textDecoration: 'none', color: 'inherit' },
                '&:active': { textDecoration: 'none', color: 'inherit' }
              }}
            >
              <KeyboardDoubleArrowRightIcon sx={{ fontSize: 24, color: '#e91e63', marginLeft: 1 }} />
              <Typography sx={{ color: '#fff', margin:1, fontWeight: 100 }}>
                Your feedback helps us improve - share your thoughts!
              </Typography>
              <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 24, color: '#e91e63', marginLeft: 1 }} />
            </Link>
          </Box>

          {/* Social media icons */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton component="a" href="https://github.com/mehmoodosman" target="_blank" sx={{ color: '#888' }}>
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href="https://github.com/BarnabasNovak1" target="_blank" sx={{ color: '#888' }}>
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href="https://github.com/mahmoodayesha" target="_blank" sx={{ color: '#888' }}>
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href="https://github.com/itancio" target="_blank" sx={{ color: '#888' }}>
              <GitHubIcon />
            </IconButton>
          </Box>
          
          {/* Disclaimer */}
          <Typography variant="body1" color="" sx={{ marginBottom: 1, fontSize: 14, color: '#888' }}>
            © {new Date().getFullYear()} CareerSwipe AI. All rights reserved.
          </Typography>
        </Container>
      </Box>
      </>
    )
}

export default Footer;