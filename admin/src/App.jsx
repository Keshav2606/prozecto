import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Testimonials from './pages/Testimonials';
import Connection from './pages/Connection';
import FAQs from './pages/FAQs';
import TermsAndConditions from './pages/TermsAndConditions';
import Blog from './pages/Blog';
import QuoteRequests from './pages/QuoteRequests';
import Settings from './pages/Settings';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('Testimonials');

  const renderPage = () => {
    switch (currentPage) {
      case 'Testimonials':
        return <Testimonials />;
      case 'Connection':
        return <Connection />;
      case 'FAQs':
        return <FAQs />;
      case 'Legal Conditions':
        return <TermsAndConditions />;
      case 'Blog':
        return <Blog />;
      case 'Quote Requests':
        return <QuoteRequests />;
      case 'Settings':
        return <Settings />;
      default:
        return <Testimonials />;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-900">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App