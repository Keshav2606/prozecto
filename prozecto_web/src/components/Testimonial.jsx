import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Aayush Bhadula",
    text: "This service is absolutely fantastic! It really helped me boost my productivity.",
  },
  {
    name: "John Doe",
    text: "The team was highly professional and delivered exactly what I wanted.",
  },
  {
    name: "Jane Smith",
    text: "I am impressed with the quality and creativity. Highly recommended!",
  },
  {
    name: "Michael Brown",
    text: "Great experience overall. Will definitely use this service again.",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-16 text-center relative overflow-hidden">
      <div className="h-40 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-full"
          >
            <p className="lg:text-3xl md:text-2xl text-xl italic text-gray-700 mb-4">
              "{testimonials[index].text}"
            </p>
            <h3 className="font-semibold text-gray-900">
              — {testimonials[index].name}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonial;
