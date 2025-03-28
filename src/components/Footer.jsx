
import React from "react";
import { Link } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper', 
        py: 4, 
        borderTop: '1px solid', 
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography 
              component={Link} 
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
            <Typography component={Link} to="/" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>
              Home
            </Typography>
            <Typography component={Link} to="/feedback" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>
              Feedback
            </Typography>
            <Typography component={Link} to="/auth" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>
              Login / Register
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Typography component={Link} to="/privacy" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>
              Privacy Policy
            </Typography>
            <Typography component={Link} to="/terms" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>
              Terms of Service
            </Typography>
            <Typography component={Link} to="/disclaimer" color="text.secondary" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>
              Disclaimer
            </Typography>
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
