import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    'Testimonials',
    'Connection',
    'FAQs', 
    'Terms and Conditions',
    'Blog',
    'Settings'
  ];

  return (
    <AppBar position="static" className="bg-gray-900">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="text-white font-bold">
          Prozecto Admin
        </Typography>
        <Box className="flex space-x-4">
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;