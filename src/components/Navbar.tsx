import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { NavbarAuth } from "./NavbarAuth"; // Assumes NavbarAuth is in the same directory

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}
interface MenuItemProps {
  text: string;
  hasArrow?: boolean;
  align?: "left" | "right";
  href?: string;
}

const pixelFont = {
  fontFamily: '"Press Start 2P", cursive',
  letterSpacing: "-1px",
};

const AUDIO_URL =
  "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3";

const CRTOverlay = () => (
  <div
    className="absolute inset-0 z-60 pointer-events-none opacity-20"
    style={{
      background:
        "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
      backgroundSize: "100% 2px, 3px 100%",
    }}
  />
);

const PartyDecorations = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const auraX = useTransform(springX, (val) => val / 8);
  const auraY = useTransform(springY, (val) => val / 8);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] rounded-full bg-fuchsia-600/20 blur-[120px]"
        style={{ x: auraX, y: auraY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
        }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute bottom-[-10vh] left-[-50%] right-[-50%] h-[50vh] opacity-30"
        style={{
          backgroundImage: `linear-gradient(transparent 0%, #d8b4fe 1px, transparent 2px), linear-gradient(90deg, transparent 0%, #d8b4fe 1px, transparent 2px)`,
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg)",
        }}
      />
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 10,
            opacity: 0,
          }}
          animate={{ y: -100, opacity: [0, 0.8, 0] }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({
  text,
  hasArrow,
  align = "left",
  href = "/coming-soon",
}) => {
  const justifyClass =
    align === "right"
      ? "justify-center md:justify-end"
      : "justify-center md:justify-start";
  const originClass =
    align === "right"
      ? "origin-center md:origin-right"
      : "origin-center md:origin-left";
  const translateClass =
    align === "right"
      ? "group-hover:-translate-x-2"
      : "group-hover:translate-x-2";

  const glitchVariants = {
    rest: { x: 0, textShadow: "4px 4px 0px rgba(0,0,0,1)" },
    hover: {
      x: [0, -2, 2, -1, 1, 0],
      textShadow: [
        "2px 0px 0px #00ffff, -2px 0px 0px #ff00ff",
        "-2px 2px 0px #00ffff, 2px -2px 0px #ff00ff",
        "2px -2px 0px #00ffff, -2px 2px 0px #ff00ff",
      ],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
  };

  return (
    <a
      href={href}
      className="group relative cursor-pointer block w-fit py-2 px-4 no-underline"
    >
      <div className={`relative z-10 flex items-center gap-4 ${justifyClass}`}>
        {hasArrow && align === "right" && (
          <span className="text-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-100 hidden md:inline-block">
            ➜
          </span>
        )}
        <motion.span
          variants={glitchVariants}
          initial="rest"
          whileHover="hover"
          style={pixelFont}
          className={`text-xl md:text-3xl lg:text-5xl whitespace-nowrap text-white uppercase leading-relaxed transition-all duration-100 
                group-hover:text-cyan-300
                ${translateClass}
                group-hover:-translate-y-2`}
        >
          {text}
        </motion.span>
        {hasArrow && align === "left" && (
          <span className="text-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-100 hidden md:inline-block">
            ⬅
          </span>
        )}
      </div>
      <span
        className={`absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-150 ${originClass} z-0 border-2 border-cyan-400`}
      />
    </a>
  );
};

const BeatDropOverlay: React.FC<OverlayProps> = ({ isOpen, onClose }) => {
  const bars = [0, 1, 2, 3, 4];

  const dropVariants: Variants = {
    hidden: { y: "-100%" },
    visible: (i: number) => ({
      y: "0%",
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 100,
        mass: 1.2,
        delay: i * 0.06,
      },
    }),
    exit: (i: number) => ({
      y: "100%",
      transition: { duration: 0.4, ease: "easeIn", delay: i * 0.04 },
    }),
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}</style>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex flex-col justify-center pointer-events-none">
          <div className="absolute inset-0 z-0 flex h-full pointer-events-auto">
            {bars.map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={dropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-1 bg-[#2e1065] border-r border-white/5 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <PartyDecorations />
            <CRTOverlay />
          </motion.div>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full h-full flex flex-col pointer-events-auto"
          >
            <div className="flex justify-end p-6 md:p-8">
              <button
                onClick={onClose}
                className="group bg-white border-4 border-black w-16 h-16 flex items-center justify-center hover:bg-black transition-colors shadow-[6px_6px_0_rgba(0,0,0,0.5)] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <span className="text-2xl text-black group-hover:text-white font-black">
                  X
                </span>
              </button>
            </div>

            <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 px-6 content-center">
              <div className="flex flex-col gap-10 border-r-0 md:border-r border-white/20 pr-0 md:pr-12 items-center text-center md:items-end md:text-right">
                <MenuItem text="HOME" align="right" href="/coming-soon" />
                <MenuItem text="EVENTS" align="right" href="/coming-soon" />
                <MenuItem
                  text="Business Fair"
                  align="right"
                  href="/coming-soon"
                />
              </div>
              <div className="flex flex-col gap-10 pl-0 md:pl-12 items-center text-center md:items-start md:text-left">
                <MenuItem text="TEAM" align="left" href="/coming-soon" />
                <MenuItem text="SPONSORS" align="left" href="/coming-soon" />
                <MenuItem text="CEO CONNECT" align="left" href="/coming-soon" />
              </div>
            </div>

            <div className="p-8 text-center bg-black/20 backdrop-blur-sm border-t border-white/10">
              <div className="flex justify-center gap-2.5 mb-4 h-12 items-end">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["20%", "100%", "40%", "80%"] }}
                    transition={{
                      duration: 0.4,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: i * 0.1,
                    }}
                    className={`w-4 border-2 border-black ${i % 2 === 0 ? "bg-cyan-400" : "bg-pink-500"}`}
                  />
                ))}
              </div>
              <h3
                style={pixelFont}
                className="text-xl md:text-2xl text-white uppercase tracking-widest drop-shadow-[2px_2px_0_#d8b4fe]"
              >
                DROP THE BEAT
              </h3>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(AUDIO_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error("Audio playback failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <>
      <BeatDropOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="max-w-[95%] mx-auto flex justify-end items-center gap-6">
          {/* --- MUSIC BUTTON --- */}
          <motion.button
            onClick={toggleAudio}
            whileHover={{ y: -4, boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
            whileTap={{ y: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            className="pointer-events-auto h-12 w-12 bg-cyan-400 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] hover:bg-cyan-300 flex items-center justify-center transition-all relative overflow-hidden"
          >
            {isPlaying ? (
              <div className="flex gap-0.75 items-end h-5">
                <motion.div
                  animate={{ height: [5, 16, 8, 20, 5] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="w-1.5 bg-black"
                />
                <motion.div
                  animate={{ height: [10, 5, 20, 10, 15] }}
                  transition={{ repeat: Infinity, duration: 0.4 }}
                  className="w-1.5 bg-black"
                />
                <motion.div
                  animate={{ height: [20, 12, 5, 16, 20] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="w-1.5 bg-black"
                />
              </div>
            ) : (
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-14 border-l-black border-b-8 border-b-transparent ml-1" />
            )}
          </motion.button>

          {/* --- INTEGRATED AUTH COMPONENT --- */}
          <NavbarAuth />

          {/* --- MENU TOGGLE --- */}
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ y: -4, boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
            whileTap={{ y: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            className="pointer-events-auto h-12 w-12 bg-white border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] hover:bg-[#d8b4fe] flex flex-col justify-center items-center gap-1 group transition-all"
          >
            <span className="w-6 h-1 bg-black group-hover:w-8 transition-all duration-200" />
            <span className="w-6 h-1 bg-black group-hover:w-4 transition-all duration-200" />
            <span className="w-6 h-1 bg-black group-hover:w-8 transition-all duration-200" />
          </motion.button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
