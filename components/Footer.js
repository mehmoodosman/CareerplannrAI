import { 
    Box,
    Container,
    IconButton,
    Typography,
  } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
    return (
    <>
   
   {/* Footer */}
    <Box sx={{
        bgcolor: '#1e1e1e', padding: 3, borderTop: '4px solid #e91e63', position: 'relative', bottom: 0, width: '100%', color: '#fff'
      }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="body1" color="" sx={{ marginBottom: 2 }}>
            © {new Date().getFullYear()} CareerSwipe AI. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton component="a" href="https://github.com/mehmoodosman" target="_blank" sx={{ color: '#ffffff' }}>
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href="https://github.com/BarnabasNovak1" target="_blank" sx={{ color: '#ffffff' }}>
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href="https://github.com/mahmoodayesha" target="_blank" sx={{ color: '#ffffff' }}>
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href="https://github.com/itancio" target="_blank" sx={{ color: '#ffffff' }}>
              <GitHubIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
      </>
    )
}

export default Footer;