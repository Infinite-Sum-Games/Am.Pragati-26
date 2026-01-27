import { useState } from "react";
import { motion } from "framer-motion";
import AboutModal from "./AboutModal";    

type AboutTopic = "Pragati" | "Amrita" | "ASB" | null;

const AboutTerminal = () => {
  const [selectedTopic, setSelectedTopic] = useState<AboutTopic>(null);

  return (
    <>
      <div className="font-['VT323',monospace] text-[#00ff00] p-8">
        <div className="inline-flex items-center gap-1 mb-4">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-8xl"
            style={{
              textShadow: "3px 3px 0 rgba(0, 255, 0, 0.3)",
            }}
          >
            ABOUT
          </motion.span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-5 h-14 bg-[#00ff00]"
            style={{
              boxShadow: "2px 2px 0 rgba(0, 255, 0, 0.5)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-2 text-5xl"
          style={{
            textShadow: "2px 2px 0 rgba(0, 255, 0, 0.3)",
          }}
        >
          {["Pragati", "Amrita", "ASB"].map((topic, index) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ x: 10, brightness: 1.5 }}
              className="cursor-pointer hover:brightness-150 transition-all"
              onClick={() => setSelectedTopic(topic as AboutTopic)}
            >
              &gt; {topic}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AboutModal
        selectedTopic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
      />
    </>
  );
};

export default AboutTerminal;
