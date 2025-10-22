import { useState } from 'react';
import { Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <Box className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Paper className="p-8 bg-gray-800 text-white max-w-md w-full">
        <Typography variant="h4" className="text-center mb-6">
          Admin Login
        </Typography>
        
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          
          <TextField
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 py-3"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <Box className="mt-4 p-3 bg-gray-700 rounded">
          <Typography variant="body2" className="text-gray-300">
            Default credentials:
          </Typography>
          <Typography variant="body2">
            Email: admin123@gmail.com
          </Typography>
          <Typography variant="body2">
            Password: 123456@7A
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;