import {
  Container,
  Grid,
  Typography,
  Link,
  Box,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
} from '@mui/icons-material';

export function Footer() {
  return (
    <Box sx={{ bgcolor: 'text.primary', color: 'white', py: 6 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="grey.400">
              Web application for using React
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Terms & Conditions', 'Privacy Policy', 'Shipping Information', 'Contact Us'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  color="grey.400"
                  sx={{ '&:hover': { color: 'white' } }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <IconButton
                  key={index}
                  color="inherit"
                  sx={{ '&:hover': { color: 'grey.400' } }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: 'grey.800' }} />
        <Typography variant="body2" color="grey.400" align="center">
          © 2024 App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}