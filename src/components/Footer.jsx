
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Grid, 
  Divider, 
  useTheme,
  useMediaQuery 
} from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper', 
        py: 4, 
        borderTop: '1px solid', 
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography 
              component={RouterLink} 
              to="/" 
              variant="h6" 
              color="primary" 
              sx={{ textDecoration: 'none', display: 'block', mb: 1 }}
            >
              MushroomID
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Safe mushroom identification powered by AI. Our mission is to help 
              foragers identify mushrooms safely and reliably.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/feedback" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Feedback
            </Link>
            <Link component={RouterLink} to="/auth" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Login / Register
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link component={RouterLink} to="/privacy" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Terms of Service
            </Link>
            <Link component={RouterLink} to="/disclaimer" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Disclaimer
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {currentYear} MushroomID. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: isMobile ? 1 : 0 }}>
            Made with 🍄 for mushroom enthusiasts
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
