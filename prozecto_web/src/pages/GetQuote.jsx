import { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

const GetQuote = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    projectDetails: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.quoteRequests.create(formData);
      setSubmitted(true);
      setFormData({ fullName: '', email: '', phone: '', service: '', projectDetails: '' });
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white px-[6vw] py-28 font-montserrat flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-green-600">Request Submitted!</h1>
          <p className="text-lg mb-6">Thank you for your request. We'll get back to you soon.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white px-[6vw] py-28 font-montserrat">
      {/* Heading */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-5xl md:text-6xl font-bold text-center mb-10"
      >
        Get a <span className="text-blue-600 dark:text-blue-400">Quote</span>
      </motion.h1>

      <motion.p
        custom={0.1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-lg text-center max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-16"
      >
        Tell us about your project — we'll review your requirements and provide
        you with a tailored estimate. Let's bring your idea to life!
      </motion.p>

      {/* Request Form */}
      <motion.form
        custom={0.2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold">Service Required</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select a service</option>
              <option value="web">Website Development</option>
              <option value="app">App Development</option>
              <option value="software">Software Solution</option>
              <option value="design">Graphic Design</option>
              <option value="video">Video Editing</option>
              <option value="excel">Microsoft Excel Automation</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Project Details</label>
          <textarea
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            rows="5"
            placeholder="Briefly describe your project requirements..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-colors duration-300 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default GetQuote;