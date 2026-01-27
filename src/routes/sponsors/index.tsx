import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Noise from "@/components/sponsors-page/Noise";
import Card from "@/components/sponsors-page/Card";
import "./style.css";

export const Route = createFileRoute("/sponsors/")({
  component: SponsorsPage,
});

function SponsorsPage() {
  return (
    <section className="w-screen h-screen bg-black select-none">
      <div className="absolute overflow-hidden w-full h-full bg-black/30 flex flex-col items-center backdrop-blur-[5px] z-10">
        <Noise
          patternSize={50}
          patternScaleX={10}
          patternScaleY={10}
          patternRefreshInterval={2}
          patternAlpha={25}
        />

        <motion.h1
          initial={{ translateY: 120, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          className="text-[#f4d03e] text-8xl font-jersey text-shadow-[4px_4px_0px_#7b3aec] z-20 mb-5"
        >
          Our Sponsors
        </motion.h1>

        {/* Sponsors Cards */}

        {/* Title Sponsors */}
        <motion.p
          initial={{ translateY: 120, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
          className="text-[#f4d03e] text-5xl font-jersey text-shadow-[2px_2px_0px_#7b3aec] z-20"
        >
          Title Sponsors
        </motion.p>

        <div className="w-full h-full px-10 flex flex-1 flex-wrap justify-center gap-10">
          {/* Title Sponsors */}
          <Card
            name="BNY"
            img="sponsors-page/bny.jpeg"
            extraStyling="w-1/2"
            appearDelay={1.2}
          />
        </div>

        <motion.p
          initial={{ translateY: 120, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.4 }}
          className="text-[#f4d03e] text-5xl font-jersey text-shadow-[2px_2px_0px_#7b3aec] z-20"
        >
          Other Sponsors
        </motion.p>

        <div className="w-full h-full px-10 flex flex-1 flex-wrap justify-center gap-10">
          {/* Other Sponsors */}
          <Card
            name="Banconus"
            img="sponsors-page/banconus.jpeg"
            extraStyling="w-1/3"
            appearDelay={1.6}
          />
        </div>
      </div>

      <video
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        autoPlay
        loop
        muted
      >
        <source src="sponsors-page/bg-night.webm" type="video/webm" />
        Video Playback not supported!
      </video>
    </section>
  );
}
