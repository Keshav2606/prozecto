import { useState } from 'react';
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import MeterSection from "../components/MeterSection";
import ProductQualityAmico from "../assets/ProductQualityAmico.svg";
import ServicesPage from "./ServicesPage";
import Loader from "../components/Loader";
import TestimonialPage from './TestimonialPage';
import ContactPage from './ContactPage';
import Carousel from '../components/Carousel';

const Home = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  const text =
    "At Prozecto, we deliver top-notch solutions in video editing, web and app development, Excel automation, and graphic design. We focus on quality, creativity, and timely delivery to help your business grow.";

  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
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
            We are{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
              Prozecto
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-montserrat font-light text-gray-600 leading-relaxed">
            Building products that justify your pockets. <br />
            From <span className="font-semibold">software</span> to{" "}
            <span className="font-semibold">websites</span> to{" "}
            <span className="font-semibold">video editing</span>, <br />
            we deliver tailored solutions for your needs.
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-lg md:text-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg font-semibold"
          >
            Get Started
          </motion.button>
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
      <ServicesPage />

      {/* Why Choose Prozecto Section */}
      <section id="why-choose-prozecto" className="py-20 font-montserrat px-6 lg:px-40 md:px-20 bg-gray-50">
        <div className="mx-auto text-left">
          <motion.h2
            className="text-3xl md:text-8xl font-bold mb-8 text-gray-900"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-blue-600">Prozecto</span>?
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.03 }
              }
            }}
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, color: "transparent" },
                  visible: { opacity: 1, color: "#000" }
                }}
                transition={{ duration: 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>

          {/* Bullet Points */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              "✔️ High Quality Solutions",
              "✔️ Creative & Modern Approach",
              "✔️ On-Time Delivery"
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
      <Carousel/>
      <TestimonialPage />
      <ContactPage/>
    </div>
  );
};

export default Home;
