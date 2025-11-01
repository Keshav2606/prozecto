import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Navbar from "../components/Navbar";

const visionPoints = [
  "Empowering innovation through technology",
  "Building seamless digital ecosystems",
  "Delivering excellence with creativity",
  "Fostering growth through collaboration",
  "Driving transformation with precision",
  "Creating future-ready businesses",
];

export default function Vision() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 relative overflow-hidden transition-colors duration-500">
      {/* Floating Animated Background Icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.05, scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 14 }}
        className="absolute top-32 left-16 text-[10rem] text-teal-400 select-none"
      >
        👁️
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.05, rotate: 360 }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        className="absolute bottom-32 right-20 text-[10rem] text-yellow-400 select-none"
      >
        ✨
      </motion.div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-8"
        >
          Our <span className="text-cyan-500">Vision</span>
        </motion.h1>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="flex justify-center mb-12"
        >
          <Eye className="w-16 h-16 text-cyan-500 drop-shadow-xl" />
        </motion.div>

        <p className="max-w-3xl mx-auto text-lg leading-relaxed mb-16 text-gray-600 dark:text-gray-300">
          We aim to revolutionize businesses through creative excellence,
          precision, and cutting-edge technology — empowering organizations to
          adapt, innovate, and lead in the ever-evolving digital landscape.
        </p>

        {/* Honeycomb Vision Structure */}
        <div className="flex flex-col items-center gap-5 md:gap-6">
          {/* Row 1 */}
          <div className="flex sm:flex-row flex-col gap-4 md:gap-6">
            {visionPoints.slice(0, 3).map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="hex-border flex items-center justify-center text-center text-cyan-400 font-medium w-48 h-56 relative"
              >
                <span className="px-3 text-sm md:text-base">{point}</span>
              </motion.div>
            ))}
          </div>

          {/* Row 2 (Offset for honeycomb effect) */}
          <div className="flex sm:flex-row flex-col gap-4 md:gap-6 mt-[-30px]">
            {visionPoints.slice(3, 6).map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                className="hex-border flex items-center justify-center text-center text-cyan-400 font-medium w-48 h-56 relative"
              >
                <span className="px-3 text-sm md:text-base">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Hexagon Shape */}
      <style>{`
        .hex-border {
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          border: 3px solid #06b6d4;
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .hex-border:hover {
          border-color: #22d3ee;
          transform: scale(1.05);
        }
      `}</style>
      </div>
    </>
  );
}
