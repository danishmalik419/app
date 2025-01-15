import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSecondToolbar, setShowSecondToolbar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowSecondToolbar(currentScrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  const handleLoginSignupClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Clear the token from localStorage and update state
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar
        disableGutters
        style={{
          justifyContent: 'space-between',
          backgroundColor: '#537B2F',
          padding: '8px 0',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          style={{
            fontWeight: 'bold',
            color: '#fff',
            transition: 'color 0.3s ease',
            marginLeft: '16px',
          }}
          onClick={() => navigate('/')}
        >
          App
        </Typography>

        <Box style={{ display: 'flex', gap: '16px', alignItems: 'center', marginRight: '16px' }}>
          {isLoggedIn ? (
            <Button
              variant="text"
              onClick={handleLogout}
              style={{
                borderRadius: '8px',
                fontWeight: 500,
                color: '#fff',
                backgroundColor: 'transparent',
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="text"
              startIcon={<Person />}
              onClick={handleLoginSignupClick}
              style={{
                borderRadius: '8px',
                fontWeight: 500,
                color: '#fff',
                backgroundColor: 'transparent',
              }}
            >
              Login/Signup
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
