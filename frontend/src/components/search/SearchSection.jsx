import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import { Search, LocationOn, MyLocation } from '@mui/icons-material';

const GOOGLE_MAPS_API_KEY = ''; // Replace with your API Key

export function SearchSection() {
  const [city, setCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm, 'in', city || pinCode);
  };

  const handlePinCodeChange = async (event) => {
    const enteredPin = event.target.value;
    setPinCode(enteredPin);

    if (enteredPin.length === 6 && /^\d{6}$/.test(enteredPin)) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${enteredPin}&key=${GOOGLE_MAPS_API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch location details.');
        }

        const data = await response.json();

        if (data.status === 'OK') {
          const addressComponents = data.results[0].address_components;

          const city = addressComponents.find((component) =>
            component.types.includes('locality')
          )?.long_name;

          setCity(city || 'Unknown City');
        } else {
          alert('Invalid PIN code or location not found.');
        }
      } catch (error) {
        console.error('Error fetching location from PIN code:', error);
        alert('An error occurred while fetching location details.');
      }
    }
  };

  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch location details.');
          }

          const data = await response.json();

          if (data.status === 'OK') {
            const addressComponents = data.results[0].address_components;

            const city = addressComponents.find((component) =>
              component.types.includes('locality')
            )?.long_name;

            const postalCode = addressComponents.find((component) =>
              component.types.includes('postal_code')
            )?.long_name;

            setCity(city || 'Unknown City');
            setPinCode(postalCode || 'Unknown PIN');
          } else {
            alert('Unable to fetch location details.');
          }
        } catch (error) {
          console.error('Error fetching location details:', error);
          alert('An error occurred while fetching location details.');
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to fetch your location. Please try again.');
      }
    );
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        background: 'linear-gradient(135deg, #f0f7f0 0%, #dff6e2 100%)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: 700,
            color: theme.palette.text.primary,
            typography: { xs: 'h5', md: 'h4' },
            letterSpacing: '0.03em',
          }}
        >
          Discover Homoeopathic Medicines
        </Typography>
        <Box
          sx={{
            maxWidth: 800,
            mx: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Button
            onClick={() => setShowLocationModal(true)}
            variant="outlined"
            startIcon={<LocationOn />}
            sx={{
              flexBasis: { xs: '100%', md: '30%' },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              borderRadius: 2,
              padding: '12px 18px',
              padding: '15px 18px',
              transition: 'background 0.3s, color 0.3s',
              color:theme.palette.primary.light,
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
              },
            }}
          >
            {city || 'Select Location'}
          </Button>
          <TextField
            fullWidth
            placeholder="Search Your Homoeopathic Medicine"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            sx={{
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'box-shadow 0.3s',
                '&:hover': {
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </Box>

        <Modal
          open={showLocationModal}
          onClose={() => setShowLocationModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={showLocationModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: 400,
                background: theme.palette.background.default,
                boxShadow: '0px 6px 15px rgba(0,0,0,0.15)',
                borderRadius: 3,
                padding: 3,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Choose Your Location
              </Typography>
              <TextField
                placeholder="Enter your PIN code"
                fullWidth
                value={pinCode}
                onChange={handlePinCodeChange}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={async () => {
                  if (pinCode.length === 6) {
                    await handlePinCodeChange({ target: { value: pinCode } });
                  }
                  setShowLocationModal(false);
                }}
                sx={{
                  py: 1.5,
                  mb: 1,
                  borderRadius: 2,
                }}
              >
                Confirm
              </Button>
              <Button
                variant="text"
                fullWidth
                startIcon={<MyLocation />}
                onClick={fetchCurrentLocation}
                sx={{ color: theme.palette.text.secondary }}
              >
                Use Current Location
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  );
}

export default SearchSection;