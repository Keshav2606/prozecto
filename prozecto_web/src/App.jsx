import { useEffect } from 'react';
import Home from './pages/HomePage';
import { updateSEO } from './utils/seo';

function App() {
  useEffect(() => {
    updateSEO({
      title: 'Prozecto - Digital Solutions & Web Development',
      description: 'Professional web development, mobile apps, and digital solutions. Building amazing experiences with cutting-edge technology and innovative design.',
      keywords: 'web development, mobile apps, digital solutions, React, JavaScript, SEO, UI/UX design'
    });
  }, []);

  return (
      <div>
        <Home />
      </div>
  );
}

export default App
