import { motion } from "framer-motion";
import "./Carousel.css"
const statements = [
  "🚀 High Quality Solutions",
  "🎨 Creative & Modern Approach",
  "⏱️ On-Time Delivery",
  "💡 Innovative Ideas",
  "🤝 Customer-Centric Service",
];

const Carousel = () => {
  return (
    <div className="carousel w-full overflow-hidden bg-gray-50">
     <ul>
        {statements.map((statement, index) => (
          <li key={index} className="statement text-center text-gray-800 text-lg md:text-xl font-semibold">
            {statement}
          </li>
        ))}
     </ul>
     <ul aria-hidden="true">
        {statements.map((statement, index) => (
          <li key={index} className="statement text-center text-gray-800 text-lg md:text-xl font-semibold">
            {statement}
          </li>
        ))}
     </ul>
    </div>
  );
};

export default Carousel;
