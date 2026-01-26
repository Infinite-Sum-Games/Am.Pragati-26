import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClickSpark() {
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newSpark = { id: Date.now(), x: e.pageX, y: e.pageY };
      setSparks((prev) => [...prev, newSpark]);
      
      // Remove spark after animation
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
      }, 500);
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <AnimatePresence>
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute z-50 w-8 h-8 border-2 border-retro-cyan bg-transparent rounded-full"
          style={{ left: spark.x - 16, top: spark.y - 16 }}
        />
      ))}
    </AnimatePresence>
  );
}