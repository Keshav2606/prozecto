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
  }
};

export default api;