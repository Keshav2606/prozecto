"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const TextReveal = ({ children, className }) => {
  const containerRef = useRef(null);

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={`relative h-[200vh] ${className || ""}`}>
      <div className="sticky top-0 flex h-screen items-center justify-center px-4">
        <div className="flex flex-wrap text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Word = ({ word, progress, range }) => {
  // Fade in opacity
  const opacity = useTransform(progress, range, [0, 1]);
  // Slide up 50px
  const y = useTransform(progress, range, [50, 0]);

  return (
    <span className="relative mx-1 inline-block">
      {/* Ghost text behind */}
      <span className="absolute inset-0 text-black/30 dark:text-white/30">{word}</span>
      {/* Animated reveal text */}
      <motion.span
        style={{ opacity, y }}
        className="relative text-black dark:text-white font-bold"
      >
        {word}
      </motion.span>
    </span>
  );
};
