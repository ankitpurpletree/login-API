// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      setToken(response.data.token);
      setError('');
    } catch (err) {
      setError('Login failed. Invalid credentials.');
      setToken('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {token && <Alert severity="success">Login successful! Token: {token}</Alert>}
        <form onSubmit={onSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={onChange}
              fullWidth
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              fullWidth
              required
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
