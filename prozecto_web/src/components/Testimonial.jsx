import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [testimonials]);

  const fetchTestimonials = async () => {
    try {
      const data = await api.testimonials.getAll();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className=" dark:bg-gray-900  w-full max-w-3xl mx-auto px-6 py-16 text-center relative overflow-hidden">
        <div className="h-40 flex items-center justify-center">
          <p className="dark:text-white text-gray-700">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className=" dark:bg-gray-900  w-full max-w-3xl mx-auto px-6 py-16 text-center relative overflow-hidden">
        <div className="h-40 flex items-center justify-center">
          <p className="dark:text-white text-gray-700">No testimonials available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className=" dark:bg-gray-900  w-full max-w-3xl mx-auto px-6 py-16 text-center relative overflow-hidden">
      <div className="h-40 flex  items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className=" absolute w-full"
          >
            <p className="dark:text-white lg:text-3xl md:text-2xl text-xl italic text-gray-700 mb-4">
              "{testimonials[index]?.statement}"
            </p>
            <h3 className="dark:text-white font-semibold text-gray-900">
              — {testimonials[index]?.fullName}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonial;
