import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#A86E58', // Brown
      dark: '#95614E',
    },
    secondary: {
      main: '#537B2F', // Light Green
      dark: '#476A28',
    },
    text: {
      primary: '#1C2228', // Navy
      secondary: '#262626', // Black
    },
    background: {
      default: '#FFFFFF', // White background
    },
  },
  typography: {
    fontFamily: "'Lato', sans-serif", // Default font
    h1: {
      fontWeight: 600, // Lato Semi Bold
      fontFamily: "'Lato', sans-serif",
    },
    h2: {
      fontWeight: 600,
      fontFamily: "'Lato', sans-serif",
    },
    h3: {
      fontWeight: 600,
      fontFamily: "'Lato', sans-serif",
    },
    body1: {
      fontFamily: "'Roboto', sans-serif", // Roboto Regular
    },
    body2: {
      fontFamily: "'Roboto', sans-serif", // Roboto Regular
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontFamily: "'Lato', sans-serif",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // No uppercase text
          borderRadius: 8, // Rounded corners
          color: '#FFFFFF', // White text for buttons
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // White app bar
          color: '#1C2228', // Navy text
          boxShadow: 'none', // Removes shadow for a clean look
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          marginTop: 8,
          borderRadius: 8, 
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
        },
      },
    },
  },
});
