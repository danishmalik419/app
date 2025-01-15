import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link,Alert} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService'; 

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("")
    setError("")
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await register({ email, password });
      if (response.status) {
        setSuccess(response.message)
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        my: 8,
        p: 3,
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        
       
        <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
          Sign Up
        </Button>
        <Typography align="center">
          Already have an account?{' '}
          <Link href="#" onClick={() => navigate('/login')}>
            Login
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default SignupPage;
