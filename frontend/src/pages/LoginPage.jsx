import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess("");

    try {
      const data = await login({ email, password });
      if (data.status) {
        setSuccess(data.message)
        localStorage.setItem('authToken', data.token);
        setTimeout(() => {
          navigate('/');
        }, 2000); 
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
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
        Login
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <form onSubmit={handleLogin}>
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
      
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mb: 2 }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <Typography align="center">
          <Link
            component="button"
            onClick={(e) => {
              e.preventDefault();
              navigate('/forget-password');
            }}
          >
            Forgot Password?
          </Link>
        </Typography>
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link
            component="button"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
          >
            Sign up
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginPage;
