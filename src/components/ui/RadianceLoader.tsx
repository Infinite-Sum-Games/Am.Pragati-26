import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const RadianceLoader = () => {
  const [loadingText, setLoadingText] = useState("LOADING CARTRIDGE");
  const [dots, setDots] = useState("");
  
  useEffect(() => {
    const messages = [
      "LOADING CARTRIDGE",
      "READING SAVE DATA",
      "INITIALIZING SYSTEM",
      "LOADING TEAM DATA"
    ];
    let index = 0;
    
    const messageInterval = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingText(messages[index]);
    }, 2000);
    
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);
    
    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#0a0614] via-[#1a0733] to-black flex flex-col items-center justify-center text-white z-50 font-vcr relative overflow-hidden">
      
      {/* Retro starfield background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,rgba(255,79,216,0.9)_1px,transparent_1px),radial-gradient(circle_at_80%_30%,rgba(45,226,230,0.9)_1px,transparent_1px),radial-gradient(circle_at_40%_80%,rgba(255,122,24,0.9)_1px,transparent_1px)] bg-size-[180px_180px]" />
        
        {/* Animated moving stars */}
        <motion.div
          animate={{ y: [0, 200] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20"
        >
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#2de2e6] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100 - 20}%`,
                opacity: Math.random() * 0.7 + 0.3,
                boxShadow: `0 0 ${Math.random() * 4 + 2}px #2de2e6`
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Game Console Style Container */}
      <div className="relative z-10 flex flex-col items-center">

        {/* CRT Screen Frame */}
        <div className="relative bg-linear-to-b from-gray-700 to-gray-900 p-6 rounded-lg border-4 border-gray-800 shadow-[0_0_40px_rgba(45,226,230,0.15)] w-100">
          
          {/* Screen bezel */}
          <div className="relative bg-black p-8 rounded border-4 border-gray-600 h-70 flex items-center justify-center">
            
            {/* Scanlines */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none z-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, transparent 1px, transparent 2px)',
              }}
            />
            
            {/* Content */}
            <div className="relative z-0 flex flex-col items-center">
              
              {/* Loading Animation */}
              <motion.div className="flex gap-2 mb-6">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-4 h-4 bg-[#2de2e6] rounded-sm shadow-[0_0_10px_#2de2e6]"
                  />
                ))}
              </motion.div>
              
              {/* Loading Text */}
              <motion.div 
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-[#2de2e6] text-lg tracking-widest drop-shadow-[0_0_8px_rgba(45,226,230,0.8)] mb-4"
              >
                {loadingText}{dots}
              </motion.div>
              
              {/* Progress Bar */}
              <div className="w-64 h-6 bg-gray-800 border-2 border-[#2de2e6]/30 rounded-sm overflow-hidden relative">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="h-full bg-linear-to-r from-[#2de2e6] via-[#ff4fd8] to-[#ffcc33] relative"
                >
                  {/* Shine effect */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
              
              {/* Press Start Text */}
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gray-500 text-xs tracking-wider mt-6"
              >
                PLEASE WAIT...
              </motion.div>
            </div>
            
            {/* Screen glare */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-linear-to-br from-white/5 to-transparent rounded-tl pointer-events-none" />
          </div>
          
          {/* Power LED */}
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"
          />
        </div>
        
        {/* Version text */}
        <div className="text-gray-600 text-[10px] tracking-widest mt-4">
          VERSION 2.0.26
        </div>
      </div>
    </div>
  );
};
