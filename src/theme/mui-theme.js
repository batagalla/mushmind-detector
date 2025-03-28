
import { createTheme } from '@mui/material/styles';

// Create a custom theme for the application
const theme = createTheme({
  palette: {
    primary: {
      main: '#7D6E83', // Mushroom brown
      light: '#9F8E99',
      dark: '#5B5060',
      contrastText: '#fff',
    },
    secondary: {
      main: '#A4BE7B', // Natural green
      light: '#C1D8A3',
      dark: '#7A9455',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#f57c00',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#388e3c',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    mushroom: {
      50: '#F8F6F4',
      100: '#E6E0E5',
      200: '#D4C9D7',
      300: '#BEA8C0',
      400: '#A687A9',
      500: '#8D6791',
      600: '#7D6E83', // Main mushroom color
      700: '#5E5262',
      800: '#403542',
      900: '#211A21',
    },
    nature: {
      50: '#F1F8E9',
      100: '#DCEDC8',
      200: '#C5E1A5',
      300: '#AED581',
      400: '#9CCC65',
      500: '#8BC34A',
      600: '#7CB342',
      700: '#689F38',
      800: '#558B2F',
      900: '#33691E',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;
