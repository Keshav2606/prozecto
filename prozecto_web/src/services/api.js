import axiosInstance from './axios';

export const api = {
  get: async (endpoint) => {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  },
  
  post: async (endpoint, data) => {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  },

  // Testimonial methods
  testimonials: {
    getAll: () => api.get('/testimonials')
  },

  // FAQ methods
  faqs: {
    getAll: () => api.get('/faqs')
  },

  // Blog methods
  blogs: {
    getAll: () => api.get('/blogs')
  },

  // Quote Request methods
  quoteRequests: {
    create: (data) => api.post('/quote-requests', data)
  },

  // Policy methods
  terms: {
    getAll: () => api.get('/terms')
  },
  privacyPolicies: {
    getAll: () => api.get('/privacy-policies')
  },
  userAgreements: {
    getAll: () => api.get('/user-agreements')
  },
  refundPolicies: {
    getAll: () => api.get('/refund-policies')
  },

  // Settings methods
  settings: {
    getAll: () => api.get('/settings')
  },

  // Contact methods
  contact: {
    send: (data) => api.post('/contact', data)
  }
};

export default api;