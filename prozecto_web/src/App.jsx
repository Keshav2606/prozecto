import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import TermsAndConditions from './pages/TermsAndConditions';
import GetQuote from './pages/GetQuote';
import FAQ from './pages/FAQ';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
