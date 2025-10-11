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

  put: async (endpoint, data) => {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  },

  delete: async (endpoint) => {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  },

  // Testimonial specific methods
  testimonials: {
    getAll: () => api.get('/testimonials'),
    create: (data) => api.post('/testimonials', data),
    update: (id, data) => api.put(`/testimonials/${id}`, data),
    delete: (id) => api.delete(`/testimonials/${id}`)
  },

  // FAQ specific methods
  faqs: {
    getAll: () => api.get('/faqs'),
    create: (data) => api.post('/faqs', data),
    delete: (id) => api.delete(`/faqs/${id}`)
  },

  // Blog specific methods
  blogs: {
    getAll: () => api.get('/blogs'),
    create: (data) => api.post('/blogs', data),
    update: (id, data) => api.put(`/blogs/${id}`, data),
    delete: (id) => api.delete(`/blogs/${id}`)
  },

  // Terms and Conditions specific methods
  terms: {
    getAll: () => api.get('/terms'),
    create: (data) => api.post('/terms', data),
    update: (id, data) => api.put(`/terms/${id}`, data)
  },

  // Quote Requests specific methods
  quoteRequests: {
    getAll: () => api.get('/quote-requests')
  },

  // Privacy Policy specific methods
  privacyPolicies: {
    getAll: () => api.get('/privacy-policies'),
    create: (data) => api.post('/privacy-policies', data),
    update: (id, data) => api.put(`/privacy-policies/${id}`, data)
  },

  // User Agreement specific methods
  userAgreements: {
    getAll: () => api.get('/user-agreements'),
    create: (data) => api.post('/user-agreements', data),
    update: (id, data) => api.put(`/user-agreements/${id}`, data)
  },

  // Refund Policy specific methods
  refundPolicies: {
    getAll: () => api.get('/refund-policies'),
    create: (data) => api.post('/refund-policies', data),
    update: (id, data) => api.put(`/refund-policies/${id}`, data)
  }
};

export default api;