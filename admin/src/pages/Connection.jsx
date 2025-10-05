import { Paper, Typography, Box } from '@mui/material';

const Connection = () => {
  return (
    <Box className="p-6">
      <Paper className="p-6 bg-gray-800 text-white">
        <Typography variant="h4" className="mb-4">
          Connection Management
        </Typography>
        <Typography variant="body1">
          Manage connection settings and configurations.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Connection;