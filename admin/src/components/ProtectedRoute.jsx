import { useAuth } from '../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';
import Login from '../pages/Login';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box className="min-h-screen bg-gray-900 flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
};

export default ProtectedRoute;