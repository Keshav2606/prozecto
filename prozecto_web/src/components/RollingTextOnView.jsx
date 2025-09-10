import React, { useEffect, useRef, useState } from "react";
import "./rollingTextOnView.css";

const RollingTextOnView = ({ text, className = "" }) => {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.disconnect(); // trigger only once
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`rolling-text-onview ${animate ? "animate" : ""} ${className}`}
      style={{ height: "auto" }}
    >
      <span>{text}</span>
      <span>{text}</span>
    </span>
  );

};

export default RollingTextOnView;
