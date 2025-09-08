export const updateSEO = ({
  title = 'Prozecto - Digital Solutions & Web Development',
  description = 'Professional web development, mobile apps, and digital solutions. Building amazing experiences with cutting-edge technology.',
  keywords = 'web development, mobile apps, digital solutions, React, JavaScript, SEO',
  image = '/og-image.jpg',
  url = window.location.href
} = {}) => {
  // Update title
  document.title = title;

  // Update meta tags
  const updateMetaTag = (name, content, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let element = document.querySelector(selector);
    
    if (!element) {
      element = document.createElement('meta');
      if (property) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content);
  };

  // Basic meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);

  // Open Graph tags
  updateMetaTag('og:title', title, true);
  updateMetaTag('og:description', description, true);
  updateMetaTag('og:image', image, true);
  updateMetaTag('og:url', url, true);
  updateMetaTag('og:type', 'website', true);

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:image', image);
};