import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// import FaultyTerminal from "./FaultyTerminal";
import LetterGlitch from "./LetterGlitch";

const aboutSections = [
	{
		title: "About ASB",
		content: `Amrita School of Business (ASB), Coimbatore is an elite management institution with a legacy of 30 years. The institution is accredited with AACSB (Association to Advance Collegiate Schools of Business), recognized to be top 5% of business schools around the world. It is also placed 26th in the NIRF Management Institution ranking (2025). With a unique blend of academic excellence and human values, ASB encapsulates in the philosophy "Education for life and Education for living".`,
	},
	{
		title: "About PRAGATI",
		content: `PRAGATI is the flagship annual B-fest hosted by the students of Amrita School of Business, where theory meets practice through intense business-themed competitions across the domains of marketing, finance, HR, operations, and analytics. We celebrate the timeless glow of businesses that shaped our economy, under the theme - Radiance. It's a tribute to the leaders that redefined the future of India.`,
	},
	{
		title: "About Amrita Vishwa Vidyapeetham",
		content: `Amrita Vishwa Vidyapeetham is a multi-disciplinary, research-centered university that stands as a beacon of world-class education in India. Ranked as the 8th best university in India by NIRF and awarded an A++ by NAAC, Amrita is driven by the visionary guidance of its Chancellor, Sri Mata Amritanandamayi Devi (Amma).`,
	},
];

const About = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	// Background Image Links (from UploadThing)
	const smallBG: string =
		"https://opj7uxu66w.ufs.sh/f/XMzv0gw46JTORI1rf2PiOIseJAhc96xGdTzPv2B0nbaoV5uw";
	const mediumBg: string =
		"https://opj7uxu66w.ufs.sh/f/XMzv0gw46JTORxcwOsPiOIseJAhc96xGdTzPv2B0nbaoV5uw";
	const largeBg: string =
		"https://opj7uxu66w.ufs.sh/f/XMzv0gw46JTOH6R3UpXMo3neaLFpTcstZvlYkOWRqPIEd6Kg";

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const computerScale = useTransform(scrollYProgress, [0, 0.15], [1, 3]);
	const blackOverlayOpacity = useTransform(
		scrollYProgress,
		[0.08, 0.2],
		[0, 1],
	);
	const compImageOpacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);

	const section1Opacity = useTransform(
		scrollYProgress,
		[0.18, 0.25, 0.35, 0.42],
		[0, 1, 1, 0],
	);
	const section2Opacity = useTransform(
		scrollYProgress,
		[0.4, 0.47, 0.58, 0.65],
		[0, 1, 1, 0],
	);
	const section3Opacity = useTransform(
		scrollYProgress,
		[0.63, 0.7, 0.85, 0.95],
		[0, 1, 1, 0],
	);

	const sectionAnimations = [
		{ opacity: section1Opacity },
		{ opacity: section2Opacity },
		{ opacity: section3Opacity },
	];

	return (
		<div ref={containerRef} className="relative h-[450vh] bg-[#020502]">
			<style>{`
        :root {
          --about-bg-image: url("${smallBG}");
        }
        @media (min-width: 768px) {
          :root {
            --about-bg-image: url("${mediumBg}");
          }
        }
        @media (min-width: 1024px) {
          :root {
            --about-bg-image: url("${largeBg}");
          }
        }
        .win95-border {
          border: 4px solid;
          border-color: #dfdfdf #404040 #404040 #dfdfdf;
          background: #c0c0c0;
          padding: 2px;
          box-shadow: 20px 20px 50px rgba(0,0,0,0.9);
        }
        .win95-screen {
          background: #000000;
          border: 2px solid;
          border-color: #404040 #dfdfdf #dfdfdf #404040;
          position: relative;
          overflow: hidden;
          /* Ensure content starts from the same spot */
          display: flex;
          flex-direction: column;
          justify-content: flex-start; 
        }
        .win95-title-bar {
          background: linear-gradient(90deg, #000080, #1084d0);
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6px;
        }
        .win95-btn {
          width: 20px;
          height: 18px;
          background: #c0c0c0;
          border: 1px solid;
          border-color: #dfdfdf #404040 #404040 #dfdfdf;
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          color: black;
        }
        .win95-text {
          color: #f0fff4; 
          text-shadow: 0 0 5px rgba(74, 222, 128, 0.3);
        }
        .crt-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.12;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%);
          background-size: 100% 3px;
          z-index: 5;
        }
      `}</style>

			<div className="sticky top-0 w-screen h-screen overflow-hidden flex items-center justify-center">
				<section
					className="relative w-full h-full bg-black bg-cover bg-no-repeat bg-center"
					style={{ backgroundImage: "var(--about-bg-image)" }}
				>
					<motion.div
						className="absolute bottom-0 left-1/2 -translate-x-1/2 w-275 origin-center z-10"
						style={{ scale: computerScale, opacity: compImageOpacity }}
					>
						<img
							src="/about/comp.webp"
							alt="Retro computer"
							className="w-full h-auto"
						/>
						<div className="absolute top-[12%] left-[15%] w-[70%] h-[40%] flex items-center justify-center">
							<span className="text-white text-6xl font-bold tracking-wider font-jersey15 text-shadow-[2px_2px_0px_var(--color-purple-500)]">
								About Us
							</span>
						</div>
					</motion.div>

					<motion.div
						className="absolute inset-0 z-0"
						style={{ opacity: blackOverlayOpacity }}
					>
						<LetterGlitch
							glitchSpeed={50}
							centerVignette={true}
							outerVignette={true}
							glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
							smooth={true}
							characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
						/>
						<div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-85" />
					</motion.div>

					{aboutSections.map((section, index) => (
						<motion.div
							key={section.title}
							className="absolute inset-0 flex items-center justify-center p-6 md:p-12 z-20"
							style={{ opacity: sectionAnimations[index].opacity }}
						>
							<div className="win95-border w-full max-w-5xl lg:max-w-6xl lg:min-h-125">
								{/* Title Bar with >> Icon */}
								<div className="win95-title-bar mb-1 lg:h-8">
									<div className="flex items-center gap-2">
										<span className="text-green-400 font-mono font-bold text-xs lg:text-sm tracking-tighter">
											{`>>`}
										</span>
										<span className="text-white font-bold text-[10px] md:text-xs lg:text-sm font-sans tracking-tight">
											C:\PRAGATI\DOCS\
										</span>
									</div>
									<div className="flex gap-px lg:gap-1">
										<div className="win95-btn lg:w-6 lg:h-6">_</div>
										<div className="win95-btn lg:w-6 lg:h-6">□</div>
										<div className="win95-btn lg:w-6 lg:h-6 text-black">x</div>
									</div>
								</div>

								{/* Content Area: Fixed starting position */}
								<div className="win95-screen p-8 md:p-12 lg:p-16 lg:min-h-112.5">
									<div className="crt-scanlines" />

									<div className="relative z-10">
										{/* Consistent Title Height */}
										<h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 lg:mb-8 win95-text font-mono uppercase tracking-widest min-h-[1.5em] flex items-center">
											<span className="text-green-500/50 mr-3 text-sm lg:text-2xl">
												$
											</span>
											{section.title}
										</h2>

										<div className="h-px w-full bg-green-500/20 mb-6 lg:mb-10" />

										<p className="win95-text text-base md:text-lg lg:text-2xl leading-relaxed font-mono opacity-90 text-left">
											{section.content}
											<motion.span
												animate={{ opacity: [1, 0] }}
												transition={{ repeat: Infinity, duration: 0.8 }}
												className="inline-block w-2 h-4 lg:w-3 lg:h-6 bg-green-400 ml-2 align-middle"
											/>
										</p>
									</div>
								</div>

								{/* Footer Bar */}
								<div className="flex justify-between items-center px-3 py-1 lg:py-2 bg-[#c0c0c0] font-sans text-[10px] md:text-xs text-gray-700 font-bold border-t border-[#808080]">
									<div className="flex gap-4">
										<span>STATUS: ACTIVE</span>
										<span className="text-green-900 animate-pulse uppercase">
											Disk Read OK
										</span>
									</div>
									<span>PAGE {index + 1} / 3</span>
								</div>
							</div>
						</motion.div>
					))}
				</section>
			</div>
		</div>
	);
};

export default About;
