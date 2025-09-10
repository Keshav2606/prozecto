import { motion } from "framer-motion";
import "./Carousel.css";

const defaultStatements = [
  "🚀 High Quality Solutions",
  "🎨 Creative & Modern Approach",
  "⏱️ On-Time Delivery",
  "💡 Innovative Ideas",
  "🤝 Customer-Centric Service",
];

const Carousel = ({
  statements = defaultStatements,
  rotation = "0deg",
  bgColor = "bg-gray-50",
  textColor = "text-gray-800",
  darkBgColor = "dark:bg-gray-900",
  darkTextColor = "dark:text-white",
  textSize = "text-lg md:text-xl",
  fontWeight = "font-semibold",
  className = "",
}) => {
  return (
    <div
      className={`carousel w-full overflow-hidden ${bgColor} ${darkBgColor} ${className}`}
      style={{ transform: `rotate(${rotation})` }}
    >
      <ul>
        {statements.map((statement, index) => (
          <li
            key={index}
            className={`statement text-center ${textColor} ${darkTextColor} ${textSize} ${fontWeight}`}
          >
            {statement}
          </li>
        ))}
      </ul>
      <ul aria-hidden="true">
        {statements.map((statement, index) => (
          <li
            key={index}
            className={`statement text-center ${textColor} ${darkTextColor} ${textSize} ${fontWeight}`}
          >
            {statement}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
