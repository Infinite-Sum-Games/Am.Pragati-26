import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function RetroCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // 1. Track raw mouse position
  const mouseX = useMotionValue(-100); // Start off-screen
  const mouseY = useMotionValue(-100);

  // 2. Add Smoothness (Spring Physics)
  // stiffness: higher = snappier, damping: higher = less wobble
  const springConfig = { damping: 25, stiffness: 400 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device has a fine pointer (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsVisible(mediaQuery.matches);

    const handleVisibilityChange = (e: MediaQueryListEvent) => {
      setIsVisible(e.matches);
    };

    mediaQuery.addEventListener("change", handleVisibilityChange);

    const moveCursor = (e: MouseEvent) => {
      // Update position
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if we are hovering over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, input, select, textarea, [role='button']");
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      mediaQuery.removeEventListener("change", handleVisibilityChange);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.img
      src="/cursor.svg" // YOUR FILE HERE
      alt="Custom Cursor"
      className="fixed top-0 left-0 z-9999 pointer-events-none w-6 h-6 md:w-8 md:h-8"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      animate={{
        // 3. The Rotation Logic
        // 0deg = Normal, 45deg = Hovering (tilted clockwise)
        rotate: isHovering ? 25 : 0, 
        scale: isHovering ? 1.1 : 1, 
      }}
      transition={{ 
        // Transition settings specifically for the rotate/scale
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      }}
    />
  );
}