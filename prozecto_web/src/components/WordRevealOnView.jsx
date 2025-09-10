import React, { useEffect, useRef, useState } from "react";
import "./wordRevealOnView.css";

const WordRevealOnView = ({ text, className = "" }) => {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.disconnect(); // only once
          }
        });
      },
      { threshold: 0.3 } // lower threshold so it triggers earlier
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`word-reveal-wrapper ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`word ${animate ? "animate" : ""}`}
          style={{ transitionDelay: `${index * 0.4}s` }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export default WordRevealOnView;
