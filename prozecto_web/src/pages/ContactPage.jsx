import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white flex items-start justify-center font-montserrat px-6 md:px-20 lg:px-40">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full flex flex-col md:flex-row"
      >
        {/* Left Side - Info */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 bg-[#155DFC] flex flex-col justify-center p-10 text-black"
        >
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
              📧 <span className="font-semibold">Email:</span> xyz@gmail.com
            </p>
            <p>
              📞 <span className="font-semibold">Phone:</span> +91 1234567890
            </p>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 p-10 bg-white dark:border-t dark:border-r dark:border-b dark:border-white dark:bg-gray-900 dark:text-white"
        >
          <h3 className="text-3xl dark:text-white font-bold mb-6 text-gray-800">Get in Touch</h3>
          <form className="space-y-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-sm"
                required
              />
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="Write your message..."
                rows="5"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-sm"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-[#155DFC] hover:bg-pink-500 text-black font-bold py-3 rounded-xl shadow-lg text-lg tracking-wide"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
