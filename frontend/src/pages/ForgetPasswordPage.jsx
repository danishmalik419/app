import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/authService';

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await forgotPassword({ email });
      if(response.status){
        setSuccess(response.message); 
        setError('');
      }else{
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      setSuccess('');
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
        Forgot Password
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
        <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
          Reset Password
        </Button>
        <Typography align="center">
          Remember your password?{' '}
          <Link href="#" onClick={() => navigate('/login')}>
            Login
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default ForgetPasswordPage;
