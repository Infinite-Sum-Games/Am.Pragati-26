import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Card from "@/components/sponsors/Card";
import Noise from "@/components/sponsors/Noise";
import "./style.css";

export const Route = createFileRoute("/sponsors/")({
  component: SponsorsPage,
});

function SponsorsPage() {
  return (
    <section className="w-screen h-screen bg-black select-none overflow-hidden">
      <div className="absolute overflow-y-scroll w-full h-screen bg-black/30 flex flex-col items-center backdrop-blur-[5px] z-10">
        <div className="absolute inset-0 w-full h-[153vh] pointer-events-none">
          <Noise
            patternSize={50}
            patternScaleX={10}
            patternScaleY={10}
            patternRefreshInterval={2}
            patternAlpha={25}
          />
        </div>

        <motion.h1
          initial={{ translateY: 120, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          className="text-[#f4d03e] text-8xl font-jersey text-shadow-[4px_4px_0px_#7b3aec] z-20 mb-5 max-sm:text-7xl"
        >
          Our Sponsors
        </motion.h1>

        {/* Sponsors Cards */}

        {/* Title Sponsors */}
        <motion.p
          initial={{ translateY: 120, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
          className="text-[#33EBFF] text-5xl font-jersey text-shadow-[2px_2px_0px_#7b3aec] z-20 mt-10 mb-8"
        >
          Title Sponsor - BNY
        </motion.p>

        <motion.div
          initial={{ translateY: 120, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }}
          className="relative w-12/15 max-w-4xl my-8"
        >
          <img
            src="sponsors-page/card-long.png"
            alt=""
            className="w-full h-auto scale-y-[1.2]"
          />
          <div className="absolute inset-0 flex justify-center items-center gap-6 px-12 py-10">
            <img
              src="sponsors-page/bny.jpeg"
              alt="BNY Logo"
              className="w-45 h-auto object-contain rounded-xl shrink-0"
            />
            <div className="flex flex-col gap-4 pr-4 -translate-y-2">
              <p className="text-white text-base font-jersey leading-relaxed">
                BNY is a global financial services platforms company and the
                world's largest custodian bank. Founded in 1784 by Alexender
                Hamilton. BNY supports how capital moves, settles, and stays
                secure across markets. At its core, BNY provides the
                infrastructure that focuses on safekeeping assets, processing
                transactions, and supporting clients across the full investment
                lifecycle. The firm focuses on serving clients well, taking
                responsibility, learning continuously, and working together as
                one team
              </p>

              <p className="text-white text-base font-jersey leading-relaxed">
                Amrita School of Business shares a strong and growing
                association with BNY. Over the years, BNY has actively supported
                Amrita students through meaningful internship opportunities,
                helping them gain real-world exposure to global financial
                services. We are grateful for BNY's continued support in
                sponsoring the flagship management fest, Pragati'25 and
                Pragati'26, reinforcing their commitment to academic
                collaboration and talent development
              </p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ translateY: 120, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.4 }}
          className="text-[#E6E6FA] text-5xl font-jersey text-shadow-[2px_2px_0px_#7b3aec] z-20 mt-10"
        >
          Other Sponsors
        </motion.p>

        <div className="w-full px-10 py-8 flex flex-wrap justify-center items-start gap-8 pb-20">
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
        className="absolute top-0 left-0 z-0 w-screen h-[110vh] min-w-full min-h-full max-w-none"
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
