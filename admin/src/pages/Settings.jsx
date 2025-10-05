import { Paper, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import api from '../services/api';

const Settings = () => {
  const [status, setStatus] = useState('Connecting...');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await api.get('/health');
        setStatus(`Connected: ${response.status}`);
        setIsConnected(true);
      } catch (error) {
        setStatus('Backend not connected');
        setIsConnected(false);
      }
    };
    testConnection();
  }, []);

  return (
    <Box className="p-6">
      <Paper className="p-6 bg-gray-800 text-white">
        <Typography variant="h4" className="mb-4">
          Settings
        </Typography>
        <Box className="mb-4">
          <Typography variant="h6" className="mb-2">
            Backend Connection Status
          </Typography>
          <Box className={`p-3 rounded ${isConnected ? 'bg-green-800' : 'bg-red-800'}`}>
            <Typography>{status}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;