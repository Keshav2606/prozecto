import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../services/api';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
    } else {
      setFilteredFaqs(faqs);
    }
  }, [searchTerm, faqs]);

  const fetchFAQs = async () => {
    try {
      const data = await api.faqs.getAll();
      setFaqs(data);
      setFilteredFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-10 md:px-20 lg:px-40 py-28">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">Frequently Asked Questions</h1>
      
      {/* Search Bar */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {loading ? (
        <p className="text-xl">Loading FAQs...</p>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={faq._id}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left text-xl transition-colors duration-300 hover:text-blue-600"
                style={{ color: document.documentElement.classList.contains('dark') ? 'white' : 'black' }}
              >
                {faq.question}
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-blue-600" : "rotate-0"
                  }`}
                  style={{ color: document.documentElement.classList.contains('dark') ? 'white' : 'black' }}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 animate-fadeIn" style={{ color: document.documentElement.classList.contains('dark') ? '#d1d5db' : 'black' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && !loading && (
            <p className="text-gray-400 text-center py-8">
              {searchTerm ? 'No FAQs found matching your search.' : 'No FAQs available.'}
            </p>
          )}
        </div>
      )}
      </div>
    </>
  );
};

export default FAQ;