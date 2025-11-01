import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../services/api";

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '', phoneVisible: false });
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api.settings.getAll();
      if (data.length > 0) {
        const settings = data[0];
        setContactInfo({
          email: settings.email || 'xyz@gmail.com',
          phone: settings.phone || '+91 1234567890',
          phoneVisible: settings.phoneVisible || false
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setContactInfo({ email: 'xyz@gmail.com', phone: '+91 1234567890', phoneVisible: false });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.contact.send(formData);
      setSent(true);
      setFormData({ email: '', message: '' });
      setTimeout(() => setSent(false), 2000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="dark:bg-gray-900 dark:text-white flex items-center justify-center font-montserrat px-6 md:px-20 lg:px-40 py-20 overflow-hidden">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row">
        {/* Left Side - Info */}
        <div className="w-full md:w-1/2 bg-[#155DFC] flex flex-col justify-center p-10 text-black">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-snug">
            Have a <span className="text-white">Question?</span> <br />
            We are here
          </h2>
          <p className="text-lg mb-6 font-medium">
            Give us a call, request a callback or drop us an email — 
            we’re here to help.
          </p>
          <div className="space-y-3 text-lg">
            <p>
              📧 <span className="font-semibold">Email:</span> {contactInfo.email}
            </p>
            {contactInfo.phoneVisible && (
              <p>
                📞 <span className="font-semibold">Phone:</span> {contactInfo.phone}
              </p>
            )}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 bg-white dark:border-t dark:border-r dark:border-b dark:border-white dark:bg-gray-900 dark:text-white overflow-hidden">
          <h3 className="text-3xl dark:text-white font-bold mb-6 text-gray-800">Get in Touch</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-sm"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="5"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-sm resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || sent}
              whileHover={{ scale: loading || sent ? 1 : 1.05 }}
              whileTap={{ scale: loading || sent ? 1 : 0.95 }}
              transition={{ duration: 0.2 }}
              className={`w-full font-bold py-3 rounded-xl shadow-lg text-lg tracking-wide transition-colors duration-300 ${
                sent ? 'bg-green-500 text-white' : 'bg-[#155DFC] hover:bg-pink-500 text-white'
              } disabled:opacity-50`}
            >
              {loading ? 'Sending...' : sent ? 'Sent!' : 'Send Message'}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
