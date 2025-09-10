import { useState } from "react";
import RollingTextOnView from "./RollingTextOnView";

const faqs = [
  {
    question: "What types of software development services do you provide?",
    answer:
      "We build custom software solutions tailored to your business needs, including desktop applications, SaaS platforms, and enterprise-level tools.",
  },
  {
    question: "Do you offer web and app development?",
    answer:
      "Yes! We design and develop responsive websites, e-commerce platforms, and mobile applications for both iOS and Android.",
  },
  {
    question: "Can you help with graphic design?",
    answer:
      "Our team provides creative and professional graphic design services, including branding, UI/UX design, logos, and marketing materials.",
  },
  {
    question: "Do you create 3D models?",
    answer:
      "Absolutely! We specialize in creating high-quality 3D models for games, animations, product design, and virtual experiences.",
  },
  {
    question: "Can you work with spreadsheets and Excel automation?",
    answer:
      "Yes, we create advanced Excel solutions, custom formulas, macros, and data visualizations to simplify your workflows.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" dark:bg-gray-900 dark:text-white w-full md:px-44 px-6 md:py-40 py-20 font-montserrat">
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

      <h2 className="text-3xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8">
        <RollingTextOnView text="Frequently Asked Questions" />
      </h2>

      <div className="space-y-4 mt-20 dark:bg-gray-900 dark:text-white">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left text-xl text-gray-800 dark:text-white transition-colors duration-300 hover:text-blue-600"
            >
              {faq.question}
              <span
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180 text-blue-600" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
