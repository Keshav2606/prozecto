import React from "react";
import "./rollingText.css";

const RollingText = ({ text }) => {
  return (
    <span className="rolling-text">
  <span className="text-gray-900 dark:text-white">{text}</span>
  <span className="text-gray-900 dark:text-white">{text}</span>
</span>

  );
};

export default RollingText;
