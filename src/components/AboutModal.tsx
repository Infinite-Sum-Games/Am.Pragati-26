import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AboutTopic = "Pragati" | "Amrita" | "ASB";

interface AboutModalProps {
  selectedTopic: AboutTopic | null;
  onClose: () => void;
}

const AboutModal = ({ selectedTopic, onClose }: AboutModalProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const fullText = selectedTopic ? `ABOUT_${selectedTopic.toUpperCase()}` : "";

  useEffect(() => {
    if (!selectedTopic) {
      setDisplayedText("");
      setIsTypingComplete(false);
      setContentVisible(false);
      return;
    }

    let index = 0;
    setDisplayedText("");
    setIsTypingComplete(false);
    setContentVisible(false);

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        setTimeout(() => setContentVisible(true), 300);
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [selectedTopic, fullText]);

  const getContent = () => {
    switch (selectedTopic) {
      case "Pragati":
        return {
          title: "PRAGATI_2026",
          description: "The Flagship Annual B-Fest | Theme: RADIANCE",
          text: "PRAGATI is the flagship annual B-fest hosted by the students of Amrita School of Business, where theory meets practice through intense business-themed competitions across the domains of marketing, finance, HR, operations, and analytics. With PRAGATI'25 successfully amassing 400+ contestants for the prize pool of 4 Lakh Rupees, this year, PRAGATI'26 travels back to move forward. We celebrate the timeless glow of businesses that shaped our economy, under the theme - Radiance. It's a tribute to the leaders that redefined the future of India. PRAGATI isn't just a competition, it is also a networking hub. A constellation of CEOs and industry experts from in and around India visit the event, to inculcate their visionary insights and global perspectives. We take immense pride in having the global financial services leader BNY as our title sponsor, this partnership embarks a significant milestone in our journey. This is a student-executed event, every detail is a reflection of the professional learning at Amrita School of Business. Witness the perfect harmony of professional grit and retro flair, where every challenge is an opportunity to shine and every moment is a step toward your own radiance.",
        };
      case "Amrita":
        return {
          title: "AMRITA_VISHWA_VIDYAPEETHAM",
          description: "Multi-Disciplinary Research University | NIRF Rank 8",
          text: 'Amrita Vishwa Vidyapeetham is a multi-disciplinary, research-centered university that stands as a beacon of world-class education in India. Ranked as the 8th best university in India by NIRF and awarded an A++ by NAAC, Amrita is driven by the visionary guidance of its Chancellor, Sri Mata Amritanandamayi Devi (Amma). The institute is guided by the philosophy of "Education for Life and Education for Living," the university fosters a unique ecosystem where academic rigor meets compassion and social responsibility. This commitment to societal well-being is reflected in its pioneering initiatives like Live-in-Labs, Technology Business Incubator (TBI), AmritaRITE, Jivamritam, Saukhyam and many more. With over 250+ programs across 10 sprawling campuses, Amrita continues to pioneer global standards in research, innovation, and holistic development.',
        };
      case "ASB":
        return {
          title: "AMRITA_SCHOOL_OF_BUSINESS",
          description:
            "Elite Management Institution | AACSB Accredited | NIRF Rank 26",
          text: 'Amrita School of Business (ASB), Coimbatore is an elite management institution with a legacy of 30 years. The institution is accredited with AACSB (Association to Advance Collegiate Schools of Business), recognized to be top 5% of business schools around the world. It is also placed 26th in the NIRF Management Institution ranking (2025). With a unique blend of academic excellence and human values, ASB encapsulates in the philosophy "Education for life and Education for living". Here, students can pursue specializations in Marketing, Finance, Operations, Business Analytics, and HR. Career opportunities are plenty with the institution\'s strong industry ties, consistently achieving a near 100% placement. Success of ASB is reflected in our graduates who shine in pivotal roles at industry titans such as Google, Amazon, Microsoft, and EY, among other Fortune 500 giants. Beyond classroom, student-led committees and clubs, business research projects and rural out-reach initiatives shape graduates into industry ready global leaders. Backed by Principles of Responsible Management Education (PRME), ASB is also in the forefront of blending sustainability principles into modern day management competency building.',
        };
      default:
        return null;
    }
  };

  const content = getContent();

  if (!selectedTopic || !content) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-0"
        onClick={onClose}
      >
        {/* Blurred Background */}
        <motion.div
          initial={{ backdropFilter: "blur(0px)" }}
          animate={{ backdropFilter: "blur(12px)" }}
          exit={{ backdropFilter: "blur(0px)" }}
          className="absolute inset-0 bg-black/85"
          style={{ backdropFilter: "blur(12px)" }}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="font-['VT323',monospace] text-[#00ff00] w-[90vw] max-w-[1400px] h-[85vh] relative z-10 border-4 bg-black/95 flex flex-col"
          style={{
            borderColor: "#00ff00",
            boxShadow:
              "0 0 30px rgba(0, 255, 0, 0.4), 0 0 60px rgba(0, 255, 0, 0.2), inset 0 0 30px rgba(0, 255, 0, 0.1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Section */}
          <div className="flex-shrink-0 bg-black/95 border-b-2 border-[#00ff00] p-8 z-20">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <span
                    className="text-6xl block"
                    style={{
                      textShadow: "3px 3px 0 rgba(0, 255, 0, 0.3)",
                    }}
                  >
                    {displayedText}
                  </span>
                </motion.div>
                {isTypingComplete && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-4 h-12 bg-[#00ff00] inline-block mt-2"
                    style={{
                      boxShadow: "2px 2px 0 rgba(0, 255, 0, 0.5)",
                    }}
                  />
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, brightness: 1.5 }}
                whileTap={{ scale: 0.95 }}
                className="text-3xl px-6 py-3 border-2 border-[#00ff00] flex-shrink-0 ml-4"
                style={{
                  textShadow: "2px 2px 0 rgba(0, 255, 0, 0.3)",
                  boxShadow: "0 0 10px rgba(0, 255, 0, 0.3)",
                }}
                onClick={onClose}
              >
                [ESC]
              </motion.button>
            </div>

            {isTypingComplete && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-3xl"
                style={{
                  textShadow: "2px 2px 0 rgba(0, 255, 0, 0.3)",
                }}
              >
                {content.description}
              </motion.div>
            )}
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-8">
            <AnimatePresence>
              {contentVisible && (
                <>
                  {/* System Messages */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl space-y-3 mb-8"
                    style={{
                      textShadow: "2px 2px 0 rgba(0, 255, 0, 0.3)",
                    }}
                  >
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {">"} System initialized...
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {">"} Loading {selectedTopic} database...
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {">"} Connection established. Retrieving data...
                    </motion.p>
                  </motion.div>

                  {/* Sections */}
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.5,
                        duration: 0.6,
                      }}
                      className="border-l-4 border-[#00ff00] pl-6 py-2"
                      style={{
                        boxShadow: "-5px 0 15px rgba(0, 255, 0, 0.2)",
                      }}
                    >
                      <p
                        className="text-2xl leading-relaxed"
                        style={{
                          textShadow: "1px 1px 0 rgba(0, 255, 0, 0.2)",
                        }}
                      >
                        {content.text}
                      </p>
                    </motion.div>
                  </div>

                  {/* Footer Messages */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.8,
                    }}
                    className="text-2xl space-y-3 mt-12 pb-8"
                    style={{
                      textShadow: "2px 2px 0 rgba(0, 255, 0, 0.3)",
                    }}
                  >
                    <p>{">"} Database loaded successfully.</p>
                    <p>{">"} All systems operational.</p>
                    <p>
                      {">"}{" "}
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Ready for next command...
                      </motion.span>
                    </p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Close Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex-shrink-0 bg-black/95 border-t-2 border-[#00ff00] p-6 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, brightness: 1.5 }}
              whileTap={{ scale: 0.95 }}
              className="text-3xl px-12 py-4 border-2 border-[#00ff00]"
              style={{
                textShadow: "2px 2px 0 rgba(0, 255, 0, 0.3)",
                boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)",
              }}
              onClick={onClose}
            >
              [ESC_CLOSE]
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AboutModal;
