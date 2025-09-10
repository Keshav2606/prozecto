import React from "react";
import "./rollingText.css"; // keep animation styles separate

const RollingText = ({ text, className = "" }) => {
  return (
    <span className={`rolling-text ${className}`}>
      <span>{text}</span>
      <span>{text}</span>
    </span>
  );
};

export default RollingText;
