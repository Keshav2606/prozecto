import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Users, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../services/api';

const UserAgreement = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const data = await api.userAgreements.getAll();
      setContent(data[0]?.content || 'User agreement content will be available soon.');
    } catch (error) {
      console.error('Error fetching user agreement:', error);
      setContent('Error loading user agreement. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { icon: <Users className="w-6 h-6 text-blue-500" />, title: "User Rights" },
    { icon: <FileText className="w-6 h-6 text-green-500" />, title: "Agreement Terms" },
    { icon: <CheckCircle className="w-6 h-6 text-purple-500" />, title: "Compliance" },
    { icon: <AlertTriangle className="w-6 h-6 text-orange-500" />, title: "Violations" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 text-gray-900 dark:text-gray-100 relative overflow-hidden px-10 md:px-20 lg:px-40 py-24 font-montserrat">
      
      {/* Floating Background Icons */}
      {!isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.05, x: [0, 200, 0] }}
            transition={{ repeat: Infinity, duration: 15 }}
            className="absolute top-20 left-10 text-8xl select-none"
          >
            👥
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.05, y: [50, -50, 50] }}
            transition={{ repeat: Infinity, duration: 12 }}
            className="absolute bottom-10 right-20 text-8xl select-none"
          >
            📋
          </motion.div>
        </>
      )}

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold mb-12 text-center"
      >
        User <span className="text-blue-500">Agreement</span>
      </motion.h1>

      {/* Animated Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {sections.map((item, i) => (
          <motion.div
            key={i}
            initial={isMobile ? {} : { opacity: 0, y: 50 }}
            whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { duration: 0.8, delay: i * 0.2, type: "spring", stiffness: 80 }}
            whileHover={isMobile ? {} : { scale: 1.05, rotate: 1 }}
            className="rounded-3xl border dark:border-gray-700 border-gray-200 bg-gray-50 dark:bg-gray-900 p-6 shadow-lg hover:shadow-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer relative"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-center">{item.title}</h3>
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {loading ? "Loading section details..." : "Read below for more details on this section."}
            </p>
          </motion.div>
        ))}
      </div>

      {/* User Agreement Markdown Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-4xl mx-auto my-8"
      >
        {loading ? (
          <p className="text-center text-xl">Fetching user agreement...</p>
        ) : content ? (
          <div className="prose dark:prose-invert prose-lg text-gray-800 dark:text-gray-200">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-center text-xl">No user agreement available at the moment.</p>
        )}
      </motion.div>
      </div>
    </>
  );
};

export default UserAgreement;
