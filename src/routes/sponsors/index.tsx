import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Card from "@/components/sponsors/Card";
import Noise from "@/components/sponsors/Noise";
import "./style.css";

export const Route = createFileRoute("/sponsors/")({
  component: SponsorsPage,
});

function SponsorsPage() {
  return (
    <>
      <Navbar />
      <section className="w-screen min-h-screen bg-black select-none relative">
        <div className="w-full min-h-screen bg-black/30 flex flex-col items-center backdrop-blur-[5px] z-10 pt-24 relative">
          <div className="absolute inset-0 w-full min-h-full pointer-events-none">
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
            className="text-[#33EBFF] text-5xl font-jersey text-shadow-[2px_2px_0px_#7b3aec] z-20 mt-10 mb-32 max-lg:mb-12"
          >
            Title Sponsor - BNY
          </motion.p>

          <motion.div
            initial={{ translateY: 120, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }}
            className="relative w-12/15 max-w-6xl my-8 mb-20 max-lg:w-[85%] max-lg:max-w-md"
          >
            {/* Desktop */}
            <img
              src="sponsors-page/card-long-desktop.png"
              alt=""
              className="hidden lg:block w-full h-auto scale-y-[1.4]"
            />

            {/* Tablet */}
            <img
              src="sponsors-page/card-med.png"
              alt=""
              className="hidden md:block lg:hidden w-full h-auto"
            />

            {/* Mobile */}
            <img
              src="sponsors-page/card-long-mobile.webp"
              alt=""
              className="block md:hidden w-full h-auto"
            />
            <div className="absolute inset-0 flex justify-center items-center gap-8 px-16 py-12 max-lg:flex-col max-lg:px-6 max-lg:py-8 max-lg:gap-4">
              <img
                src="sponsors-page/bny.jpeg"
                alt="BNY Logo"
                className="w-52 h-auto object-contain rounded-xl shrink-0 max-lg:w-32"
              />
              <div className="flex h-fit flex-col gap-5 pr-4 max-lg:w-[70%] max-lg:translate-x-2 -translate-y-2 max-lg:pr-0 max-lg:translate-y-0 max-lg:text-center max-lg:overflow-y-auto max-lg:max-h-[60%]">
                <p className="text-white text-xl font-jersey leading-relaxed max-lg:text-base">
                  BNY is a global financial services platforms company and the
                  world's largest custodian bank. Founded in 1784 by Alexender
                  Hamilton. BNY supports how capital moves, settles, and stays
                  secure across markets. At its core, BNY provides the
                  infrastructure that focuses on safekeeping assets, processing
                  transactions, and supporting clients across the full
                  investment lifecycle. The firm focuses on serving clients
                  well, taking responsibility, learning continuously, and
                  working together as one team
                </p>

                <p className="text-white text-xl font-jersey leading-relaxed max-lg:text-base">
                  Amrita School of Business shares a strong and growing
                  association with BNY. Over the years, BNY has actively
                  supported Amrita students through meaningful internship
                  opportunities, helping them gain real-world exposure to global
                  financial services. We are grateful for BNY's continued
                  support in sponsoring the flagship management fest, Pragati'25
                  and Pragati'26, reinforcing their commitment to academic
                  collaboration and talent development
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ translateY: 120, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1.4 }}
            className="text-[#E6E6FA] text-5xl font-jersey text-shadow-[2px_2px_0px_#7b3aec] z-20 mt-16 mb-8"
          >
            Other Sponsors
          </motion.p>

          <div className="w-full px-10 py-8 flex flex-1 flex-wrap justify-center items-start gap-8 pb-20 pt-16">
            {/* Other Sponsors */}
            <Card
              name="Banconus"
              img="sponsors-page/banconus.jpeg"
              extraStyling="w-2/5"
              appearDelay={1.6}
            />
          </div>
        </div>

        {/* Desktop video */}
        <video
          className="hidden lg:block fixed top-0 left-0 z-0 w-screen h-screen object-cover"
          autoPlay
          loop
          muted
        >
          <source src="sponsors-page/bg-night.webm" type="video/webm" />
          Video Playback not supported!
        </video>

        {/* Mobile/Tablet video */}
        <video
          className="lg:hidden fixed top-0 left-0 z-0 w-screen h-screen object-cover"
          autoPlay
          loop
          muted
        >
          <source src="sponsors-page/bg-night-mobile.webm" type="video/mp4" />
          Video Playback not supported!
        </video>
      </section>
    </>
  );
}
