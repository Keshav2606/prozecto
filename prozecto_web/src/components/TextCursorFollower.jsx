import React, { useState, useEffect, useRef } from "react";

const TextCursorFollower = ({ children }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [isDesktop, setIsDesktop] = useState(true);
  const containerRef = useRef(null);

  // Check device width on mount and resize
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 768); // desktop >= 768px
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // disable follower on mobile/tablet

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Only show cursor inside the container
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setCursor({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          visible: true,
        });
      } else {
        setCursor((prev) => ({ ...prev, visible: false }));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block dark:text-white text-black font-bold"
      style={{ cursor: isDesktop ? "none" : "auto" }} // hide cursor only on desktop
    >
      {children}

      {/* Black follower circle using mask difference */}
      {isDesktop && cursor.visible && (
        <div
          style={{
            top: cursor.y,
            left: cursor.x,
            width: 140,
            height: 140,
            borderRadius: "50%",
            position: "absolute",
            pointerEvents: "none",
            mixBlendMode: "difference",
            backgroundColor: "white",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
};

export default TextCursorFollower;
