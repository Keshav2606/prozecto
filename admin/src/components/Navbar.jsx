import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { logout, getCurrentAdmin } = useAuth();
  const admin = getCurrentAdmin();
  
  const navItems = [
    'Testimonials',
    'Connection',
    'FAQs', 
    'Legal Conditions',
    'Blog',
    'Quote Requests',
    'Settings'
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AppBar position="static" className="bg-gray-900">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="text-white font-bold">
          Prozecto Admin
        </Typography>
        <Box className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Button
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`text-white hover:bg-gray-700 ${
                currentPage === item ? 'bg-gray-700' : ''
              }`}
            >
              {item}
            </Button>
          ))}
          <Box className="flex items-center space-x-2 ml-4">
            <Typography variant="body2" className="text-gray-300">
              {admin?.email}
            </Typography>
            <IconButton onClick={handleLogout} className="text-white hover:bg-gray-700">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;