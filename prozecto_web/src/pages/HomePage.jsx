import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import MeterSection from "../components/MeterSection";
import ProductQualityAmico from "../assets/ProductQualityAmico.svg";
import ServicesPage from "./ServicesPage";
import Loader from "../components/Loader";
import TestimonialPage from "./TestimonialPage";
import ContactPage from "./ContactPage";
import Carousel from "../components/Carousel";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import "../index.css";
import { AuroraText } from "@/components/magicui/aurora-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import TextCursorFollower from "@/components/TextCursorFollower";

const Home = () => {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('siteLoaded');
  });

  useEffect(() => {
    if (!sessionStorage.getItem('siteLoaded')) {
      sessionStorage.setItem('siteLoaded', 'true');
    }
  }, []);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  const text =
    "At Prozecto, we deliver top-notch solutions in video editing, web and app development, Excel automation, and graphic design. We focus on quality, creativity, and timely delivery to help your business grow.";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 lg:px-40 py-28">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl space-y-8"
        >
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-montserrat font-extrabold leading-tight">
            <TextCursorFollower>
              We are <AuroraText>Prozecto</AuroraText>
            </TextCursorFollower>
          </h1>
          <p className="text-xl md:text-2xl font-montserrat font-medium dark:text-white text-gray-600 leading-relaxed">
            Building products that justify your pockets. <br />
            From{" "}
            <span className="font-semibold">
              <AuroraText>software</AuroraText>
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              <AuroraText>websites</AuroraText>
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              <AuroraText>video editing</AuroraText>
            </span>
            , <br />
            we deliver tailored solutions for your needs.
          </p>
          <InteractiveHoverButton>Get Started</InteractiveHoverButton>
        </motion.div>

        {/* Right Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-14 md:mt-0 md:ml-10"
        >
          <img
            src={ProductQualityAmico}
            alt="Product Quality Illustration"
            className="w-[350px] md:w-[450px] lg:w-[550px] object-contain"
          />
        </motion.div>
      </section>

      <MeterSection />
      <div className="mb-20 mt-20"><Carousel/></div>
      <ServicesPage />

      {/* Why Choose Prozecto Section */}
      <section
        id="why-choose-prozecto"
        className="py-20 dark:bg-gray-900 dark:text-white font-montserrat px-6 lg:px-40 md:px-20 bg-gray-50"
      >
        <div className="mx-auto text-left">
          <h2 className="text-3xl md:text-8xl font-bold mb-8 dark:text-white text-gray-900">
            Why Choose <span className="text-blue-600">Prozecto</span>?
          </h2>
          <div className="bg-white dark:bg-gray-900 text-2xl md:text-4xl md:mt-30 mt-10 md:mb-30 mb-10">
            {text}
          </div>

          {/* Bullet Points */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              "✔️ High Quality Solutions",
              "✔️ Creative & Modern Approach",
              "✔️ On-Time Delivery",
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white shadow-md rounded-xl p-6"
              >
                <p className="text-lg font-semibold text-gray-700">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <TestimonialPage />
      <ContactPage />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Home;
