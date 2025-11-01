import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  Binoculars,
  Lightbulb,
  Target,
  Rocket,
  HeartHandshake,
  Cpu,
  Globe2,
} from "lucide-react";

export default function Mission() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const items = [
    {
      icon: <Binoculars className="w-7 h-7 text-teal-500" />,
      title: "Vision",
      desc: "To revolutionize digital transformation with precision, creativity, and trust. We envision a world where technology bridges people and purpose seamlessly.",
    },
    {
      icon: <Lightbulb className="w-7 h-7 text-teal-500" />,
      title: "Mission",
      desc: "Empowering clients through innovative, scalable digital solutions tailored to real business needs, driving efficiency and meaningful impact in every line of code.",
    },
    {
      icon: <Target className="w-7 h-7 text-teal-500" />,
      title: "Goals",
      desc: "To inspire progress, build reliable digital ecosystems, and turn every challenge into an opportunity for sustainable growth and advancement.",
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-teal-500" />,
      title: "Values",
      desc: "Integrity, collaboration, and accountability form the foundation of everything we do. We believe long-term success is built on trust and shared goals.",
    },
    {
      icon: <Cpu className="w-7 h-7 text-teal-500" />,
      title: "Innovation",
      desc: "We continuously evolve by exploring new technologies and methodologies, ensuring our clients stay ahead in an ever-changing digital world.",
    },
    {
      icon: <Globe2 className="w-7 h-7 text-teal-500" />,
      title: "Commitment",
      desc: "We are dedicated to creating digital solutions that empower communities, enhance connectivity, and promote inclusivity across global platforms.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 text-gray-900 dark:text-gray-100 overflow-hidden relative">
      {/* Floating Background Elements */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.1, y: [100, -100, 100] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute top-10 left-20 text-teal-400 text-9xl opacity-10 select-none"
      >
        🚀
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.1, x: [0, 100, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute bottom-10 right-20 text-yellow-300 text-9xl opacity-10 select-none"
      >
        💡
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center">
        {/* Header Animation */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-10 text-center"
        >
          Our <span className="text-teal-500">Mission</span>
        </motion.h1>

        {/* Animated cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={isMobile ? {} : { opacity: 0, y: 100 }}
              whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
              transition={isMobile ? {} : {
                duration: 0.8,
                delay: i * 0.2,
                type: "spring",
                stiffness: 70,
              }}
              whileHover={isMobile ? {} : { scale: 1.05, rotate: 2 }}
              className="rounded-3xl border dark:border-gray-700 border-gray-200 bg-gray-50 dark:bg-gray-900 p-8 shadow-lg hover:shadow-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute -top-5 -right-5 opacity-10 text-8xl">
                <Rocket />
              </div>
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto bg-teal-100 dark:bg-teal-900 rounded-2xl">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center">
                {item.title}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Inspirational Closing Text */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-center max-w-3xl text-gray-700 dark:text-gray-400 text-base leading-relaxed"
        >
          Together, we are not just building software — we’re shaping experiences
          that make a difference. Every project we undertake is a step toward
          making technology more human, intuitive, and meaningful.
        </motion.p>
      </div>
      </div>
    </>
  );
}
