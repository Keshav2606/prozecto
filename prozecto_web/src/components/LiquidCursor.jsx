import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const LiquidCursor = () => {
  // motion values for smooth physics
  const mouseX = useMotionValue(-100); // start offscreen
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  // hide the default cursor
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        width: 60,
        height: 60,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed z-50 rounded-full bg-blue-400 opacity-50 mix-blend-screen"
    />
  );
};

export default LiquidCursor;
