import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    let totalDuration = 4000; // 2 sec animation
    let incrementTime = 30; // update every 30ms
    let step = Math.ceil((end - start) / (totalDuration / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 4 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-extrabold text-gray-800"
    >
      {count}
      {suffix}
    </motion.span>
  );
};

const MeterSection = () => {
  return (
    <section className="bg-gray-50 py-20 px-10 md:px-20 lg:px-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 h-70 md:grid-cols-3 gap-12 text-center">
        
        {/* Projects Delivered */}
        <div className="space-y-3 bg-zinc-300 flex flex-col items-center justify-center rounded-2xl">
          <Counter target={500} suffix="+" />
          <p className="text-lg font-medium text-gray-600">Projects Delivered</p>
        </div>

        {/* Creative Workforce */}
        <div className="space-y-3 bg-zinc-300 flex flex-col items-center justify-center rounded-2xl">
          <Counter target={400} suffix="+" />
          <p className="text-lg font-medium text-gray-600">Creative Workforce</p>
        </div>

        {/* Experience */}
        <div className="space-y-3 bg-zinc-300 flex flex-col items-center justify-center rounded-2xl">
          <Counter target={8} suffix="+" />
          <p className="text-lg font-medium text-gray-600">Years of Experience</p>
        </div>
      </div>
    </section>
  );
};

export default MeterSection;
