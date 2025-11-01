import { useState, useEffect } from "react";
import api from "../services/api";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const data = await api.faqs.getAll();
      const shuffled = data.sort(() => 0.5 - Math.random());
      const randomFaqs = shuffled.slice(0, 5);
      setFaqs(randomFaqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full md:px-44 px-6 md:py-40 py-20 font-montserrat bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <h2 className="text-3xl md:text-8xl font-bold mb-8 text-gray-900 dark:text-white">
        FAQs
      </h2>

      <div className="space-y-4 mt-20">
        {loading ? (
          <div className="text-center py-8 text-gray-600 dark:text-gray-300">
            Loading FAQs...
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-8 text-gray-600 dark:text-gray-300">
            No FAQs available.
          </div>
        ) : (
          faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left text-xl transition-colors duration-300 text-gray-900 dark:text-white hover:text-blue-600"
              >
                {faq.question}
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index
                      ? "rotate-180 text-blue-600"
                      : "rotate-0 text-gray-900 dark:text-white"
                  }`}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-700 dark:text-gray-300 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default FAQSection;
